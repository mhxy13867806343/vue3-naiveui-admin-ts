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
    label: () => t('menu.charts'),
    key: 'charts',
    icon: () => h(NIcon, null, { default: () => h('span', '📈') }),
    children: [
      { label: () => t('menu.chartLine'), key: '/charts/line' },
      { label: () => t('menu.chartArea'), key: '/charts/area' },
      { label: () => t('menu.chartBar'), key: '/charts/bar' },
      { label: () => t('menu.chartHorizontalBar'), key: '/charts/horizontal-bar' },
      { label: () => t('menu.chartPie'), key: '/charts/pie' },
      { label: () => t('menu.chartDoughnut'), key: '/charts/doughnut' },
      { label: () => t('menu.chartScatter'), key: '/charts/scatter' },
      { label: () => t('menu.chartRadar'), key: '/charts/radar' },
      { label: () => t('menu.chartFunnel'), key: '/charts/funnel' },
      { label: () => t('menu.chartGauge'), key: '/charts/gauge' },
      { label: () => t('menu.chartHeatmap'), key: '/charts/heatmap' },
      { label: () => t('menu.chartTreemap'), key: '/charts/treemap' },
      { label: () => t('menu.chartSunburst'), key: '/charts/sunburst' },
      { label: () => t('menu.chartSankey'), key: '/charts/sankey' },
      { label: () => t('menu.chartCandlestick'), key: '/charts/candlestick' },
      { label: () => t('menu.chartBoxplot'), key: '/charts/boxplot' },
      { label: () => t('menu.chartWaterfall'), key: '/charts/waterfall' },
      { label: () => t('menu.chartMixed'), key: '/charts/mixed' },
      { label: () => t('menu.chartStackedBar'), key: '/charts/stacked-bar' },
      { label: () => t('menu.chartStackedArea'), key: '/charts/stacked-area' },
      { label: () => t('menu.chartPolar'), key: '/charts/polar' },
      { label: () => t('menu.chartRose'), key: '/charts/rose' },
      { label: () => t('menu.chartParallel'), key: '/charts/parallel' },
      { label: () => t('menu.chartThemeRiver'), key: '/charts/theme-river' },
      { label: () => t('menu.chartGraph'), key: '/charts/graph' },
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
          { label: () => t('menu.editorDemo'), key: '/components/editor' },
          { label: () => t('menu.dragDemo'), key: '/components/drag' },
          { label: () => t('menu.iconsDemo'), key: '/components/icons' },
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
        ],
      },
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
    key: '/permission-management',
    icon: () => h(NIcon, null, { default: () => h('span', '🔐') }),
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
