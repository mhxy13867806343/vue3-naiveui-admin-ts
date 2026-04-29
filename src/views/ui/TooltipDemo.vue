<script setup lang="ts">
import { NTooltip, NButton, NSpace } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const basicCode = `<NTooltip trigger="hover">
  <template #trigger><NButton>悬浮提示</NButton></template>
  这是提示文字
</NTooltip>`

const placementCode = `<NTooltip placement="top">
  <template #trigger><NButton>Top</NButton></template>
  顶部提示
</NTooltip>`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Tooltip 文字提示</h2>

    <CodePreview title="基础用法" description="鼠标悬浮时显示提示文字" :code="basicCode">
      <NSpace>
        <NTooltip trigger="hover">
          <template #trigger><NButton>悬浮查看提示</NButton></template>
          这是一段提示文字
        </NTooltip>
        <NTooltip trigger="hover">
          <template #trigger><NButton type="primary">另一个提示</NButton></template>
          Tooltip 内容支持任意文本
        </NTooltip>
      </NSpace>
    </CodePreview>

    <CodePreview title="弹出位置" description="支持多个方向" :code="placementCode">
      <NSpace>
        <NTooltip placement="top"><template #trigger><NButton>Top</NButton></template>顶部提示</NTooltip>
        <NTooltip placement="bottom"><template #trigger><NButton>Bottom</NButton></template>底部提示</NTooltip>
        <NTooltip placement="left"><template #trigger><NButton>Left</NButton></template>左侧提示</NTooltip>
        <NTooltip placement="right"><template #trigger><NButton>Right</NButton></template>右侧提示</NTooltip>
      </NSpace>
    </CodePreview>
  </div>
</template>
