/**
 * 登录 Mock 数据
 * admin/admin123 → admin 角色, user/user123 → user 角色
 */
import Mock from 'mockjs'
import type { MockResponse, LoginResponse } from '@/types'

const users: Record<string, { password: string; role: 'admin' | 'user'; token: string }> = {
  admin: {
    password: 'admin123',
    role: 'admin',
    token: 'mock-token-admin-' + Mock.Random.guid(),
  },
  user: {
    password: 'user123',
    role: 'user',
    token: 'mock-token-user-' + Mock.Random.guid(),
  },
}

export function setupAuthMock() {
  Mock.mock(/\/api\/login/, 'post', (options: { body: string }) => {
    const { username, password } = JSON.parse(options.body)
    const user = users[username]

    if (user && user.password === password) {
      const response: MockResponse<LoginResponse> = {
        code: 200,
        message: '登录成功',
        data: {
          token: user.token,
          userInfo: {
            username,
            role: user.role,
          },
        },
      }
      return response
    }

    return {
      code: 401,
      message: '用户名或密码错误',
      data: null,
    }
  })
}
