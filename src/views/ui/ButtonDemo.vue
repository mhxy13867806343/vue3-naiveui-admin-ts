<script setup lang="ts">
import { ref } from 'vue'
import { NButton, NSpace } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const loading = ref(false)
function handleClick() { loading.value = true; setTimeout(() => loading.value = false, 2000) }

const basicCode = `<NSpace>
  <NButton>Default</NButton>
  <NButton type="primary">Primary</NButton>
  <NButton type="info">Info</NButton>
  <NButton type="success">Success</NButton>
  <NButton type="warning">Warning</NButton>
  <NButton type="error">Error</NButton>
</NSpace>`

const sizeCode = `<NSpace align="center">
  <NButton size="tiny">Tiny</NButton>
  <NButton size="small">Small</NButton>
  <NButton size="medium">Medium</NButton>
  <NButton size="large">Large</NButton>
</NSpace>`

const variantCode = `<NSpace>
  <NButton type="primary">Default</NButton>
  <NButton type="primary" secondary>Secondary</NButton>
  <NButton type="primary" tertiary>Tertiary</NButton>
  <NButton type="primary" quaternary>Quaternary</NButton>
  <NButton type="primary" dashed>Dashed</NButton>
  <NButton type="primary" ghost>Ghost</NButton>
  <NButton type="primary" text>Text</NButton>
</NSpace>`

const loadingCode = `<NButton type="primary" :loading="loading" @click="handleClick">
  点击加载
</NButton>`

const shapeCode = `<NSpace>
  <NButton type="primary" circle>A</NButton>
  <NButton type="primary" round>Round</NButton>
  <NButton type="primary">Default</NButton>
</NSpace>`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Button 按钮</h2>

    <CodePreview title="基础用法" description="按钮有 default、primary、info、success、warning、error 六种类型" :code="basicCode">
      <NSpace>
        <NButton>Default</NButton>
        <NButton type="primary">Primary</NButton>
        <NButton type="info">Info</NButton>
        <NButton type="success">Success</NButton>
        <NButton type="warning">Warning</NButton>
        <NButton type="error">Error</NButton>
      </NSpace>
    </CodePreview>

    <CodePreview title="尺寸" description="按钮有 tiny、small、medium、large 四种尺寸" :code="sizeCode">
      <NSpace align="center">
        <NButton size="tiny" type="primary">Tiny</NButton>
        <NButton size="small" type="primary">Small</NButton>
        <NButton size="medium" type="primary">Medium</NButton>
        <NButton size="large" type="primary">Large</NButton>
      </NSpace>
    </CodePreview>

    <CodePreview title="变体" description="按钮支持 secondary、tertiary、quaternary、dashed、ghost、text 等变体" :code="variantCode">
      <NSpace>
        <NButton type="primary">Default</NButton>
        <NButton type="primary" secondary>Secondary</NButton>
        <NButton type="primary" tertiary>Tertiary</NButton>
        <NButton type="primary" quaternary>Quaternary</NButton>
        <NButton type="primary" dashed>Dashed</NButton>
        <NButton type="primary" ghost>Ghost</NButton>
        <NButton type="primary" text>Text</NButton>
      </NSpace>
    </CodePreview>

    <CodePreview title="加载状态" description="按钮可以显示加载状态" :code="loadingCode">
      <NSpace>
        <NButton type="primary" :loading="loading" @click="handleClick">点击加载</NButton>
        <NButton type="primary" loading>始终加载</NButton>
      </NSpace>
    </CodePreview>

    <CodePreview title="形状" description="按钮支持 circle 和 round 形状" :code="shapeCode">
      <NSpace>
        <NButton type="primary" circle>A</NButton>
        <NButton type="info" circle>B</NButton>
        <NButton type="primary" round>Round Button</NButton>
        <NButton type="primary">Default Shape</NButton>
      </NSpace>
    </CodePreview>

    <CodePreview title="禁用状态" description="按钮可以被禁用" :code="`<NButton disabled>Disabled</NButton>`">
      <NSpace>
        <NButton disabled>Default</NButton>
        <NButton type="primary" disabled>Primary</NButton>
        <NButton type="error" disabled>Error</NButton>
      </NSpace>
    </CodePreview>
  </div>
</template>
