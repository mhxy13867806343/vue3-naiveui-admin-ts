<script setup lang="ts">
/**
 * 后台管理布局
 * 左侧固定侧边栏 + 右侧内容区域（Header + TabBar + router-view）
 */
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { NLayout, NLayoutContent, NLayoutHeader } from 'naive-ui'
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'
import TabBar from './TabBar.vue'
import { usePermissionStore } from '@/stores/permission'
import { useTabsStore } from '@/stores/tabs'

const collapsed = ref(false)
const permissionStore = usePermissionStore()
const tabsStore = useTabsStore()
const route = useRoute()

/** Map route paths to i18n keys */
const pathToI18nKey: Record<string, string> = {
  '/dashboard/workspace': 'menu.workspace',
  '/dashboard/analytics': 'menu.analytics',
  '/system/user': 'menu.userManagement',
  '/system/role': 'menu.roleManagement',
  '/system/menu': 'menu.menuManagement',
  '/system/department': 'menu.departmentManagement',
  '/content/article': 'menu.articleManagement',
  '/content/category': 'menu.categoryManagement',
  '/content/tag': 'menu.tagManagement',
  '/components/editor': 'menu.editorDemo',
  '/components/drag': 'menu.dragDemo',
  '/components/icons': 'menu.iconsDemo',
  '/components/charts': 'menu.chartsDemo',
  '/features/i18n': 'menu.i18nDemo',
  '/features/clipboard': 'menu.clipboardDemo',
  '/features/print': 'menu.printDemo',
  '/features/dayjs': 'menu.dayjsDemo',
  '/features/lodash': 'menu.lodashDemo',
  // Hooks
  '/hooks/use-loading': 'menu.hooks',
  '/hooks/use-pagination': 'menu.hooks',
  '/hooks/use-permission': 'menu.hooks',
  '/hooks/use-sms-countdown': 'menu.hooks',
  '/hooks/use-local-storage': 'menu.hooks',
  '/hooks/use-clipboard': 'menu.hooks',
  '/hooks/use-debounce-fn': 'menu.hooks',
  '/hooks/use-throttle-fn': 'menu.hooks',
  '/hooks/use-window-size': 'menu.hooks',
  '/hooks/use-event-listener': 'menu.hooks',
  '/permission-management': 'menu.permissionManagement',
  '/permission/demo': 'menu.permissionDemo',
  '/about': 'menu.about',
  // Charts - 25 types
  '/charts/line': 'menu.chartLine',
  '/charts/area': 'menu.chartArea',
  '/charts/bar': 'menu.chartBar',
  '/charts/horizontal-bar': 'menu.chartHorizontalBar',
  '/charts/pie': 'menu.chartPie',
  '/charts/doughnut': 'menu.chartDoughnut',
  '/charts/scatter': 'menu.chartScatter',
  '/charts/radar': 'menu.chartRadar',
  '/charts/funnel': 'menu.chartFunnel',
  '/charts/gauge': 'menu.chartGauge',
  '/charts/heatmap': 'menu.chartHeatmap',
  '/charts/treemap': 'menu.chartTreemap',
  '/charts/sunburst': 'menu.chartSunburst',
  '/charts/sankey': 'menu.chartSankey',
  '/charts/candlestick': 'menu.chartCandlestick',
  '/charts/boxplot': 'menu.chartBoxplot',
  '/charts/waterfall': 'menu.chartWaterfall',
  '/charts/mixed': 'menu.chartMixed',
  '/charts/stacked-bar': 'menu.chartStackedBar',
  '/charts/stacked-area': 'menu.chartStackedArea',
  '/charts/polar': 'menu.chartPolar',
  '/charts/rose': 'menu.chartRose',
  '/charts/parallel': 'menu.chartParallel',
  '/charts/theme-river': 'menu.chartThemeRiver',
  '/charts/graph': 'menu.chartGraph',
  // UI Components
  '/ui/button': 'menu.uiButton',
  '/ui/icon': 'menu.uiIcon',
  '/ui/divider': 'menu.uiDivider',
  '/ui/input': 'menu.uiInput',
  '/ui/select': 'menu.uiSelect',
  '/ui/date-picker': 'menu.uiDatePicker',
  '/ui/switch': 'menu.uiSwitch',
  '/ui/slider': 'menu.uiSlider',
  '/ui/upload': 'menu.uiUpload',
  '/ui/transfer': 'menu.uiTransfer',
  '/ui/color-picker': 'menu.uiColorPicker',
  '/ui/form': 'menu.uiForm',
  '/ui/table': 'menu.uiTable',
  '/ui/tag': 'menu.uiTag',
  '/ui/avatar': 'menu.uiAvatar',
  '/ui/badge': 'menu.uiBadge',
  '/ui/card': 'menu.uiCard',
  '/ui/carousel': 'menu.uiCarousel',
  '/ui/collapse': 'menu.uiCollapse',
  '/ui/descriptions': 'menu.uiDescriptions',
  '/ui/tree': 'menu.uiTree',
  '/ui/timeline': 'menu.uiTimeline',
  '/ui/progress': 'menu.uiProgress',
  '/ui/empty': 'menu.uiEmpty',
  '/ui/alert': 'menu.uiAlert',
  '/ui/message': 'menu.uiMessage',
  '/ui/notification': 'menu.uiNotification',
  '/ui/dialog': 'menu.uiDialog',
  '/ui/modal': 'menu.uiModal',
  '/ui/drawer': 'menu.uiDrawer',
  '/ui/popover': 'menu.uiPopover',
  '/ui/tooltip': 'menu.uiTooltip',
  '/ui/result': 'menu.uiResult',
  '/ui/skeleton': 'menu.uiSkeleton',
  '/ui/spin': 'menu.uiSpin',
  '/ui/menu': 'menu.uiMenu',
  '/ui/tabs': 'menu.uiTabs',
  '/ui/breadcrumb': 'menu.uiBreadcrumb',
  '/ui/dropdown': 'menu.uiDropdown',
  '/ui/pagination': 'menu.uiPagination',
  '/ui/steps': 'menu.uiSteps',
}

onMounted(async () => {
  // 确保权限已加载
  if (permissionStore.permissions.length === 0) {
    await permissionStore.loadPermissions()
  }
  // Add current route as tab on mount
  addCurrentRouteTab()
})

/** Watch route changes to auto-add tabs */
watch(
  () => route.path,
  () => {
    addCurrentRouteTab()
  },
)

function addCurrentRouteTab() {
  const { path, meta, name } = route
  if (path && name) {
    tabsStore.addTab({
      path,
      titleKey: pathToI18nKey[path] || (meta?.title as string) || (name as string),
      name: name as string,
      closable: path !== '/dashboard/workspace',
    })
  }
}
</script>

<template>
  <NLayout has-sider class="h-screen">
    <Sidebar v-model:collapsed="collapsed" />
    <NLayout>
      <NLayoutHeader bordered class="h-14">
        <Header />
      </NLayoutHeader>
      <TabBar />
      <NLayoutContent
        content-class="p-6"
        class="bg-gray-50"
        :native-scrollbar="false"
      >
        <router-view />
      </NLayoutContent>
    </NLayout>
  </NLayout>
</template>
