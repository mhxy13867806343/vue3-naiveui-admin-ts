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
} from 'naive-ui'
</script>

<template>
  <NLoadingBarProvider>
    <NDialogProvider>
      <NNotificationProvider>
        <NMessageProvider>
          <router-view />
        </NMessageProvider>
      </NNotificationProvider>
    </NDialogProvider>
  </NLoadingBarProvider>
</template>
