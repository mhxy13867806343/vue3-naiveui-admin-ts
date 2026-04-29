<script setup lang="ts">
/**
 * 多级路由 1-1
 * 基础示例：Button 按钮的常见用法
 */
import { ref } from 'vue'
import { NCard, NSpace, NButton, NBreadcrumb, NBreadcrumbItem, NDivider } from 'naive-ui'

const loading = ref(false)
function handleClick() {
  loading.value = true
  setTimeout(() => (loading.value = false), 1500)
}
</script>

<template>
  <div class="p-4">
    <NBreadcrumb>
      <NBreadcrumbItem>多级路由</NBreadcrumbItem>
      <NBreadcrumbItem>1-1</NBreadcrumbItem>
    </NBreadcrumb>
    <NDivider />
    <NCard title="1-1 · Button 基础" size="small">
      <template #header-extra>
        <span class="text-gray-400 text-sm">Naive UI · 入门示例</span>
      </template>
      <NSpace vertical>
        <NSpace>
          <NButton>Default</NButton>
          <NButton type="primary">Primary</NButton>
          <NButton type="info">Info</NButton>
          <NButton type="success">Success</NButton>
          <NButton type="warning">Warning</NButton>
          <NButton type="error">Error</NButton>
        </NSpace>
        <NSpace align="center">
          <NButton size="tiny">Tiny</NButton>
          <NButton size="small">Small</NButton>
          <NButton size="medium">Medium</NButton>
          <NButton size="large">Large</NButton>
        </NSpace>
        <NSpace>
          <NButton type="primary" :loading="loading" @click="handleClick">
            点击加载
          </NButton>
          <NButton type="primary" round>Round</NButton>
          <NButton type="primary" circle>A</NButton>
          <NButton type="primary" dashed>Dashed</NButton>
          <NButton type="primary" ghost>Ghost</NButton>
        </NSpace>
      </NSpace>
    </NCard>
  </div>
</template>
