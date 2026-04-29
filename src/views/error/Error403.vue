<script setup lang="ts">
/**
 * 403 错误页面 - 无权限访问
 */
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { NButton, NResult } from 'naive-ui'

const router = useRouter()
const { t } = useI18n()

function handleBackHome() {
  router.push('/dashboard')
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <NResult
      status="403"
      :title="t('error.403.title')"
      :description="t('error.403.description')"
    >
      <template #footer>
        <p class="mb-4 text-gray-500">{{ t('error.403.hint') }}</p>
        <NButton type="primary" @click="handleBackHome">
          {{ t('error.backHome') }}
        </NButton>
      </template>
    </NResult>
  </div>
</template>
