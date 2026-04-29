<script setup lang="ts">
/**
 * 顶部栏组件
 * 左侧面包屑导航 + 右侧用户名、退出登录按钮、语言切换器
 */
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { NButton, NDropdown, NSpace, NBreadcrumb, NBreadcrumbItem } from 'naive-ui'
import { useAuthStore } from '@/stores/auth'
import { usePermissionStore } from '@/stores/permission'
import { resetRoutes } from '@/router/dynamic-router'
import { setLocale } from '@/locales'

const router = useRouter()
const route = useRoute()
const { t, locale } = useI18n()
const authStore = useAuthStore()
const permissionStore = usePermissionStore()

const username = computed(() => authStore.username || 'User')

/** Path segment to i18n title mapping */
const pathTitleMap: Record<string, string> = {
  dashboard: 'menu.dashboard',
  workspace: 'menu.workspace',
  analytics: 'menu.analytics',
  system: 'menu.system',
  user: 'menu.userManagement',
  role: 'menu.roleManagement',
  menu: 'menu.menuManagement',
  department: 'menu.departmentManagement',
  content: 'menu.content',
  article: 'menu.articleManagement',
  category: 'menu.categoryManagement',
  tag: 'menu.tagManagement',
  charts: 'menu.charts',
  components: 'menu.components',
  editor: 'menu.editorDemo',
  drag: 'menu.dragDemo',
  icons: 'menu.iconsDemo',
  features: 'menu.features',
  i18n: 'menu.i18nDemo',
  clipboard: 'menu.clipboardDemo',
  print: 'menu.printDemo',
  dayjs: 'menu.dayjsDemo',
  lodash: 'menu.lodashDemo',
  about: 'menu.about',
  'permission-management': 'menu.permissionManagement',
  line: 'menu.chartLine',
  area: 'menu.chartArea',
  bar: 'menu.chartBar',
  'horizontal-bar': 'menu.chartHorizontalBar',
  pie: 'menu.chartPie',
  doughnut: 'menu.chartDoughnut',
  scatter: 'menu.chartScatter',
  radar: 'menu.chartRadar',
  funnel: 'menu.chartFunnel',
  gauge: 'menu.chartGauge',
  heatmap: 'menu.chartHeatmap',
  treemap: 'menu.chartTreemap',
  sunburst: 'menu.chartSunburst',
  sankey: 'menu.chartSankey',
  candlestick: 'menu.chartCandlestick',
  boxplot: 'menu.chartBoxplot',
  waterfall: 'menu.chartWaterfall',
  mixed: 'menu.chartMixed',
  'stacked-bar': 'menu.chartStackedBar',
  'stacked-area': 'menu.chartStackedArea',
  polar: 'menu.chartPolar',
  rose: 'menu.chartRose',
  parallel: 'menu.chartParallel',
  'theme-river': 'menu.chartThemeRiver',
  graph: 'menu.chartGraph',
}

/** Generate breadcrumb items from current route path */
const breadcrumbItems = computed(() => {
  const segments = route.path.split('/').filter(Boolean)
  const items: Array<{ label: string; path: string }> = []
  let currentPath = ''
  for (const segment of segments) {
    currentPath += `/${segment}`
    const i18nKey = pathTitleMap[segment]
    const label = i18nKey ? t(i18nKey) : segment
    items.push({ label, path: currentPath })
  }
  return items
})

/** 语言选项 */
const languageOptions = [
  { label: '中文', key: 'zh-CN' },
  { label: 'English', key: 'en-US' },
]

/** 当前语言标签 */
const currentLanguageLabel = computed(() => {
  return locale.value === 'zh-CN' ? t('header.zhCN') : t('header.enUS')
})

/** 切换语言 */
function handleLanguageSelect(key: string) {
  setLocale(key as 'zh-CN' | 'en-US')
}

/** 退出登录 */
function handleLogout() {
  authStore.logout()
  permissionStore.clearPermissions()
  resetRoutes(router)
  router.push('/login')
}
</script>

<template>
  <div class="flex items-center justify-between h-full px-6">
    <!-- Left: Breadcrumb -->
    <NBreadcrumb>
      <NBreadcrumbItem v-for="(item, index) in breadcrumbItems" :key="item.path">
        <span v-if="index === breadcrumbItems.length - 1">{{ item.label }}</span>
        <router-link v-else :to="item.path" style="text-decoration: none; color: inherit">
          {{ item.label }}
        </router-link>
      </NBreadcrumbItem>
    </NBreadcrumb>

    <!-- Right: User actions -->
    <NSpace align="center" :size="16">
      <span class="text-sm">{{ username }}</span>

      <NDropdown
        :options="languageOptions"
        @select="handleLanguageSelect"
        trigger="click"
      >
        <NButton quaternary size="small">
          🌐 {{ currentLanguageLabel }}
        </NButton>
      </NDropdown>

      <NButton quaternary size="small" @click="handleLogout">
        {{ t('header.logout') }}
      </NButton>
    </NSpace>
  </div>
</template>
