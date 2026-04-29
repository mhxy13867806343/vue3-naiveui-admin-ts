<script setup lang="ts">
import { NBadge, NAvatar, NSpace, NButton } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const basicCode = `<NBadge :value="5">
  <NAvatar>U</NAvatar>
</NBadge>`

const dotCode = `<NBadge dot>
  <NButton>消息</NButton>
</NBadge>`

const customCode = `<NBadge :value="99" :max="99" type="error">
  <NAvatar>U</NAvatar>
</NBadge>`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Badge 徽标</h2>

    <CodePreview title="基础用法" description="展示数字徽标" :code="basicCode">
      <NSpace :size="24">
        <NBadge :value="5"><NAvatar style="background: #18a058">U</NAvatar></NBadge>
        <NBadge :value="12"><NAvatar style="background: #2080f0">M</NAvatar></NBadge>
        <NBadge :value="99" :max="99"><NAvatar style="background: #f0a020">N</NAvatar></NBadge>
      </NSpace>
    </CodePreview>

    <CodePreview title="小红点" description="设置 dot 属性显示小红点" :code="dotCode">
      <NSpace :size="24">
        <NBadge dot><NButton>消息</NButton></NBadge>
        <NBadge dot><NAvatar style="background: #2080f0">A</NAvatar></NBadge>
        <NBadge dot type="success"><NButton>通知</NButton></NBadge>
      </NSpace>
    </CodePreview>

    <CodePreview title="类型" description="徽标支持不同类型颜色" :code="customCode">
      <NSpace :size="24">
        <NBadge :value="1" type="default"><NAvatar>D</NAvatar></NBadge>
        <NBadge :value="2" type="success"><NAvatar>S</NAvatar></NBadge>
        <NBadge :value="3" type="info"><NAvatar>I</NAvatar></NBadge>
        <NBadge :value="4" type="warning"><NAvatar>W</NAvatar></NBadge>
        <NBadge :value="5" type="error"><NAvatar>E</NAvatar></NBadge>
      </NSpace>
    </CodePreview>
  </div>
</template>
