<script setup lang="ts">
/**
 * 200 状态页面 - 请求成功
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
      status="success"
      :title="t('error.200.title')"
      :description="t('error.200.description')"
    >
      <template #footer>
        <p class="mb-4 text-gray-500">{{ t('error.200.hint') }}</p>
        <NButton type="primary" @click="handleBackHome">
          {{ t('error.backHome') }}
        </NButton>
      </template>
    </NResult>
  </div>
</template>
