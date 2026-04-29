/**
 * 用户信息和权限 Mock 数据
 */
import type { MockResponse, RolePermission } from '@/types'

const adminPermissions: string[] = [
  'dashboard:view',
  'permission:view',
  'permission:edit',
  'user:view',
  'user:edit',
  'user:delete',
  'role:view',
  'role:edit',
  'system:settings',
]

const userPermissions: string[] = [
  'dashboard:view',
  'user:view',
]

const rolePermissions: RolePermission[] = [
  {
    role: 'admin',
    roleName: '管理员',
    description: '拥有系统全部权限',
    permissions: adminPermissions,
  },
  {
    role: 'user',
    roleName: '普通用户',
    description: '拥有基础功能权限',
    permissions: userPermissions,
  },
]

export function handlePermissionsMock(role: string): MockResponse<{ role: string; permissions: string[] }> {
  const roleData = rolePermissions.find((r) => r.role === role)
  const permissions = roleData ? roleData.permissions : userPermissions

  return {
    code: 200,
    message: 'success',
    data: { role, permissions },
  }
}

export function handleRolePermissionsMock(): MockResponse<RolePermission[]> {
  return {
    code: 200,
    message: 'success',
    data: rolePermissions,
  }
}

export function handleUpdateRolePermissionsMock(): MockResponse<null> {
  return {
    code: 200,
    message: '权限更新成功',
    data: null,
  }
}
