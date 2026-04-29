/**
 * 路由守卫
 * beforeEach: 白名单检查、token 检查、动态路由注册、权限检查
 */
import type { Router } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { usePermissionStore } from '@/stores/permission'
import { dynamicRoutes } from './dynamic-routes'
import { generateRoutes, registerDynamicRoutes, resetRoutes } from './dynamic-router'

/** 白名单路由 - 无需认证即可访问 */
const WHITE_LIST = ['/login', '/register', '/401', '/403', '/404', '/500']

export function setupRouterGuard(router: Router) {
  router.beforeEach(async (to, _from, next) => {
    const authStore = useAuthStore()
    const permissionStore = usePermissionStore()

    // 1. 白名单路由直接放行
    if (WHITE_LIST.includes(to.path)) {
      // 已登录用户访问 /login 重定向到 /dashboard
      if (to.path === '/login' && authStore.isAuthenticated) {
        next('/dashboard')
        return
      }
      next()
      return
    }

    // 2. 无 token → 重定向 /login
    if (!authStore.isAuthenticated) {
      next('/login')
      return
    }

    // 3. 有 token + 动态路由未注册 → 加载权限 + 注册动态路由
    if (!permissionStore.dynamicRoutesRegistered) {
      try {
        await permissionStore.loadPermissions()
        const accessRoutes = generateRoutes(
          JSON.parse(JSON.stringify(dynamicRoutes)),
          permissionStore.permissions,
        )
        registerDynamicRoutes(router, accessRoutes)
        permissionStore.dynamicRoutesRegistered = true

        // 重新导航到目标路由（确保动态路由已注册）
        next({ ...to, replace: true })
        return
      } catch (_error) {
        // 权限加载失败，清除状态并重定向到登录页
        authStore.logout()
        permissionStore.clearPermissions()
        resetRoutes(router)
        next('/login')
        return
      }
    }

    // 4. 有 token + 已注册 → 检查路由权限
    const routePermissions = to.meta?.permissions as string[] | undefined
    if (routePermissions && routePermissions.length > 0) {
      const hasAccess = routePermissions.some((p) => permissionStore.hasPermission(p))
      if (!hasAccess) {
        next('/403')
        return
      }
    }

    next()
  })
}
