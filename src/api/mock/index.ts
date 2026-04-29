/**
 * Mock 服务入口
 * 使用 Axios 拦截器方式实现 Mock，比 MockJS 的 XHR 拦截更可靠
 */
import { isMockEnabled } from '@/utils/env'
import httpClient from '../http'
import { handleLoginMock } from './auth'
import { handlePermissionsMock, handleRolePermissionsMock, handleUpdateRolePermissionsMock } from './user'

export async function setupMock() {
  if (!isMockEnabled()) {
    return
  }

  // 使用 Axios 请求拦截器实现 Mock
  httpClient.interceptors.request.use((config) => {
    const url = config.url || ''
    const method = (config.method || 'get').toLowerCase()

    let mockData: unknown = null

    // 登录
    if (url.includes('/login') && method === 'post') {
      mockData = handleLoginMock(config.data)
    }
    // 获取权限
    else if (url.includes('/permissions') && !url.includes('/role-permissions') && method === 'get') {
      const role = config.params?.role || 'user'
      mockData = handlePermissionsMock(role)
    }
    // 获取角色权限列表
    else if (url.includes('/role-permissions') && method === 'get') {
      mockData = handleRolePermissionsMock()
    }
    // 更新角色权限
    else if (url.includes('/role-permissions') && method === 'put') {
      mockData = handleUpdateRolePermissionsMock()
    }

    if (mockData !== null) {
      // 通过 adapter 返回 mock 数据，跳过真实请求
      config.adapter = () => {
        return Promise.resolve({
          data: mockData,
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
        })
      }
    }

    return config
  })

  console.log('[Mock] Mock service enabled (axios interceptor mode)')
}
