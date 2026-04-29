<script setup lang="ts">
/**
 * 侧边栏组件
 * 使用 Naive UI NMenu 渲染导航菜单，支持折叠、嵌套菜单、路由高亮
 */
import { h, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { NMenu, NIcon, NLayoutSider } from 'naive-ui'
import type { MenuOption } from 'naive-ui'

const props = defineProps<{
  collapsed: boolean
}>()

const emit = defineEmits<{
  'update:collapsed': [value: boolean]
}>()

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

/** 静态嵌套菜单数据 */
const menuOptions = computed<MenuOption[]>(() => [
  {
    label: () => t('menu.dashboard'),
    key: 'dashboard',
    icon: () => h(NIcon, null, { default: () => h('span', '📊') }),
    children: [
      { label: () => t('menu.workspace'), key: '/dashboard/workspace' },
      { label: () => t('menu.analytics'), key: '/dashboard/analytics' },
    ],
  },
  {
    label: () => t('menu.system'),
    key: 'system',
    icon: () => h(NIcon, null, { default: () => h('span', '👥') }),
    children: [
      { label: () => t('menu.userManagement'), key: '/system/user' },
      { label: () => t('menu.roleManagement'), key: '/system/role' },
      { label: () => t('menu.menuManagement'), key: '/system/menu' },
      { label: () => t('menu.departmentManagement'), key: '/system/department' },
    ],
  },
  {
    label: () => t('menu.content'),
    key: 'content',
    icon: () => h(NIcon, null, { default: () => h('span', '📝') }),
    children: [
      { label: () => t('menu.articleManagement'), key: '/content/article' },
      { label: () => t('menu.categoryManagement'), key: '/content/category' },
      { label: () => t('menu.tagManagement'), key: '/content/tag' },
    ],
  },
  {
    label: () => t('menu.uiComponents'),
    key: 'ui',
    icon: () => h(NIcon, null, { default: () => h('span', '🎨') }),
    children: [
      {
        label: () => t('menu.uiGeneral'),
        key: 'ui-general',
        children: [
          { label: () => t('menu.uiButton'), key: '/ui/button' },
          { label: () => t('menu.uiIcon'), key: '/components/icons' },
          { label: () => t('menu.uiDivider'), key: '/ui/divider' },
        ],
      },
      {
        label: () => t('menu.uiDataEntry'),
        key: 'ui-data-entry',
        children: [
          { label: () => t('menu.uiInput'), key: '/ui/input' },
          { label: () => t('menu.uiSelect'), key: '/ui/select' },
          { label: () => t('menu.uiDatePicker'), key: '/ui/date-picker' },
          { label: () => t('menu.uiSwitch'), key: '/ui/switch' },
          { label: () => t('menu.uiSlider'), key: '/ui/slider' },
          { label: () => t('menu.uiUpload'), key: '/ui/upload' },
          { label: () => t('menu.uiTransfer'), key: '/ui/transfer' },
          { label: () => t('menu.uiColorPicker'), key: '/ui/color-picker' },
          { label: () => t('menu.uiForm'), key: '/ui/form' },
        ],
      },
      {
        label: () => t('menu.uiDataDisplay'),
        key: 'ui-data-display',
        children: [
          { label: () => t('menu.uiTable'), key: '/ui/table' },
          { label: () => t('menu.uiTag'), key: '/ui/tag' },
          { label: () => t('menu.uiAvatar'), key: '/ui/avatar' },
          { label: () => t('menu.uiBadge'), key: '/ui/badge' },
          { label: () => t('menu.uiCard'), key: '/ui/card' },
          { label: () => t('menu.uiCarousel'), key: '/ui/carousel' },
          { label: () => t('menu.uiCollapse'), key: '/ui/collapse' },
          { label: () => t('menu.uiDescriptions'), key: '/ui/descriptions' },
          { label: () => t('menu.uiTree'), key: '/ui/tree' },
          { label: () => t('menu.uiTimeline'), key: '/ui/timeline' },
          { label: () => t('menu.uiProgress'), key: '/ui/progress' },
          { label: () => t('menu.uiEmpty'), key: '/ui/empty' },
        ],
      },
      {
        label: () => t('menu.uiFeedback'),
        key: 'ui-feedback',
        children: [
          { label: () => t('menu.uiAlert'), key: '/ui/alert' },
          { label: () => t('menu.uiMessage'), key: '/ui/message' },
          { label: () => t('menu.uiNotification'), key: '/ui/notification' },
          { label: () => t('menu.uiDialog'), key: '/ui/dialog' },
          { label: () => t('menu.uiModal'), key: '/ui/modal' },
          { label: () => t('menu.uiDrawer'), key: '/ui/drawer' },
          { label: () => t('menu.uiPopover'), key: '/ui/popover' },
          { label: () => t('menu.uiTooltip'), key: '/ui/tooltip' },
          { label: () => t('menu.uiResult'), key: '/ui/result' },
          { label: () => t('menu.uiSkeleton'), key: '/ui/skeleton' },
          { label: () => t('menu.uiSpin'), key: '/ui/spin' },
        ],
      },
      {
        label: () => t('menu.uiNavigation'),
        key: 'ui-navigation',
        children: [
          { label: () => t('menu.uiMenu'), key: '/ui/menu' },
          { label: () => t('menu.uiTabs'), key: '/ui/tabs' },
          { label: () => t('menu.uiBreadcrumb'), key: '/ui/breadcrumb' },
          { label: () => t('menu.uiDropdown'), key: '/ui/dropdown' },
          { label: () => t('menu.uiPagination'), key: '/ui/pagination' },
          { label: () => t('menu.uiSteps'), key: '/ui/steps' },
        ],
      },
    ],
  },
  {
    label: () => t('menu.charts'),
    key: 'charts',
    icon: () => h(NIcon, null, { default: () => h('span', '📈') }),
    children: [
      {
        label: () => t('menu.chartGroupBasic'),
        key: 'charts-basic',
        children: [
          { label: () => t('menu.chartLine'), key: '/charts/line' },
          { label: () => t('menu.chartArea'), key: '/charts/area' },
          { label: () => t('menu.chartBar'), key: '/charts/bar' },
          { label: () => t('menu.chartHorizontalBar'), key: '/charts/horizontal-bar' },
          { label: () => t('menu.chartPie'), key: '/charts/pie' },
          { label: () => t('menu.chartDoughnut'), key: '/charts/doughnut' },
          { label: () => t('menu.chartRose'), key: '/charts/rose' },
        ],
      },
      {
        label: () => t('menu.chartGroupStat'),
        key: 'charts-stat',
        children: [
          { label: () => t('menu.chartScatter'), key: '/charts/scatter' },
          { label: () => t('menu.chartRadar'), key: '/charts/radar' },
          { label: () => t('menu.chartBoxplot'), key: '/charts/boxplot' },
          { label: () => t('menu.chartHeatmap'), key: '/charts/heatmap' },
          { label: () => t('menu.chartParallel'), key: '/charts/parallel' },
        ],
      },
      {
        label: () => t('menu.chartGroupHierarchy'),
        key: 'charts-hierarchy',
        children: [
          { label: () => t('menu.chartTreemap'), key: '/charts/treemap' },
          { label: () => t('menu.chartSunburst'), key: '/charts/sunburst' },
          { label: () => t('menu.chartSankey'), key: '/charts/sankey' },
          { label: () => t('menu.chartGraph'), key: '/charts/graph' },
          { label: () => t('menu.chartThemeRiver'), key: '/charts/theme-river' },
        ],
      },
      {
        label: () => t('menu.chartGroupAdvanced'),
        key: 'charts-advanced',
        children: [
          { label: () => t('menu.chartFunnel'), key: '/charts/funnel' },
          { label: () => t('menu.chartGauge'), key: '/charts/gauge' },
          { label: () => t('menu.chartCandlestick'), key: '/charts/candlestick' },
          { label: () => t('menu.chartWaterfall'), key: '/charts/waterfall' },
          { label: () => t('menu.chartMixed'), key: '/charts/mixed' },
          { label: () => t('menu.chartStackedBar'), key: '/charts/stacked-bar' },
          { label: () => t('menu.chartStackedArea'), key: '/charts/stacked-area' },
          { label: () => t('menu.chartPolar'), key: '/charts/polar' },
        ],
      },
      {
        label: () => t('menu.chartGroupG2'),
        key: 'charts-g2',
        children: [
          { label: () => 'G2 折线图', key: '/charts/g2-line' },
          { label: () => 'G2 柱状图', key: '/charts/g2-bar' },
          { label: () => 'G2 高级散点图', key: '/charts/g2-scatter' },
        ],
      },
      {
        label: () => t('menu.chartGroupG6'),
        key: 'charts-g6',
        children: [
          { label: () => 'G6 关系图', key: '/charts/g6-graph' },
          { label: () => 'G6 组织树', key: '/charts/g6-org' },
          { label: () => 'G6 赛事对阵图', key: '/charts/g6-bracket' },
        ],
      },
    ],
  },
  {
    label: () => t('menu.thirdParty'),
    key: 'third-party',
    icon: () => h(NIcon, null, { default: () => h('span', '🧩') }),
    children: [
      {
        label: () => t('menu.thirdPartyComponents'),
        key: 'third-party-components',
        children: [
          {
            label: () => '富文本编辑器',
            key: 'editor-group',
            children: [
              { label: () => 'wangEditor 富文本', key: '/components/editor' },
              { label: () => 'Markdown 编辑器', key: '/components/editor-markdown' },
              { label: () => '代码编辑器 (CodeMirror)', key: '/components/editor-code' },
              { label: () => '轻量富文本 (contenteditable)', key: '/components/editor-light' },
              { label: () => '文档阅读器 (TOC)', key: '/components/editor-reader' },
            ],
          },
          {
            label: () => '拖拽',
            key: 'drag-group',
            children: [
              { label: () => '拖拽列表', key: '/components/drag' },
              { label: () => '看板拖拽 Kanban', key: '/components/drag-kanban' },
              { label: () => '嵌套树拖拽', key: '/components/drag-tree' },
              { label: () => '拖拽排序网格', key: '/components/drag-grid' },
              { label: () => '原生 HTML5 拖放', key: '/components/drag-native' },
            ],
          },
        ],
      },
      {
        label: () => t('menu.thirdPartyJS'),
        key: 'third-party-js',
        children: [
          { label: () => t('menu.dayjsDemo'), key: '/features/dayjs' },
          { label: () => t('menu.lodashDemo'), key: '/features/lodash' },
          { label: () => t('menu.clipboardDemo'), key: '/features/clipboard' },
          { label: () => t('menu.printDemo'), key: '/features/print' },
          { label: () => 'QRCode 二维码', key: '/features/qrcode' },
          { label: () => 'CryptoJS 加解密', key: '/features/crypto' },
          { label: () => 'JSZip 打包下载', key: '/features/jszip' },
          { label: () => 'SheetJS Excel', key: '/features/xlsx' },
          { label: () => 'PapaParse CSV', key: '/features/papaparse' },
          { label: () => 'MockJS 模拟数据', key: '/features/mock' },
          { label: () => 'NProgress 进度条', key: '/features/nprogress' },
        ],
      },
    ],
  },
  {
    label: () => t('menu.hooks'),
    key: 'hooks',
    icon: () => h(NIcon, null, { default: () => h('span', '🪝') }),
    children: [
      { label: () => 'useLoading', key: '/hooks/use-loading' },
      { label: () => 'usePagination', key: '/hooks/use-pagination' },
      { label: () => 'usePermission', key: '/hooks/use-permission' },
      { label: () => 'useSmsCountdown', key: '/hooks/use-sms-countdown' },
      { label: () => 'useLocalStorage', key: '/hooks/use-local-storage' },
      { label: () => 'useClipboard', key: '/hooks/use-clipboard' },
      { label: () => 'useDebounceFn', key: '/hooks/use-debounce-fn' },
      { label: () => 'useThrottleFn', key: '/hooks/use-throttle-fn' },
      { label: () => 'useWindowSize', key: '/hooks/use-window-size' },
      { label: () => 'useEventListener', key: '/hooks/use-event-listener' },
    ],
  },
  {
    label: () => t('menu.features'),
    key: 'features',
    icon: () => h(NIcon, null, { default: () => h('span', '🔧') }),
    children: [
      { label: () => t('menu.i18nDemo'), key: '/features/i18n' },
    ],
  },
  {
    label: () => t('menu.permissionManagement'),
    key: 'permission',
    icon: () => h(NIcon, null, { default: () => h('span', '🔐') }),
    children: [
      { label: () => t('menu.permissionConfig'), key: '/permission-management' },
      { label: () => t('menu.permissionDemo'), key: '/permission/demo' },
      {
        label: () => t('menu.httpStatus'),
        key: 'http-status',
        children: [
          { label: () => '200 OK', key: '/permission/http-200' },
          { label: () => '202 Accepted', key: '/permission/http-202' },
          { label: () => '204 No Content', key: '/permission/http-204' },
          { label: () => '300 Multiple Choices', key: '/permission/http-300' },
          { label: () => '302 Found', key: '/permission/http-302' },
          { label: () => '400 Bad Request', key: '/permission/http-400' },
          { label: () => '401 Unauthorized', key: '/permission/http-401' },
          { label: () => '402 Payment Required', key: '/permission/http-402' },
          { label: () => '403 Forbidden', key: '/permission/http-403' },
          { label: () => '404 Not Found', key: '/permission/http-404' },
          { label: () => '500 Server Error', key: '/permission/http-500' },
          { label: () => '501 Not Implemented', key: '/permission/http-501' },
          { label: () => '502 Bad Gateway', key: '/permission/http-502' },
          { label: () => '503 Unavailable', key: '/permission/http-503' },
          { label: () => '504 Timeout', key: '/permission/http-504' },
        ],
      },
    ],
  },
  {
    label: () => t('menu.multiLevel'),
    key: 'multi-level',
    icon: () => h(NIcon, null, { default: () => h('span', '🌲') }),
    children: [
      { label: () => '1-1', key: '/multi-level/1-1' },
      {
        label: () => '1-2',
        key: 'multi-level-1-2',
        children: [
          { label: () => '1-2-1', key: '/multi-level/1-2-1' },
        ],
      },
      {
        label: () => '1-3',
        key: 'multi-level-1-3',
        children: [
          { label: () => '1-3-1', key: '/multi-level/1-3-1' },
          {
            label: () => '1-3-2',
            key: 'multi-level-1-3-2',
            children: [
              { label: () => '1-3-2-1', key: '/multi-level/1-3-2-1' },
            ],
          },
        ],
      },
      {
        label: () => '1-4',
        key: 'multi-level-1-4',
        children: [
          { label: () => '1-4-1', key: '/multi-level/1-4-1' },
          {
            label: () => '1-4-2',
            key: 'multi-level-1-4-2',
            children: [
              { label: () => '1-4-2-1', key: '/multi-level/1-4-2-1' },
              { label: () => '1-4-2-2', key: '/multi-level/1-4-2-2' },
            ],
          },
        ],
      },
      {
        label: () => '1-5',
        key: 'multi-level-1-5',
        children: [
          {
            label: () => '1-5-1',
            key: 'multi-level-1-5-1',
            children: [
              { label: () => '1-5-1-1', key: '/multi-level/1-5-1-1' },
            ],
          },
          {
            label: () => '1-5-2',
            key: 'multi-level-1-5-2',
            children: [
              { label: () => '1-5-2-1', key: '/multi-level/1-5-2-1' },
              { label: () => '1-5-2-2', key: '/multi-level/1-5-2-2' },
            ],
          },
        ],
      },
    ],
  },
  {
    label: () => t('menu.ruleExamples'),
    key: 'rules',
    icon: () => h(NIcon, null, { default: () => h('span', '🧮') }),
    children: [
      { label: () => t('menu.maze'), key: '/rules/maze' },
      { label: () => t('menu.sorting'), key: '/rules/sorting' },
    ],
  },
  {
    label: () => t('menu.about'),
    key: '/about',
    icon: () => h(NIcon, null, { default: () => h('span', '📄') }),
  },
])

/** 当前激活的菜单项 */
const activeKey = computed(() => {
  return route.path
})

/** 菜单项点击导航 */
function handleMenuUpdate(key: string) {
  router.push(key)
}
</script>

<template>
  <NLayoutSider
    bordered
    :collapsed="props.collapsed"
    collapse-mode="width"
    :collapsed-width="64"
    :width="240"
    show-trigger
    @collapse="emit('update:collapsed', true)"
    @expand="emit('update:collapsed', false)"
    class="h-full"
  >
    <div class="p-4 text-center font-bold text-lg">
      {{ props.collapsed ? '📋' : 'Admin' }}
    </div>
    <NMenu
      :collapsed="props.collapsed"
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :options="menuOptions"
      :value="activeKey"
      @update:value="handleMenuUpdate"
    />
  </NLayoutSider>
</template>
