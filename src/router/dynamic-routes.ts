/**
 * 动态路由配置表
 * 所有需要权限控制的业务路由，使用 Layout 作为父组件，懒加载子组件
 */
import type { RouteRecordRaw } from 'vue-router'

const AdminLayout = () => import('@/layouts/AdminLayout.vue')

export const dynamicRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: AdminLayout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/DashboardPage.vue'),
        meta: {
          title: 'menu.dashboard',
          icon: 'dashboard',
          permissions: ['dashboard:view'],
          roles: ['admin', 'user'],
        },
      },
    ],
  },
  {
    path: '/permission-management',
    component: AdminLayout,
    children: [
      {
        path: '',
        name: 'PermissionManagement',
        component: () => import('@/views/permission/PermissionManagement.vue'),
        meta: {
          title: 'menu.permissionManagement',
          icon: 'permission',
          permissions: ['permission:view'],
          roles: ['admin'],
        },
      },
    ],
  },
]
