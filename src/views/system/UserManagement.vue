<script setup lang="ts">
/**
 * 用户管理页面
 * 完整 CRUD 表格：搜索、新增、编辑、删除、分页、状态标签
 */
import { h, ref, computed, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  NDataTable, NButton, NSpace, NInput, NTag, NPagination,
  NModal, NForm, NFormItem, NSelect, NSwitch,
  useMessage, useDialog,
} from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const { t } = useI18n()
const message = useMessage()
const dialog = useDialog()

interface UserRow {
  key: number
  id: number
  username: string
  email: string
  role: string
  status: '启用' | '禁用'
  phone: string
  createTime: string
}

const roleTagType: Record<string, 'success' | 'info' | 'warning'> = {
  admin: 'success',
  editor: 'warning',
  user: 'info',
}

const roleLabels: Record<string, string> = {
  admin: '管理员',
  editor: '编辑',
  user: '普通用户',
}

const roleOptions = [
  { label: '管理员', value: 'admin' },
  { label: '编辑', value: 'editor' },
  { label: '普通用户', value: 'user' },
]

const searchText = ref('')
const currentPage = ref(1)
const pageSize = ref(10)

// CRUD modal state
const showModal = ref(false)
const isEdit = ref(false)
const editingRow = ref<UserRow | null>(null)
const formModel = reactive({
  username: '',
  email: '',
  phone: '',
  role: 'user',
  status: '启用' as '启用' | '禁用',
})

function handleAdd() {
  isEdit.value = false
  editingRow.value = null
  formModel.username = ''
  formModel.email = ''
  formModel.phone = ''
  formModel.role = 'user'
  formModel.status = '启用'
  showModal.value = true
}

function handleEdit(row: UserRow) {
  isEdit.value = true
  editingRow.value = row
  formModel.username = row.username
  formModel.email = row.email
  formModel.phone = row.phone
  formModel.role = row.role
  formModel.status = row.status
  showModal.value = true
}

function handleSave() {
  if (!formModel.username || !formModel.email) {
    message.error('请填写必填项')
    return
  }
  if (isEdit.value && editingRow.value) {
    Object.assign(editingRow.value, {
      username: formModel.username,
      email: formModel.email,
      phone: formModel.phone,
      role: formModel.role,
      status: formModel.status,
    })
    message.success('编辑成功')
  } else {
    const newId = allData.length > 0 ? Math.max(...allData.map(d => d.id)) + 1 : 1
    allData.push({
      key: newId,
      id: newId,
      username: formModel.username,
      email: formModel.email,
      phone: formModel.phone,
      role: formModel.role,
      status: formModel.status,
      createTime: new Date().toISOString().slice(0, 10),
    })
    message.success('添加成功')
  }
  showModal.value = false
  handleSearch()
}

function handleDelete(row: UserRow) {
  dialog.warning({
    title: '确认删除',
    content: `确定要删除用户 "${row.username}" 吗？`,
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      const idx = allData.findIndex(d => d.id === row.id)
      if (idx !== -1) allData.splice(idx, 1)
      message.success('删除成功')
      handleSearch()
    },
  })
}

const columns: DataTableColumns<UserRow> = [
  { title: 'ID', key: 'id', width: 60 },
  { title: '用户名', key: 'username', width: 120 },
  { title: '邮箱', key: 'email', width: 200 },
  { title: '手机号', key: 'phone', width: 140 },
  {
    title: '角色',
    key: 'role',
    width: 100,
    render(row) {
      return h(NTag, { type: roleTagType[row.role] || 'default', size: 'small' }, { default: () => roleLabels[row.role] || row.role })
    },
  },
  {
    title: '状态',
    key: 'status',
    width: 80,
    render(row) {
      return h(NTag, { type: row.status === '启用' ? 'success' : 'error', size: 'small' }, { default: () => row.status })
    },
  },
  { title: '创建时间', key: 'createTime', width: 120 },
  {
    title: '操作',
    key: 'actions',
    width: 150,
    render(row) {
      return h(NSpace, { size: 4 }, {
        default: () => [
          h(NButton, { size: 'small', type: 'primary', quaternary: true, onClick: () => handleEdit(row) }, { default: () => t('common.edit') }),
          h(NButton, { size: 'small', type: 'error', quaternary: true, onClick: () => handleDelete(row) }, { default: () => t('common.delete') }),
        ],
      })
    },
  },
]

