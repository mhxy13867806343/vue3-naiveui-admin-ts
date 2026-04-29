/**
 * 动态路由配置表
 * 所有需要权限控制的业务路由，使用 Layout 作为父组件，懒加载子组件
 */
import type { RouteRecordRaw } from 'vue-router'

const AdminLayout = () => import('@/layouts/AdminLayout.vue')

export const dynamicRoutes: RouteRecordRaw[] = [
  // ---- Dashboard ----
  {
    path: '/',
    component: AdminLayout,
    redirect: '/dashboard/workspace',
    children: [
      {
        path: 'dashboard/workspace',
        name: 'Workspace',
        component: () => import('@/views/dashboard/DashboardPage.vue'),
        meta: { title: 'menu.workspace', permissions: ['dashboard:view'], roles: ['admin', 'user'] },
      },
      {
        path: 'dashboard/analytics',
        name: 'Analytics',
        component: () => import('@/views/dashboard/DashboardPage.vue'),
        meta: { title: 'menu.analytics', permissions: ['dashboard:view'], roles: ['admin', 'user'] },
      },
    ],
  },

  // ---- System Management ----
  {
    path: '/system',
    component: AdminLayout,
    children: [
      {
        path: 'user',
        name: 'UserManagement',
        component: () => import('@/views/system/UserManagement.vue'),
        meta: { title: 'menu.userManagement' },
      },
      {
        path: 'role',
        name: 'RoleManagement',
        component: () => import('@/views/system/RoleManagement.vue'),
        meta: { title: 'menu.roleManagement' },
      },
      {
        path: 'menu',
        name: 'MenuManagement',
        component: () => import('@/views/system/MenuManagement.vue'),
        meta: { title: 'menu.menuManagement' },
      },
      {
        path: 'department',
        name: 'DepartmentManagement',
        component: () => import('@/views/system/DepartmentManagement.vue'),
        meta: { title: 'menu.departmentManagement' },
      },
    ],
  },

  // ---- Content Management ----
  {
    path: '/content',
    component: AdminLayout,
    children: [
      {
        path: 'article',
        name: 'ArticleManagement',
        component: () => import('@/views/content/ArticleManagement.vue'),
        meta: { title: 'menu.articleManagement' },
      },
      {
        path: 'category',
        name: 'CategoryManagement',
        component: () => import('@/views/content/CategoryManagement.vue'),
        meta: { title: 'menu.categoryManagement' },
      },
      {
        path: 'tag',
        name: 'TagManagement',
        component: () => import('@/views/content/TagManagement.vue'),
        meta: { title: 'menu.tagManagement' },
      },
    ],
  },

  // ---- UI Components ----
  {
    path: '/ui',
    component: AdminLayout,
    children: [
      // General
      { path: 'button', name: 'UiButton', component: () => import('@/views/ui/ButtonDemo.vue'), meta: { title: 'menu.uiButton' } },
      { path: 'divider', name: 'UiDivider', component: () => import('@/views/ui/DividerDemo.vue'), meta: { title: 'menu.uiDivider' } },
      // Data Entry
      { path: 'input', name: 'UiInput', component: () => import('@/views/ui/InputDemo.vue'), meta: { title: 'menu.uiInput' } },
      { path: 'select', name: 'UiSelect', component: () => import('@/views/ui/SelectDemo.vue'), meta: { title: 'menu.uiSelect' } },
      { path: 'date-picker', name: 'UiDatePicker', component: () => import('@/views/ui/DatePickerDemo.vue'), meta: { title: 'menu.uiDatePicker' } },
      { path: 'switch', name: 'UiSwitch', component: () => import('@/views/ui/SwitchDemo.vue'), meta: { title: 'menu.uiSwitch' } },
      { path: 'slider', name: 'UiSlider', component: () => import('@/views/ui/SliderDemo.vue'), meta: { title: 'menu.uiSlider' } },
      { path: 'upload', name: 'UiUpload', component: () => import('@/views/ui/UploadDemo.vue'), meta: { title: 'menu.uiUpload' } },
      { path: 'transfer', name: 'UiTransfer', component: () => import('@/views/ui/TransferDemo.vue'), meta: { title: 'menu.uiTransfer' } },
      { path: 'color-picker', name: 'UiColorPicker', component: () => import('@/views/ui/ColorPickerDemo.vue'), meta: { title: 'menu.uiColorPicker' } },
      { path: 'form', name: 'UiForm', component: () => import('@/views/ui/FormDemo.vue'), meta: { title: 'menu.uiForm' } },
      // Data Display
      { path: 'table', name: 'UiTable', component: () => import('@/views/ui/TableDemo.vue'), meta: { title: 'menu.uiTable' } },
      { path: 'tag', name: 'UiTag', component: () => import('@/views/ui/TagDemo.vue'), meta: { title: 'menu.uiTag' } },
      { path: 'avatar', name: 'UiAvatar', component: () => import('@/views/ui/AvatarDemo.vue'), meta: { title: 'menu.uiAvatar' } },
      { path: 'badge', name: 'UiBadge', component: () => import('@/views/ui/BadgeDemo.vue'), meta: { title: 'menu.uiBadge' } },
      { path: 'card', name: 'UiCard', component: () => import('@/views/ui/CardDemo.vue'), meta: { title: 'menu.uiCard' } },
      { path: 'carousel', name: 'UiCarousel', component: () => import('@/views/ui/CarouselDemo.vue'), meta: { title: 'menu.uiCarousel' } },
      { path: 'collapse', name: 'UiCollapse', component: () => import('@/views/ui/CollapseDemo.vue'), meta: { title: 'menu.uiCollapse' } },
      { path: 'descriptions', name: 'UiDescriptions', component: () => import('@/views/ui/DescriptionsDemo.vue'), meta: { title: 'menu.uiDescriptions' } },
      { path: 'tree', name: 'UiTree', component: () => import('@/views/ui/TreeDemo.vue'), meta: { title: 'menu.uiTree' } },
      { path: 'timeline', name: 'UiTimeline', component: () => import('@/views/ui/TimelineDemo.vue'), meta: { title: 'menu.uiTimeline' } },
      { path: 'progress', name: 'UiProgress', component: () => import('@/views/ui/ProgressDemo.vue'), meta: { title: 'menu.uiProgress' } },
      { path: 'empty', name: 'UiEmpty', component: () => import('@/views/ui/EmptyDemo.vue'), meta: { title: 'menu.uiEmpty' } },
      // Feedback
      { path: 'alert', name: 'UiAlert', component: () => import('@/views/ui/AlertDemo.vue'), meta: { title: 'menu.uiAlert' } },
      { path: 'message', name: 'UiMessage', component: () => import('@/views/ui/MessageDemo.vue'), meta: { title: 'menu.uiMessage' } },
      { path: 'notification', name: 'UiNotification', component: () => import('@/views/ui/NotificationDemo.vue'), meta: { title: 'menu.uiNotification' } },
      { path: 'dialog', name: 'UiDialog', component: () => import('@/views/ui/DialogDemo.vue'), meta: { title: 'menu.uiDialog' } },
      { path: 'modal', name: 'UiModal', component: () => import('@/views/ui/ModalDemo.vue'), meta: { title: 'menu.uiModal' } },
      { path: 'drawer', name: 'UiDrawer', component: () => import('@/views/ui/DrawerDemo.vue'), meta: { title: 'menu.uiDrawer' } },
      { path: 'popover', name: 'UiPopover', component: () => import('@/views/ui/PopoverDemo.vue'), meta: { title: 'menu.uiPopover' } },
      { path: 'tooltip', name: 'UiTooltip', component: () => import('@/views/ui/TooltipDemo.vue'), meta: { title: 'menu.uiTooltip' } },
      { path: 'result', name: 'UiResult', component: () => import('@/views/ui/ResultDemo.vue'), meta: { title: 'menu.uiResult' } },
      { path: 'skeleton', name: 'UiSkeleton', component: () => import('@/views/ui/SkeletonDemo.vue'), meta: { title: 'menu.uiSkeleton' } },
      { path: 'spin', name: 'UiSpin', component: () => import('@/views/ui/SpinDemo.vue'), meta: { title: 'menu.uiSpin' } },
      // Navigation
      { path: 'menu', name: 'UiMenu', component: () => import('@/views/ui/MenuDemo.vue'), meta: { title: 'menu.uiMenu' } },
      { path: 'tabs', name: 'UiTabs', component: () => import('@/views/ui/TabsDemo.vue'), meta: { title: 'menu.uiTabs' } },
      { path: 'breadcrumb', name: 'UiBreadcrumb', component: () => import('@/views/ui/BreadcrumbDemo.vue'), meta: { title: 'menu.uiBreadcrumb' } },
      { path: 'dropdown', name: 'UiDropdown', component: () => import('@/views/ui/DropdownDemo.vue'), meta: { title: 'menu.uiDropdown' } },
      { path: 'pagination', name: 'UiPagination', component: () => import('@/views/ui/PaginationDemo.vue'), meta: { title: 'menu.uiPagination' } },
      { path: 'steps', name: 'UiSteps', component: () => import('@/views/ui/StepsDemo.vue'), meta: { title: 'menu.uiSteps' } },
    ],
  },

  // ---- Charts (25 types) ----
  {
    path: '/charts',
    component: AdminLayout,
    children: [
      { path: 'line', name: 'ChartLine', component: () => import('@/views/charts/LineChart.vue'), meta: { title: 'menu.chartLine' } },
      { path: 'area', name: 'ChartArea', component: () => import('@/views/charts/AreaChart.vue'), meta: { title: 'menu.chartArea' } },
      { path: 'bar', name: 'ChartBar', component: () => import('@/views/charts/BarChart.vue'), meta: { title: 'menu.chartBar' } },
      { path: 'horizontal-bar', name: 'ChartHorizontalBar', component: () => import('@/views/charts/HorizontalBar.vue'), meta: { title: 'menu.chartHorizontalBar' } },
      { path: 'pie', name: 'ChartPie', component: () => import('@/views/charts/PieChart.vue'), meta: { title: 'menu.chartPie' } },
      { path: 'doughnut', name: 'ChartDoughnut', component: () => import('@/views/charts/DoughnutChart.vue'), meta: { title: 'menu.chartDoughnut' } },
      { path: 'scatter', name: 'ChartScatter', component: () => import('@/views/charts/ScatterChart.vue'), meta: { title: 'menu.chartScatter' } },
      { path: 'radar', name: 'ChartRadar', component: () => import('@/views/charts/RadarChart.vue'), meta: { title: 'menu.chartRadar' } },
      { path: 'funnel', name: 'ChartFunnel', component: () => import('@/views/charts/FunnelChart.vue'), meta: { title: 'menu.chartFunnel' } },
      { path: 'gauge', name: 'ChartGauge', component: () => import('@/views/charts/GaugeChart.vue'), meta: { title: 'menu.chartGauge' } },
      { path: 'heatmap', name: 'ChartHeatmap', component: () => import('@/views/charts/HeatmapChart.vue'), meta: { title: 'menu.chartHeatmap' } },
      { path: 'treemap', name: 'ChartTreemap', component: () => import('@/views/charts/TreemapChart.vue'), meta: { title: 'menu.chartTreemap' } },
      { path: 'sunburst', name: 'ChartSunburst', component: () => import('@/views/charts/SunburstChart.vue'), meta: { title: 'menu.chartSunburst' } },
      { path: 'sankey', name: 'ChartSankey', component: () => import('@/views/charts/SankeyChart.vue'), meta: { title: 'menu.chartSankey' } },
      { path: 'candlestick', name: 'ChartCandlestick', component: () => import('@/views/charts/CandlestickChart.vue'), meta: { title: 'menu.chartCandlestick' } },
      { path: 'boxplot', name: 'ChartBoxplot', component: () => import('@/views/charts/BoxplotChart.vue'), meta: { title: 'menu.chartBoxplot' } },
      { path: 'waterfall', name: 'ChartWaterfall', component: () => import('@/views/charts/WaterfallChart.vue'), meta: { title: 'menu.chartWaterfall' } },
      { path: 'mixed', name: 'ChartMixed', component: () => import('@/views/charts/MixedChart.vue'), meta: { title: 'menu.chartMixed' } },
      { path: 'stacked-bar', name: 'ChartStackedBar', component: () => import('@/views/charts/StackedBar.vue'), meta: { title: 'menu.chartStackedBar' } },
      { path: 'stacked-area', name: 'ChartStackedArea', component: () => import('@/views/charts/StackedArea.vue'), meta: { title: 'menu.chartStackedArea' } },
      { path: 'polar', name: 'ChartPolar', component: () => import('@/views/charts/PolarChart.vue'), meta: { title: 'menu.chartPolar' } },
      { path: 'rose', name: 'ChartRose', component: () => import('@/views/charts/RoseChart.vue'), meta: { title: 'menu.chartRose' } },
      { path: 'parallel', name: 'ChartParallel', component: () => import('@/views/charts/ParallelChart.vue'), meta: { title: 'menu.chartParallel' } },
      { path: 'theme-river', name: 'ChartThemeRiver', component: () => import('@/views/charts/ThemeRiverChart.vue'), meta: { title: 'menu.chartThemeRiver' } },
      { path: 'graph', name: 'ChartGraph', component: () => import('@/views/charts/GraphChart.vue'), meta: { title: 'menu.chartGraph' } },
    ],
  },

  // ---- Third Party Components ----
  {
    path: '/components',
    component: AdminLayout,
    children: [
      { path: 'editor', name: 'EditorDemo', component: () => import('@/views/components/EditorDemo.vue'), meta: { title: 'menu.editorDemo' } },
      { path: 'drag', name: 'DragDemo', component: () => import('@/views/components/DragDemo.vue'), meta: { title: 'menu.dragDemo' } },
      { path: 'icons', name: 'IconsDemo', component: () => import('@/views/components/IconsDemo.vue'), meta: { title: 'menu.iconsDemo' } },
    ],
  },

  // ---- Features ----
  {
    path: '/features',
    component: AdminLayout,
    children: [
      { path: 'i18n', name: 'I18nDemo', component: () => import('@/views/features/I18nDemo.vue'), meta: { title: 'menu.i18nDemo' } },
      { path: 'clipboard', name: 'ClipboardDemo', component: () => import('@/views/features/ClipboardDemo.vue'), meta: { title: 'menu.clipboardDemo' } },
      { path: 'print', name: 'PrintDemo', component: () => import('@/views/features/PrintDemo.vue'), meta: { title: 'menu.printDemo' } },
      { path: 'dayjs', name: 'DayjsDemo', component: () => import('@/views/features/DayjsDemo.vue'), meta: { title: 'menu.dayjsDemo' } },
      { path: 'lodash', name: 'LodashDemo', component: () => import('@/views/features/LodashDemo.vue'), meta: { title: 'menu.lodashDemo' } },
    ],
  },

  // ---- Hooks ----
  {
    path: '/hooks',
    component: AdminLayout,
    children: [
      { path: 'use-loading', name: 'UseLoadingDemo', component: () => import('@/views/hooks/UseLoadingDemo.vue'), meta: { title: 'useLoading' } },
      { path: 'use-pagination', name: 'UsePaginationDemo', component: () => import('@/views/hooks/UsePaginationDemo.vue'), meta: { title: 'usePagination' } },
      { path: 'use-permission', name: 'UsePermissionDemo', component: () => import('@/views/hooks/UsePermissionDemo.vue'), meta: { title: 'usePermission' } },
      { path: 'use-sms-countdown', name: 'UseSmsCountdownDemo', component: () => import('@/views/hooks/UseSmsCountdownDemo.vue'), meta: { title: 'useSmsCountdown' } },
      { path: 'use-local-storage', name: 'UseLocalStorageDemo', component: () => import('@/views/hooks/UseLocalStorageDemo.vue'), meta: { title: 'useLocalStorage' } },
      { path: 'use-clipboard', name: 'UseClipboardDemo', component: () => import('@/views/hooks/UseClipboardDemo.vue'), meta: { title: 'useClipboard' } },
      { path: 'use-debounce-fn', name: 'UseDebounceFnDemo', component: () => import('@/views/hooks/UseDebounceFnDemo.vue'), meta: { title: 'useDebounceFn' } },
      { path: 'use-throttle-fn', name: 'UseThrottleFnDemo', component: () => import('@/views/hooks/UseThrottleFnDemo.vue'), meta: { title: 'useThrottleFn' } },
      { path: 'use-window-size', name: 'UseWindowSizeDemo', component: () => import('@/views/hooks/UseWindowSizeDemo.vue'), meta: { title: 'useWindowSize' } },
      { path: 'use-event-listener', name: 'UseEventListenerDemo', component: () => import('@/views/hooks/UseEventListenerDemo.vue'), meta: { title: 'useEventListener' } },
    ],
  },

  // ---- Permission ----
  {
    path: '/permission-management',
    component: AdminLayout,
    children: [
      {
        path: '',
        name: 'PermissionManagement',
        component: () => import('@/views/permission/PermissionManagement.vue'),
        meta: { title: 'menu.permissionConfig', permissions: ['permission:view'], roles: ['admin'] },
      },
    ],
  },
  {
    path: '/permission',
    component: AdminLayout,
    children: [
      {
        path: 'demo',
        name: 'PermissionDemo',
        component: () => import('@/views/permission/PermissionDemo.vue'),
        meta: { title: 'menu.permissionDemo' },
      },
    ],
  },

  // ---- About ----
  {
    path: '/about',
    component: AdminLayout,
    children: [
      {
        path: '',
        name: 'About',
        component: () => import('@/views/about/AboutPage.vue'),
        meta: { title: 'menu.about' },
      },
    ],
  },
]
