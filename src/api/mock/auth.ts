/**
 * 登录 Mock 数据
 * admin/admin123 → admin 角色, user/user123 → user 角色
 */
import type { MockResponse, LoginResponse } from '@/types'

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

export function handleLoginMock(body: string | object): MockResponse<LoginResponse | null> {
  const data = typeof body === 'string' ? JSON.parse(body) : body
  const { username, password } = data
  const user = users[username]

  if (user && user.password === password) {
    return {
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
  }

  return {
    code: 401,
    message: '用户名或密码错误',
    data: null,
  }
}
