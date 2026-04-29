/**
 * Permission Store - 权限状态管理
 */
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { apiGetPermissions } from '@/api'

export const usePermissionStore = defineStore('permission', () => {
  const role = ref<string>(localStorage.getItem('role') || '')
  const permissions = ref<string[]>([])
  const dynamicRoutesRegistered = ref(false)

  async function loadPermissions() {
    const currentRole = localStorage.getItem('role') || 'user'
    const res = await apiGetPermissions(currentRole)

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
