<script setup lang="ts">
/**
 * 仪表盘页面
 * 显示欢迎信息和统计卡片占位区域
 */
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { NCard, NGrid, NGridItem, NStatistic } from 'naive-ui'
import { useAuthStore } from '@/stores/auth'

const { t } = useI18n()
const authStore = useAuthStore()

const welcomeMessage = computed(() => {
  return t('dashboard.welcome', { username: authStore.username || 'User' })
})
</script>

<template>
  <div>
    <h2 class="text-2xl font-semibold mb-6">{{ welcomeMessage }}</h2>
    <NGrid :cols="4" :x-gap="16" :y-gap="16">
      <NGridItem>
        <NCard>
          <NStatistic :label="t('dashboard.totalUsers')" :value="1280" />
        </NCard>
      </NGridItem>
      <NGridItem>
        <NCard>
          <NStatistic :label="t('dashboard.totalOrders')" :value="560" />
        </NCard>
      </NGridItem>
      <NGridItem>
        <NCard>
          <NStatistic :label="t('dashboard.totalRevenue')" :value="23800" prefix="¥" />
        </NCard>
      </NGridItem>
      <NGridItem>
        <NCard>
          <NStatistic :label="t('dashboard.todayVisits')" :value="342" />
        </NCard>
      </NGridItem>
    </NGrid>
  </div>
</template>
