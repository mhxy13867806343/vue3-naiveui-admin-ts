/**
 * 用户信息和权限 Mock 数据
 */
import Mock from 'mockjs'
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

export function setupUserMock() {
  // 获取用户权限
  Mock.mock(/\/api\/permissions/, 'get', (options: { url: string }) => {
    const url = new URL(options.url, 'http://localhost')
    const role = url.searchParams.get('role') || 'user'

    const roleData = rolePermissions.find((r) => r.role === role)
    const permissions = roleData ? roleData.permissions : userPermissions

    const response: MockResponse<{ role: string; permissions: string[] }> = {
      code: 200,
      message: 'success',
      data: {
        role,
        permissions,
      },
    }
    return response
  })

  // 获取所有角色权限配置
  Mock.mock(/\/api\/role-permissions/, 'get', () => {
    const response: MockResponse<RolePermission[]> = {
      code: 200,
      message: 'success',
      data: rolePermissions,
    }
    return response
  })

  // 更新角色权限
  Mock.mock(/\/api\/role-permissions/, 'put', () => {
    return {
      code: 200,
      message: '权限更新成功',
      data: null,
    }
  })
}
