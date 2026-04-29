/**
 * Mock 数据定义
 * 所有 Mock 数据集中管理
 */
import type { LoginResponse, MockResponse, RolePermission } from '@/types'

const adminPermissions: string[] = [
  'dashboard:view',
  'dashboard:workspace',
  'dashboard:analytics',
  'system:user:view',
  'system:user:edit',
  'system:user:delete',
  'system:role:view',
  'system:role:edit',
  'system:menu:view',
  'system:menu:edit',
  'system:department:view',
  'system:department:edit',
  'content:article:view',
  'content:article:edit',
  'content:article:delete',
  'content:category:view',
  'content:category:edit',
  'content:tag:view',
  'content:tag:edit',
  'components:editor',
  'components:drag',
  'components:charts',
  'components:icons',
  'features:i18n',
  'features:clipboard',
  'features:print',
  'permission:view',
  'permission:edit',
  'about:view',
  'user:view',
  'user:edit',
  'user:delete',
  'role:view',
  'role:edit',
  'system:settings',
]

const userPermissions: string[] = [
  'dashboard:view',
  'dashboard:workspace',
  'dashboard:analytics',
  'user:view',
  'content:article:view',
  'content:category:view',
  'content:tag:view',
  'components:editor',
  'components:charts',
  'components:icons',
  'about:view',
]

const users: Record<string, { password: string; role: 'admin' | 'user'; token: string }> = {
  admin: {
    password: 'admin123',
    role: 'admin',
    token: 'mock-token-admin-' + Date.now(),
  },
  user: {
    password: 'user123',
    role: 'user',
    token: 'mock-token-user-' + Date.now(),
  },
}

export const rolePermissionsList: RolePermission[] = [
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

export function mockLogin(username: string, password: string): MockResponse<LoginResponse | null> {
  const user = users[username]
  if (user && user.password === password) {
    return {
      code: 200,
      message: '登录成功',
      data: {
        token: user.token,
        userInfo: { username, role: user.role },
      },
    }
  }
  return { code: 401, message: '用户名或密码错误', data: null }
}

export function mockGetPermissions(role: string): MockResponse<{ role: string; permissions: string[] }> {
  const roleData = rolePermissionsList.find((r) => r.role === role)
  return {
    code: 200,
    message: 'success',
    data: {
      role,
      permissions: roleData ? roleData.permissions : userPermissions,
    },
  }
}

export function mockGetRolePermissions(): MockResponse<RolePermission[]> {
  return { code: 200, message: 'success', data: rolePermissionsList }
}