const allData: UserRow[] = reactive([
  { key: 1, id: 1, username: 'admin', email: 'admin@example.com', phone: '13800138000', role: 'admin', status: '启用', createTime: '2024-01-01' },
  { key: 2, id: 2, username: 'zhangsan', email: 'zhangsan@example.com', phone: '13900139001', role: 'editor', status: '启用', createTime: '2024-01-05' },
  { key: 3, id: 3, username: 'lisi', email: 'lisi@example.com', phone: '13700137002', role: 'user', status: '启用', createTime: '2024-01-10' },
  { key: 4, id: 4, username: 'wangwu', email: 'wangwu@example.com', phone: '13600136003', role: 'user', status: '禁用', createTime: '2024-01-12' },
  { key: 5, id: 5, username: 'zhaoliu', email: 'zhaoliu@example.com', phone: '13500135004', role: 'editor', status: '启用', createTime: '2024-02-01' },
  { key: 6, id: 6, username: 'sunqi', email: 'sunqi@example.com', phone: '13400134005', role: 'user', status: '启用', createTime: '2024-02-10' },
  { key: 7, id: 7, username: 'zhouba', email: 'zhouba@example.com', phone: '13300133006', role: 'user', status: '禁用', createTime: '2024-02-15' },
  { key: 8, id: 8, username: 'wujiu', email: 'wujiu@example.com', phone: '13200132007', role: 'admin', status: '启用', createTime: '2024-03-01' },
  { key: 9, id: 9, username: 'zhengshi', email: 'zhengshi@example.com', phone: '13100131008', role: 'editor', status: '启用', createTime: '2024-03-05' },
  { key: 10, id: 10, username: 'qianyi', email: 'qianyi@example.com', phone: '13000130009', role: 'user', status: '启用', createTime: '2024-03-10' },
  { key: 11, id: 11, username: 'liuer', email: 'liuer@example.com', phone: '15800158010', role: 'user', status: '启用', createTime: '2024-03-15' },
  { key: 12, id: 12, username: 'chensan', email: 'chensan@example.com', phone: '15700157011', role: 'editor', status: '禁用', createTime: '2024-03-20' },
  { key: 13, id: 13, username: 'huangsi', email: 'huangsi@example.com', phone: '15600156012', role: 'user', status: '启用', createTime: '2024-04-01' },
  { key: 14, id: 14, username: 'linwu', email: 'linwu@example.com', phone: '15500155013', role: 'user', status: '启用', createTime: '2024-04-05' },
  { key: 15, id: 15, username: 'xuliu', email: 'xuliu@example.com', phone: '15400154014', role: 'editor', status: '启用', createTime: '2024-04-10' },
  { key: 16, id: 16, username: 'heqi', email: 'heqi@example.com', phone: '15300153015', role: 'user', status: '启用', createTime: '2024-04-15' },
  { key: 17, id: 17, username: 'gaoba', email: 'gaoba@example.com', phone: '15200152016', role: 'user', status: '禁用', createTime: '2024-04-20' },
  { key: 18, id: 18, username: 'fengjiu', email: 'fengjiu@example.com', phone: '15100151017', role: 'editor', status: '启用', createTime: '2024-05-01' },
  { key: 19, id: 19, username: 'caoshi', email: 'caoshi@example.com', phone: '18800188018', role: 'user', status: '启用', createTime: '2024-05-05' },
  { key: 20, id: 20, username: 'weier', email: 'weier@example.com', phone: '18700187019', role: 'admin', status: '启用', createTime: '2024-05-10' },
  { key: 21, id: 21, username: 'tangsan', email: 'tangsan@example.com', phone: '18600186020', role: 'user', status: '启用', createTime: '2024-05-15' },
])

const filteredData = ref([...allData])

