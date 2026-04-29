/**
 * usePermission - 权限判断 Hook
 * 从 Permission Store 读取权限和角色信息
 */
import { usePermissionStore } from '@/stores/permission'

export function usePermission() {
  const permissionStore = usePermissionStore()

  function hasPermission(permission: string): boolean {
    return permissionStore.hasPermission(permission)
  }

  function hasRole(role: string): boolean {
    return permissionStore.hasRole(role)
  }

  return {
    hasPermission,
    hasRole,
  }
}
