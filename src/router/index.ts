/**
 * 路由实例与静态路由配置
 * 静态路由包含 /login、/register、/401、/403、/404、/500
 */
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

export const staticRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/AdminLayout.vue'),
    redirect: '/dashboard/workspace',
    children: [
      // Dashboard group
      {
        path: 'dashboard/workspace',
        name: 'Workspace',
        component: () => import('@/views/dashboard/WorkspacePage.vue'),
        meta: { title: '工作台' },
      },
      {
        path: 'dashboard/analytics',
        name: 'Analytics',
        component: () => import('@/views/dashboard/AnalyticsPage.vue'),
        meta: { title: '数据分析' },
      },
      // System group
      {
        path: 'system/user',
        name: 'UserManagement',
        component: () => import('@/views/system/UserManagement.vue'),
        meta: { title: '用户管理' },
      },
      {
        path: 'system/role',
        name: 'RoleManagement',
        component: () => import('@/views/system/RoleManagement.vue'),
        meta: { title: '角色管理' },
      },
      {
        path: 'system/menu',
        name: 'MenuManagement',
        component: () => import('@/views/system/MenuManagement.vue'),
        meta: { title: '菜单管理' },
      },
      {
        path: 'system/department',
        name: 'DepartmentManagement',
        component: () => import('@/views/system/DepartmentManagement.vue'),
        meta: { title: '部门管理' },
      },
      // Content group
      {
        path: 'content/article',
        name: 'ArticleManagement',
        component: () => import('@/views/content/ArticleManagement.vue'),
        meta: { title: '文章管理' },
      },
      {
        path: 'content/category',
        name: 'CategoryManagement',
        component: () => import('@/views/content/CategoryManagement.vue'),
        meta: { title: '分类管理' },
      },
      {
        path: 'content/tag',
        name: 'TagManagement',
        component: () => import('@/views/content/TagManagement.vue'),
        meta: { title: '标签管理' },
      },
      // Components group
      {
        path: 'components/editor',
        name: 'EditorDemo',
        component: () => import('@/views/components/EditorDemo.vue'),
        meta: { title: '富文本编辑器' },
      },
      {
        path: 'components/drag',
        name: 'DragDemo',
        component: () => import('@/views/components/DragDemo.vue'),
        meta: { title: '拖拽列表' },
      },
      {
        path: 'components/charts',
        name: 'ChartsDemo',
        component: () => import('@/views/components/ChartsDemo.vue'),
        meta: { title: '图表示例' },
      },
      {
        path: 'components/icons',
        name: 'IconsDemo',
        component: () => import('@/views/components/IconsDemo.vue'),
        meta: { title: '图标展示' },
      },
      // Features group
      {
        path: 'features/i18n',
        name: 'I18nDemo',
        component: () => import('@/views/features/I18nDemo.vue'),
        meta: { title: '国际化' },
      },
      {
        path: 'features/clipboard',
        name: 'ClipboardDemo',
        component: () => import('@/views/features/ClipboardDemo.vue'),
        meta: { title: '剪贴板' },
      },
      {
        path: 'features/print',
        name: 'PrintDemo',
        component: () => import('@/views/features/PrintDemo.vue'),
        meta: { title: '打印' },
      },
      // Permission
      {
        path: 'permission-management',
        name: 'PermissionManagement',
        component: () => import('@/views/permission/PermissionManagement.vue'),
        meta: { title: '权限管理' },
      },
      // About
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/about/AboutPage.vue'),
        meta: { title: '关于' },
      },
    ],
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
