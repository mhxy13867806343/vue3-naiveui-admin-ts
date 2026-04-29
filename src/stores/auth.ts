/**
 * Auth Store - 认证状态管理
 * 管理 token、username 状态，提供 login/logout 方法
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { post } from '@/api/http'
import type { LoginResponse, MockResponse } from '@/types'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const username = ref<string>(localStorage.getItem('username') || '')

  const isAuthenticated = computed(() => !!token.value)

  async function login(user: string, password: string) {
    const res = await post<MockResponse<LoginResponse>>('/api/login', {
      username: user,
      password,
    })

    if (res.code === 200 && res.data) {
      token.value = res.data.token
      username.value = res.data.userInfo.username
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('username', res.data.userInfo.username)
      localStorage.setItem('role', res.data.userInfo.role)
    } else {
      throw new Error(res.message || 'Login failed')
    }
  }

  function logout() {
    token.value = null
    username.value = ''
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    localStorage.removeItem('role')
  }

  return {
    token,
    username,
    isAuthenticated,
    login,
    logout,
  }
})
