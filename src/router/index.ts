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
        path: 'components/icons',
        name: 'IconsDemo',
        component: () => import('@/views/components/IconsDemo.vue'),
        meta: { title: '图标展示' },
      },
      // Charts group - 25 chart types
      {
        path: 'charts/line',
        name: 'LineChart',
        component: () => import('@/views/charts/LineChart.vue'),
        meta: { title: '折线图' },
      },
      {
        path: 'charts/area',
        name: 'AreaChart',
        component: () => import('@/views/charts/AreaChart.vue'),
        meta: { title: '面积图' },
      },
      {
        path: 'charts/bar',
        name: 'BarChart',
        component: () => import('@/views/charts/BarChart.vue'),
        meta: { title: '柱状图' },
      },
      {
        path: 'charts/horizontal-bar',
        name: 'HorizontalBar',
        component: () => import('@/views/charts/HorizontalBar.vue'),
        meta: { title: '横向柱状图' },
      },
      {
        path: 'charts/pie',
        name: 'PieChart',
        component: () => import('@/views/charts/PieChart.vue'),
        meta: { title: '饼图' },
      },
      {
        path: 'charts/doughnut',
        name: 'DoughnutChart',
        component: () => import('@/views/charts/DoughnutChart.vue'),
        meta: { title: '环形图' },
      },
      {
        path: 'charts/scatter',
        name: 'ScatterChart',
        component: () => import('@/views/charts/ScatterChart.vue'),
        meta: { title: '散点图' },
      },
      {
        path: 'charts/radar',
        name: 'RadarChart',
        component: () => import('@/views/charts/RadarChart.vue'),
        meta: { title: '雷达图' },
      },
      {
        path: 'charts/funnel',
        name: 'FunnelChart',
        component: () => import('@/views/charts/FunnelChart.vue'),
        meta: { title: '漏斗图' },
      },
      {
        path: 'charts/gauge',
        name: 'GaugeChart',
        component: () => import('@/views/charts/GaugeChart.vue'),
        meta: { title: '仪表盘图' },
      },
      {
        path: 'charts/heatmap',
        name: 'HeatmapChart',
        component: () => import('@/views/charts/HeatmapChart.vue'),
        meta: { title: '热力图' },
      },
      {
        path: 'charts/treemap',
        name: 'TreemapChart',
        component: () => import('@/views/charts/TreemapChart.vue'),
        meta: { title: '矩形树图' },
      },
      {
        path: 'charts/sunburst',
        name: 'SunburstChart',
        component: () => import('@/views/charts/SunburstChart.vue'),
        meta: { title: '旭日图' },
      },
      {
        path: 'charts/sankey',
        name: 'SankeyChart',
        component: () => import('@/views/charts/SankeyChart.vue'),
        meta: { title: '桑基图' },
      },
      {
        path: 'charts/candlestick',
        name: 'CandlestickChart',
        component: () => import('@/views/charts/CandlestickChart.vue'),
        meta: { title: 'K线图' },
      },
      {
        path: 'charts/boxplot',
        name: 'BoxplotChart',
        component: () => import('@/views/charts/BoxplotChart.vue'),
        meta: { title: '箱线图' },
      },
      {
        path: 'charts/waterfall',
        name: 'WaterfallChart',
        component: () => import('@/views/charts/WaterfallChart.vue'),
        meta: { title: '瀑布图' },
      },
      {
        path: 'charts/mixed',
        name: 'MixedChart',
        component: () => import('@/views/charts/MixedChart.vue'),
        meta: { title: '混合图' },
      },
      {
        path: 'charts/stacked-bar',
        name: 'StackedBar',
        component: () => import('@/views/charts/StackedBar.vue'),
        meta: { title: '堆叠柱状图' },
      },
      {
        path: 'charts/stacked-area',
        name: 'StackedArea',
        component: () => import('@/views/charts/StackedArea.vue'),
        meta: { title: '堆叠面积图' },
      },
      {
        path: 'charts/polar',
        name: 'PolarChart',
        component: () => import('@/views/charts/PolarChart.vue'),
        meta: { title: '极坐标图' },
      },
      {
        path: 'charts/rose',
        name: 'RoseChart',
        component: () => import('@/views/charts/RoseChart.vue'),
        meta: { title: '南丁格尔玫瑰图' },
      },
      {
        path: 'charts/parallel',
        name: 'ParallelChart',
        component: () => import('@/views/charts/ParallelChart.vue'),
        meta: { title: '平行坐标图' },
      },
      {
        path: 'charts/theme-river',
        name: 'ThemeRiverChart',
        component: () => import('@/views/charts/ThemeRiverChart.vue'),
        meta: { title: '主题河流图' },
      },
      {
        path: 'charts/graph',
        name: 'GraphChart',
        component: () => import('@/views/charts/GraphChart.vue'),
        meta: { title: '关系图' },
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
      {
        path: 'features/dayjs',
        name: 'DayjsDemo',
        component: () => import('@/views/features/DayjsDemo.vue'),
        meta: { title: 'dayjs 日期处理' },
      },
      {
        path: 'features/lodash',
        name: 'LodashDemo',
        component: () => import('@/views/features/LodashDemo.vue'),
        meta: { title: 'lodash 工具函数' },
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
