/**
 * Permission Store - 权限状态管理
 * 管理 role、permissions、dynamicRoutesRegistered 状态
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { get } from '@/api/http'
import type { MockResponse } from '@/types'

export const usePermissionStore = defineStore('permission', () => {
  const role = ref<string>(localStorage.getItem('role') || '')
  const permissions = ref<string[]>([])
  const dynamicRoutesRegistered = ref(false)

  async function loadPermissions() {
    const currentRole = localStorage.getItem('role') || 'user'
    const res = await get<MockResponse<{ role: string; permissions: string[] }>>(
      '/api/permissions',
      { role: currentRole },
    )

    if (res.code === 200 && res.data) {
      role.value = res.data.role
      permissions.value = res.data.permissions
    }
  }

  function hasPermission(permission: string): boolean {
    return permissions.value.includes(permission)
  }

  function hasRole(targetRole: string): boolean {
    return role.value === targetRole
  }

  function clearPermissions() {
    role.value = ''
    permissions.value = []
    dynamicRoutesRegistered.value = false
  }

  return {
    role,
    permissions,
    dynamicRoutesRegistered,
    loadPermissions,
    hasPermission,
    hasRole,
    clearPermissions,
  }
})
