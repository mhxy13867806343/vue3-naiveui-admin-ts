<script setup lang="ts">
/**
 * 角色管理页面
 * 完整 CRUD：角色列表、新增/编辑角色、删除确认、权限配置
 */
import { ref, computed, h, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  NDataTable,
  NButton,
  NSpace,
  NTag,
  NModal,
  NForm,
  NFormItem,
  NInput,
  NSwitch,
  NTree,
  useDialog,
  useMessage,
  type FormInst,
  type FormRules,
  type DataTableColumns,
  type TreeOption,
} from 'naive-ui'
import { apiGetRoles, apiCreateRole, apiUpdateRole, apiDeleteRole, apiUpdateRolePermission } from '@/api'
import { allPermissions } from '@/api/mock/role'
import { useLoading } from '@/composables/useLoading'
import type { RoleItem, RoleFormData } from '@/types'

const { t } = useI18n()
const dialog = useDialog()
const message = useMessage()
const { loading, run } = useLoading()

// --- Role list state ---
const roles = ref<RoleItem[]>([])

// --- Form dialog state ---
const showFormModal = ref(false)
const editingRole = ref<RoleItem | null>(null)
const formRef = ref<FormInst | null>(null)
const formData = ref<RoleFormData>({
  name: '',
  code: '',
  description: '',
  status: 'enabled',
})

const isEditing = computed(() => editingRole.value !== null)
const formTitle = computed(() => (isEditing.value ? t('role.editRole') : t('role.addRole')))

const formRules: FormRules = {
  name: [{ required: true, message: () => t('role.nameRequired'), trigger: 'blur' }],
  code: [{ required: true, message: () => t('role.codeRequired'), trigger: 'blur' }],
}

// --- Permission dialog state ---
const showPermModal = ref(false)
const currentPermRole = ref<RoleItem | null>(null)
const checkedPermKeys = ref<string[]>([])

/** Build permission tree from flat allPermissions list */
const permissionTreeOptions = computed<TreeOption[]>(() => {
  const map = new Map<string, TreeOption>()

  for (const perm of allPermissions) {
    const parts = perm.split(':')
    const topKey = parts[0]

    if (!map.has(topKey)) {
      map.set(topKey, {
        key: topKey,
        label: topKey,
        children: [],
      })
    }

    const parent = map.get(topKey)!

    if (parts.length === 2) {
      ;(parent.children as TreeOption[]).push({
        key: perm,
        label: perm,
      })
    } else if (parts.length >= 3) {
      const midKey = `${parts[0]}:${parts[1]}`
      let midNode = (parent.children as TreeOption[]).find((c) => c.key === midKey)
      if (!midNode) {
        midNode = { key: midKey, label: midKey, children: [] }
        ;(parent.children as TreeOption[]).push(midNode)
      }
      ;(midNode.children as TreeOption[]).push({
        key: perm,
        label: perm,
      })
    }
  }

  return Array.from(map.values())
})

// --- Table columns ---
const columns = computed<DataTableColumns<RoleItem>>(() => [
  { title: 'ID', key: 'id', width: 60 },
  {
    title: t('role.roleName'),
    key: 'name',
    width: 140,
    render(row) {
      return h(NTag, { type: 'primary', bordered: false }, { default: () => row.name })
    },
  },
  { title: t('role.roleCode'), key: 'code', width: 120 },
  { title: t('role.description'), key: 'description', ellipsis: { tooltip: true } },
  {
    title: t('role.permCount'),
    key: 'permCount',
    width: 80,
  },
  {
    title: t('role.userCount'),
    key: 'userCount',
    width: 80,
  },
  {
    title: t('role.status'),
    key: 'status',
    width: 100,
    render(row) {
      return h(
        NTag,
        { type: row.status === 'enabled' ? 'success' : 'error', size: 'small' },
        { default: () => (row.status === 'enabled' ? t('role.enabled') : t('role.disabled')) },
      )
    },
  },
  { title: 'Create Time', key: 'createTime', width: 120 },
  {
    title: '操作',
    key: 'actions',
    width: 220,
    render(row) {
      return h(NSpace, { size: 4 }, {
        default: () => [
          h(
            NButton,
            { size: 'small', type: 'primary', quaternary: true, onClick: () => handleEdit(row) },
            { default: () => t('common.edit') },
          ),
          h(
            NButton,
            { size: 'small', type: 'warning', quaternary: true, onClick: () => handleOpenPermissions(row) },
            { default: () => t('role.permissions') },
          ),
          h(
            NButton,
            { size: 'small', type: 'error', quaternary: true, onClick: () => handleDelete(row) },
            { default: () => t('common.delete') },
          ),
        ],
      })
    },
  },
])

// --- Data loading ---
async function loadRoles() {
  try {
    const res = await run(() => apiGetRoles())
    if (res.code === 200 && res.data) {
      roles.value = res.data
    }
  } catch {
    message.error(t('role.operationFailed'))
  }
}

// --- Add role ---
function handleAdd() {
  editingRole.value = null
  formData.value = { name: '', code: '', description: '', status: 'enabled' }
  showFormModal.value = true
}

