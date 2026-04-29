<script setup lang="ts">
/**
 * 顶部栏组件
 * 展示用户名、退出登录按钮、语言切换器
 */
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { NButton, NDropdown, NSpace } from 'naive-ui'
import { useAuthStore } from '@/stores/auth'
import { usePermissionStore } from '@/stores/permission'
import { resetRoutes } from '@/router/dynamic-router'
import { setLocale } from '@/locales'

const router = useRouter()
const { t, locale } = useI18n()
const authStore = useAuthStore()
const permissionStore = usePermissionStore()

const username = computed(() => authStore.username || 'User')

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
  <div class="flex items-center justify-end h-full px-6 gap-4">
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
