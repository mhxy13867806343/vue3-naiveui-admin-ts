<script setup lang="ts">
/**
 * 500 错误页面 - 服务器错误
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
      status="500"
      :title="t('error.500.title')"
      :description="t('error.500.description')"
    >
      <template #footer>
        <p class="mb-4 text-gray-500">{{ t('error.500.hint') }}</p>
        <NButton type="primary" @click="handleBackHome">
          {{ t('error.backHome') }}
        </NButton>
      </template>
    </NResult>
  </div>
</template>
