/**
 * 动态路由注册/移除逻辑
 * generateRoutes: 根据权限列表筛选有权限的路由
 * registerDynamicRoutes: 使用 addRoute 逐一注册路由
 * resetRoutes: 移除所有动态路由，恢复静态路由状态
 */
import type { RouteRecordRaw, Router } from 'vue-router'

/** 已注册的动态路由名称列表，用于 resetRoutes 时移除 */
const registeredRouteNames: string[] = []

/**
 * 根据权限列表筛选有权限的路由
 */
export function generateRoutes(
  allRoutes: RouteRecordRaw[],
  permissions: string[],
): RouteRecordRaw[] {
  return allRoutes.filter((route) => {
    // 检查子路由权限
    if (route.children) {
      route.children = generateRoutes(route.children, permissions)
      return route.children.length > 0
    }

    // 无权限要求的路由直接放行
    const routePermissions = (route.meta?.permissions as string[] | undefined)
    if (!routePermissions || routePermissions.length === 0) {
      return true
    }

    // 检查是否有任一权限匹配
    return routePermissions.some((p) => permissions.includes(p))
  })
}

/**
 * 使用 addRoute 逐一注册动态路由，并在最后添加 catch-all 404 路由
 */
export function registerDynamicRoutes(router: Router, routes: RouteRecordRaw[]) {
  routes.forEach((route) => {
    router.addRoute(route)
    if (route.name) {
      registeredRouteNames.push(route.name as string)
    }
    // 收集子路由名称
    if (route.children) {
      route.children.forEach((child) => {
        if (child.name) {
          registeredRouteNames.push(child.name as string)
        }
      })
    }
  })

  // 动态路由注册完成后，添加 catch-all 404 路由（确保在所有路由之后匹配）
  router.addRoute({
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/404',
  })
  registeredRouteNames.push('NotFound')
}

/**
 * 移除所有动态路由，恢复静态路由状态
 */
export function resetRoutes(router: Router) {
  registeredRouteNames.forEach((name) => {
    if (router.hasRoute(name)) {
      router.removeRoute(name)
    }
  })
  registeredRouteNames.length = 0
}
