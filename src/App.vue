<script setup lang="ts">
/**
 * 根组件
 * 包含 router-view，使用 Naive UI Provider 组件包裹
 */
import {
  NMessageProvider,
  NDialogProvider,
  NNotificationProvider,
  NLoadingBarProvider,
  NConfigProvider,
} from 'naive-ui'
import { useThemeMode } from '@/composables/useThemeMode'

const { naiveTheme } = useThemeMode()
</script>

<template>
  <NConfigProvider :theme="naiveTheme">
    <NLoadingBarProvider>
      <NDialogProvider>
        <NNotificationProvider>
          <NMessageProvider>
            <router-view />
          </NMessageProvider>
        </NNotificationProvider>
      </NDialogProvider>
    </NLoadingBarProvider>
  </NConfigProvider>
</template>