// --- Edit role ---
function handleEdit(row: RoleItem) {
  editingRole.value = row
  formData.value = {
    name: row.name,
    code: row.code,
    description: row.description,
    status: row.status,
  }
  showFormModal.value = true
}

// --- Submit form (create or update) ---
async function handleFormSubmit() {
  try {
    await formRef.value?.validate()
  } catch {
    return
  }

  try {
    if (isEditing.value) {
      const res = await apiUpdateRole({ id: editingRole.value!.id, ...formData.value })
      if (res.code === 200) {
        message.success(t('role.updateSuccess'))
        showFormModal.value = false
        await loadRoles()
      } else {
        message.error(t('role.operationFailed'))
      }
    } else {
      const res = await apiCreateRole(formData.value)
      if (res.code === 200) {
        message.success(t('role.createSuccess'))
        showFormModal.value = false
        await loadRoles()
      } else {
        message.error(t('role.operationFailed'))
      }
    }
  } catch {
    message.error(t('role.operationFailed'))
  }
}

// --- Delete role ---
function handleDelete(row: RoleItem) {
  dialog.warning({
    title: t('common.tip'),
    content: t('role.deleteConfirm', { name: row.name }),
    positiveText: t('common.confirm'),
    negativeText: t('common.cancel'),
    onPositiveClick: async () => {
      try {
        const res = await apiDeleteRole(row.id)
        if (res.code === 200) {
          message.success(t('role.deleteSuccess'))
          await loadRoles()
        } else {
          message.error(t('role.operationFailed'))
        }
      } catch {
        message.error(t('role.operationFailed'))
      }
    },
  })
}

// --- Permission configuration ---
function handleOpenPermissions(row: RoleItem) {
  currentPermRole.value = row
  checkedPermKeys.value = row.permissions ? [...row.permissions] : []
  showPermModal.value = true
}

async function handlePermSubmit() {
  if (!currentPermRole.value) return

  try {
    const res = await apiUpdateRolePermission(currentPermRole.value.id, checkedPermKeys.value)
    if (res.code === 200) {
      message.success(t('role.permUpdateSuccess'))
      showPermModal.value = false
      await loadRoles()
    } else {
      message.error(t('role.operationFailed'))
    }
  } catch {
    message.error(t('role.operationFailed'))
  }
}

// --- Init ---
onMounted(() => {
  loadRoles()
})
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">{{ t('menu.roleManagement') }}</h2>

    <!-- Toolbar -->
    <NSpace style="margin-bottom: 16px">
      <NButton type="primary" @click="handleAdd">
        ➕ {{ t('role.addRole') }}
      </NButton>
    </NSpace>

    <!-- Role table -->
    <NDataTable
      :columns="columns"
      :data="roles"
      :loading="loading"
      :bordered="false"
      :row-key="(row: RoleItem) => row.id"
    />

    <!-- Add/Edit form modal -->
    <NModal
      v-model:show="showFormModal"
      preset="dialog"
      :title="formTitle"
      :positive-text="t('common.confirm')"
      :negative-text="t('common.cancel')"
      @positive-click="handleFormSubmit"
      style="width: 500px"
    >
      <NForm
        ref="formRef"
        :model="formData"
        :rules="formRules"
        label-placement="left"
        label-width="100"
        style="margin-top: 16px"
      >
        <NFormItem :label="t('role.roleName')" path="name">
          <NInput v-model:value="formData.name" :placeholder="t('role.nameRequired')" />
        </NFormItem>
        <NFormItem :label="t('role.roleCode')" path="code">
          <NInput v-model:value="formData.code" :placeholder="t('role.codeRequired')" />
        </NFormItem>
        <NFormItem :label="t('role.description')" path="description">
          <NInput
            v-model:value="formData.description"
            type="textarea"
            :rows="3"
          />
        </NFormItem>
        <NFormItem :label="t('role.status')" path="status">
          <NSwitch
            :value="formData.status === 'enabled'"
            @update:value="(val: boolean) => (formData.status = val ? 'enabled' : 'disabled')"
          >
            <template #checked>{{ t('role.enabled') }}</template>
            <template #unchecked>{{ t('role.disabled') }}</template>
          </NSwitch>
        </NFormItem>
      </NForm>
    </NModal>

    <!-- Permission configuration modal -->
    <NModal
      v-model:show="showPermModal"
      preset="dialog"
      :title="t('role.permissions') + (currentPermRole ? ` - ${currentPermRole.name}` : '')"
      :positive-text="t('common.confirm')"
      :negative-text="t('common.cancel')"
      @positive-click="handlePermSubmit"
      style="width: 600px"
    >
      <div style="max-height: 400px; overflow-y: auto; margin-top: 16px">
        <NTree
          :data="permissionTreeOptions"
          checkable
          cascade
          selectable
          block-line
          default-expand-all
          :checked-keys="checkedPermKeys"
          @update:checked-keys="(keys: string[]) => (checkedPermKeys = keys)"
        />
      </div>
    </NModal>
  </div>
</template>
