<script setup lang="ts">
/**
 * 401 错误页面 - 未授权/登录已过期
 */
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { NButton, NResult } from 'naive-ui'

const router = useRouter()
const { t } = useI18n()

function handleReLogin() {
  router.push('/login')
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <NResult
      status="warning"
      :title="t('error.401.title')"
      :description="t('error.401.description')"
    >
      <template #footer>
        <p class="mb-4 text-gray-500">{{ t('error.401.hint') }}</p>
        <NButton type="primary" @click="handleReLogin">
          {{ t('error.reLogin') }}
        </NButton>
      </template>
    </NResult>
  </div>
</template>
