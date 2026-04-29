<script setup lang="ts">
import { NPopover, NButton, NSpace } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const basicCode = `<NPopover trigger="hover">
  <template #trigger><NButton>悬浮触发</NButton></template>
  <span>弹出内容</span>
</NPopover>`

const placementCode = `<NPopover placement="top">
  <template #trigger><NButton>Top</NButton></template>
  <span>顶部弹出</span>
</NPopover>`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Popover 弹出框</h2>

    <CodePreview title="触发方式" description="支持 hover 和 click 两种触发方式" :code="basicCode">
      <NSpace>
        <NPopover trigger="hover">
          <template #trigger><NButton>Hover 触发</NButton></template>
          <span>鼠标悬浮触发的弹出内容</span>
        </NPopover>
        <NPopover trigger="click">
          <template #trigger><NButton type="primary">Click 触发</NButton></template>
          <span>点击触发的弹出内容</span>
        </NPopover>
      </NSpace>
    </CodePreview>

    <CodePreview title="弹出位置" description="支持 12 个方向的弹出位置" :code="placementCode">
      <NSpace>
        <NPopover placement="top"><template #trigger><NButton>Top</NButton></template><span>顶部</span></NPopover>
        <NPopover placement="bottom"><template #trigger><NButton>Bottom</NButton></template><span>底部</span></NPopover>
        <NPopover placement="left"><template #trigger><NButton>Left</NButton></template><span>左侧</span></NPopover>
        <NPopover placement="right"><template #trigger><NButton>Right</NButton></template><span>右侧</span></NPopover>
      </NSpace>
    </CodePreview>
  </div>
</template>
