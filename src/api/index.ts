/**
 * API 统一入口
 * Mock 模式下直接返回本地数据，非 Mock 模式走 HTTP 请求
 */
import { isMockEnabled } from '@/utils/env'
import { get, post, put } from './http'
import { mockLogin, mockGetPermissions, mockGetRolePermissions } from './mock/data'
import type { LoginResponse, MockResponse, RolePermission } from '@/types'

const useMock = isMockEnabled()

/** 登录 */
export async function apiLogin(username: string, password: string): Promise<MockResponse<LoginResponse | null>> {
  if (useMock) {
    // 模拟网络延迟
    await new Promise((r) => setTimeout(r, 300))
    return mockLogin(username, password)
  }
  return post<MockResponse<LoginResponse | null>>('/login', { username, password })
}

/** 获取用户权限 */
export async function apiGetPermissions(role: string): Promise<MockResponse<{ role: string; permissions: string[] }>> {
  if (useMock) {
    await new Promise((r) => setTimeout(r, 200))
    return mockGetPermissions(role)
  }
  return get<MockResponse<{ role: string; permissions: string[] }>>('/permissions', { role })
}

/** 获取所有角色权限 */
export async function apiGetRolePermissions(): Promise<MockResponse<RolePermission[]>> {
  if (useMock) {
    await new Promise((r) => setTimeout(r, 200))
    return mockGetRolePermissions()
  }
  return get<MockResponse<RolePermission[]>>('/role-permissions')
}

/** 更新角色权限 */
export async function apiUpdateRolePermissions(role: string, permissions: string[]): Promise<MockResponse<null>> {
  if (useMock) {
    await new Promise((r) => setTimeout(r, 300))
    return { code: 200, message: '权限更新成功', data: null }
  }
  return put<MockResponse<null>>('/role-permissions', { role, permissions })
}
