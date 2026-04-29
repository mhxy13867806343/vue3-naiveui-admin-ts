<script setup lang="ts">
/**
 * 权限管理页面
 * 角色列表、权限树、编辑权限配置（仅 admin 可见）
 */
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  NCard,
  NGrid,
  NGridItem,
  NList,
  NListItem,
  NThing,
  NTree,
  NButton,
  NEmpty,
  useMessage,
  type TreeOption,
} from 'naive-ui'
import { get as httpGet, put as httpPut } from '@/api/http'
import type { MockResponse, RolePermission } from '@/types'
import { useLoading } from '@/composables/useLoading'

const { t } = useI18n()
const message = useMessage()
const { loading, run } = useLoading()

const roles = ref<RolePermission[]>([])
const selectedRole = ref<string>('')
const checkedKeys = ref<string[]>([])

/** 权限树选项 */
const permissionTreeOptions = computed<TreeOption[]>(() => {
  return [
    {
      key: 'dashboard',
      label: t('menu.dashboard'),
      children: [
        { key: 'dashboard:view', label: 'dashboard:view' },
      ],
    },
    {
      key: 'permission',
      label: t('menu.permissionManagement'),
      children: [
        { key: 'permission:view', label: 'permission:view' },
        { key: 'permission:edit', label: 'permission:edit' },
      ],
    },
    {
      key: 'user',
      label: t('menu.userManagement'),
      children: [
        { key: 'user:view', label: 'user:view' },
        { key: 'user:edit', label: 'user:edit' },
        { key: 'user:delete', label: 'user:delete' },
      ],
    },
    {
      key: 'role',
      label: t('menu.roleManagement'),
      children: [
        { key: 'role:view', label: 'role:view' },
        { key: 'role:edit', label: 'role:edit' },
      ],
    },
    {
      key: 'system',
      label: t('menu.systemSettings'),
      children: [
        { key: 'system:settings', label: 'system:settings' },
      ],
    },
  ]
})

/** 加载角色权限数据 */
async function loadRolePermissions() {
  await run(async () => {
    const res = await httpGet<MockResponse<RolePermission[]>>('/api/role-permissions')
    if (res.code === 200 && res.data) {
      roles.value = res.data
    }
  })
}

/** 选择角色 */
function handleSelectRole(role: string) {
  selectedRole.value = role
  const roleData = roles.value.find((r) => r.role === role)
  checkedKeys.value = roleData ? [...roleData.permissions] : []
}

/** 更新权限 */
async function handleUpdatePermissions() {
  try {
    await run(async () => {
      await httpPut('/api/role-permissions', {
        role: selectedRole.value,
        permissions: checkedKeys.value,
      })
    })
    message.success(t('permission.saveSuccess'))
  } catch {
    message.error(t('permission.saveFailed'))
  }
}

// 初始加载
loadRolePermissions()
</script>

<template>
  <div>
    <h2 class="text-2xl font-semibold mb-6">{{ t('permission.title') }}</h2>
    <NGrid :cols="2" :x-gap="16">
      <NGridItem>
        <NCard :title="t('permission.roleName')">
          <NList hoverable clickable>
            <NListItem
              v-for="role in roles"
              :key="role.role"
              @click="handleSelectRole(role.role)"
              :class="{ 'bg-blue-50': selectedRole === role.role }"
            >
              <NThing
                :title="role.role === 'admin' ? t('permission.admin') : t('permission.user')"
                :description="role.role === 'admin' ? t('permission.adminDesc') : t('permission.userDesc')"
              />
            </NListItem>
          </NList>
        </NCard>
      </NGridItem>
      <NGridItem>
        <NCard :title="t('permission.permissionList')">
          <template v-if="selectedRole">
            <NTree
              :data="permissionTreeOptions"
              checkable
              :checked-keys="checkedKeys"
              @update:checked-keys="(keys: string[]) => (checkedKeys = keys)"
              cascade
              selectable
              block-line
            />
            <div class="mt-4">
              <NButton
                type="primary"
                :loading="loading"
                @click="handleUpdatePermissions"
              >
                {{ t('permission.updatePermissions') }}
              </NButton>
            </div>
          </template>
          <NEmpty v-else :description="t('permission.selectRole')" />
        </NCard>
      </NGridItem>
    </NGrid>
  </div>
</template>
