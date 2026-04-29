<script setup lang="ts">
/**
 * 顶部栏组件
 * 左侧面包屑导航 + 右侧用户名、主题切换、全屏按钮、语言切换器、退出登录按钮
 */
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import {
  NButton, NDropdown, NSpace, NBreadcrumb, NBreadcrumbItem, NTooltip,
  useDialog,
} from 'naive-ui'
import { useAuthStore } from '@/stores/auth'
import { usePermissionStore } from '@/stores/permission'
import { resetRoutes } from '@/router/dynamic-router'
import { setLocale } from '@/locales'
import { useThemeMode } from '@/composables/useThemeMode'
import { useFullscreen } from '@/composables/useFullscreen'

const router = useRouter()
const route = useRoute()
const { t, locale } = useI18n()
const authStore = useAuthStore()
const permissionStore = usePermissionStore()
const dialog = useDialog()

const { themeMode, setThemeMode } = useThemeMode()
const { isFullscreen, toggleFullscreen } = useFullscreen()

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

/**
 * 分组型路径段 (菜单分组容器，没有自己的页面)
 * 这些段在面包屑里渲染为纯文字，不可点击，避免误导用户
 */
const GROUP_SEGMENTS = new Set([
  'dashboard', 'system', 'content', 'components', 'charts',
  'hooks', 'features', 'ui', 'permission', 'rules', 'third-party',
])

/** Generate breadcrumb items from current route path */
const breadcrumbItems = computed(() => {
  const segments = route.path.split('/').filter(Boolean)
  const items: Array<{ label: string; path: string; clickable: boolean }> = []
  let currentPath = ''
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i]
    currentPath += `/${segment}`
    const i18nKey = pathTitleMap[segment]
    const label = i18nKey ? t(i18nKey) : segment
    const isLast = i === segments.length - 1
    // 最后一段永远不可点击；分组型段也不可点击
    const clickable = !isLast && !GROUP_SEGMENTS.has(segment)
    items.push({ label, path: currentPath, clickable })
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

/** 主题切换选项 */
const themeOptions = computed(() => [
  { label: `☀️ ${t('header.themeLight')}`, key: 'light' },
  { label: `🌙 ${t('header.themeDark')}`, key: 'dark' },
  { label: `💻 ${t('header.themeSystem')}`, key: 'system' },
])

/** 当前主题模式图标 */
const currentThemeIcon = computed(() => {
  switch (themeMode.value) {
    case 'dark': return '🌙'
    case 'system': return '💻'
    case 'light':
    default: return '☀️'
  }
})

/** 切换主题 */
function handleThemeSelect(key: string) {
  setThemeMode(key as 'light' | 'dark' | 'system')
}

/** 全屏按钮提示文字 */
const fullscreenTooltip = computed(() => {
  return isFullscreen.value ? t('header.exitFullscreen') : t('header.fullscreen')
})

/** 全屏按钮图标 */
const fullscreenIcon = computed(() => {
  return isFullscreen.value ? '⛶' : '⛶'
})

/** 退出登录（带确认弹窗） */
function handleLogout() {
  dialog.warning({
    title: t('header.logoutTitle'),
    content: t('header.logoutConfirm'),
    positiveText: t('common.confirm'),
    negativeText: t('common.cancel'),
    onPositiveClick: () => {
      authStore.logout()
      permissionStore.clearPermissions()
      resetRoutes(router)
      router.push('/login')
    },
  })
}
</script>

<template>
  <div class="flex items-center justify-between h-full px-6">
    <!-- Left: Breadcrumb -->
    <NBreadcrumb>
      <NBreadcrumbItem v-for="item in breadcrumbItems" :key="item.path">
        <router-link
          v-if="item.clickable"
          :to="item.path"
          style="text-decoration: none; color: inherit"
        >
          {{ item.label }}
        </router-link>
        <span
          v-else
          :style="{ color: '#999', cursor: 'default' }"
        >{{ item.label }}</span>
      </NBreadcrumbItem>
    </NBreadcrumb>

    <!-- Right: User actions -->
    <!-- Layout order: 用户名 → 主题切换 → 全屏按钮 → 语言切换 → 退出登录 -->
    <NSpace align="center" :size="16">
      <span class="text-sm">{{ username }}</span>

      <!-- Theme Switcher -->
      <NDropdown
        :options="themeOptions"
        @select="handleThemeSelect"
        trigger="click"
      >
        <NButton quaternary size="small">
          {{ currentThemeIcon }}
        </NButton>
      </NDropdown>

      <!-- Fullscreen Toggle -->
      <NTooltip trigger="hover">
        <template #trigger>
          <NButton quaternary size="small" @click="toggleFullscreen">
            {{ fullscreenIcon }}
          </NButton>
        </template>
        {{ fullscreenTooltip }}
      </NTooltip>

      <!-- Language Switcher -->
      <NDropdown
        :options="languageOptions"
        @select="handleLanguageSelect"
        trigger="click"
      >
        <NButton quaternary size="small">
          🌐 {{ currentLanguageLabel }}
        </NButton>
      </NDropdown>

      <!-- Logout -->
      <NButton quaternary size="small" @click="handleLogout">
        {{ t('header.logout') }}
      </NButton>
    </NSpace>
  </div>
</template>