function handleSearch() {
  currentPage.value = 1
  if (!searchText.value) {
    filteredData.value = [...allData]
    return
  }
  filteredData.value = allData.filter(
    u => u.username.includes(searchText.value) || u.email.includes(searchText.value),
  )
}

function handleReset() {
  searchText.value = ''
  currentPage.value = 1
  filteredData.value = [...allData]
}

const pagedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredData.value.slice(start, start + pageSize.value)
})

const code = `const columns: DataTableColumns<UserRow> = [
  { title: 'ID', key: 'id' },
  { title: '用户名', key: 'username' },
  { title: '邮箱', key: 'email' },
  { title: '角色', key: 'role', render(row) { return h(NTag, ...) } },
  { title: '状态', key: 'status', render(row) { return h(NTag, ...) } },
  { title: '操作', key: 'actions', render(row) {
    return h(NSpace, {}, {
      default: () => [
        h(NButton, { onClick: () => handleEdit(row) }, { default: () => '编辑' }),
        h(NButton, { onClick: () => handleDelete(row) }, { default: () => '删除' }),
      ]
    })
  }},
]

// CRUD modal pattern
const showModal = ref(false)
const isEdit = ref(false)
function handleAdd() { isEdit.value = false; showModal.value = true }
function handleEdit(row) { isEdit.value = true; formModel = { ...row }; showModal.value = true }
function handleSave() { /* add or update */ showModal.value = false }
function handleDelete(row) { dialog.warning({ title: '确认删除', ... }) }`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">{{ t('menu.userManagement') }}</h2>

    <CodePreview title="用户列表" description="使用 NDataTable + NPagination 实现用户 CRUD 表格，支持搜索、分页、新增、编辑、删除" :code="code">
      <NSpace style="margin-bottom: 16px" align="center">
        <NInput v-model:value="searchText" :placeholder="t('common.search')" clearable style="width: 250px" @clear="handleSearch" @keyup.enter="handleSearch" />
        <NButton type="primary" @click="handleSearch">🔍 {{ t('common.search') }}</NButton>
        <NButton @click="handleReset">{{ t('common.reset') }}</NButton>
        <NButton type="success" @click="handleAdd">➕ {{ t('common.add') }}</NButton>
      </NSpace>
      <NDataTable :columns="columns" :data="pagedData" :bordered="false" />
      <div style="display: flex; justify-content: flex-end; margin-top: 16px">
        <NPagination
          v-model:page="currentPage"
          :page-size="pageSize"
          :item-count="filteredData.length"
          show-size-picker
          :page-sizes="[5, 10, 20]"
          @update:page-size="(size: number) => { pageSize = size; currentPage = 1 }"
        />
      </div>
    </CodePreview>

    <!-- Add/Edit Modal -->
    <NModal
      v-model:show="showModal"
      :title="isEdit ? '编辑用户' : '添加用户'"
      preset="card"
      style="width: 500px"
      :mask-closable="false"
    >
      <NForm label-placement="left" label-width="80">
        <NFormItem label="用户名" required>
          <NInput v-model:value="formModel.username" placeholder="请输入用户名" />
        </NFormItem>
        <NFormItem label="邮箱" required>
          <NInput v-model:value="formModel.email" placeholder="请输入邮箱" />
        </NFormItem>
        <NFormItem label="手机号">
          <NInput v-model:value="formModel.phone" placeholder="请输入手机号" />
        </NFormItem>
        <NFormItem label="角色">
          <NSelect v-model:value="formModel.role" :options="roleOptions" />
        </NFormItem>
        <NFormItem label="状态">
          <NSwitch
            :value="formModel.status === '启用'"
            @update:value="(val: boolean) => formModel.status = val ? '启用' : '禁用'"
          >
            <template #checked>启用</template>
            <template #unchecked>禁用</template>
          </NSwitch>
        </NFormItem>
      </NForm>
      <template #footer>
        <NSpace justify="end">
          <NButton @click="showModal = false">{{ t('common.cancel') }}</NButton>
          <NButton type="primary" @click="handleSave">{{ t('common.save') }}</NButton>
        </NSpace>
      </template>
    </NModal>
  </div>
</template>
