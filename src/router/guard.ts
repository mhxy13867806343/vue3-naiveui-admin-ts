/**
 * 路由守卫
 * 简化版：只做认证检查
 */
import type { Router } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const WHITE_LIST = ['/login', '/register', '/401', '/403', '/404', '/500']

export function setupRouterGuard(router: Router) {
  router.beforeEach(async (to, _from, next) => {
    const authStore = useAuthStore()

    // 白名单直接放行
    if (WHITE_LIST.includes(to.path)) {
      if (to.path === '/login' && authStore.isAuthenticated) {
        next('/dashboard')
        return
      }
      next()
      return
    }

    // 无 token → login
    if (!authStore.isAuthenticated) {
      next('/login')
      return
    }

    // 有 token → 放行
    next()
  })
}
