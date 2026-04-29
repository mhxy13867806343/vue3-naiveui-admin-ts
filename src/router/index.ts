/**
 * 路由实例与静态路由配置
 * 静态路由包含 /login、/register、/401、/403、/404、/500
 */
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

export const staticRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Root',
    redirect: '/dashboard',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/LoginPage.vue'),
    meta: { title: '登录' },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/register/RegisterPage.vue'),
    meta: { title: '注册' },
  },
  {
    path: '/401',
    name: 'Error401',
    component: () => import('@/views/error/Error401.vue'),
    meta: { title: '401' },
  },
  {
    path: '/403',
    name: 'Error403',
    component: () => import('@/views/error/Error403.vue'),
    meta: { title: '403' },
  },
  {
    path: '/404',
    name: 'Error404',
    component: () => import('@/views/error/Error404.vue'),
    meta: { title: '404' },
  },
  {
    path: '/500',
    name: 'Error500',
    component: () => import('@/views/error/Error500.vue'),
    meta: { title: '500' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: staticRoutes,
})

export default router
