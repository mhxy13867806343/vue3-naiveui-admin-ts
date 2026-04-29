<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { NCard } from 'naive-ui'
const { t } = useI18n()
</script>

<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">{{ t('menu.editorDemo') }}</h2>
    <NCard>
      <p class="text-gray-500">页面开发中...</p>
    </NCard>
  </div>
</template>
