<script setup lang="ts">
import { ref } from 'vue'
import { NTag, NSpace, NCheckTag } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const checked = ref(false)

const basicCode = `<NSpace>
  <NTag>Default</NTag>
  <NTag type="success">Success</NTag>
  <NTag type="info">Info</NTag>
  <NTag type="warning">Warning</NTag>
  <NTag type="error">Error</NTag>
</NSpace>`

const sizeCode = `<NTag size="small">Small</NTag>
<NTag size="medium">Medium</NTag>
<NTag size="large">Large</NTag>`

const closableCode = `<NTag closable @close="handleClose">可关闭</NTag>`

const checkableCode = `<NCheckTag v-model:checked="checked">可选中</NCheckTag>`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Tag 标签</h2>

    <CodePreview title="基础用法" description="标签有五种类型" :code="basicCode">
      <NSpace>
        <NTag>Default</NTag>
        <NTag type="success">Success</NTag>
        <NTag type="info">Info</NTag>
        <NTag type="warning">Warning</NTag>
        <NTag type="error">Error</NTag>
      </NSpace>
    </CodePreview>

    <CodePreview title="尺寸和形状" description="标签支持不同尺寸和圆角" :code="sizeCode">
      <NSpace align="center">
        <NTag size="small" type="primary">Small</NTag>
        <NTag size="medium" type="primary">Medium</NTag>
        <NTag size="large" type="primary">Large</NTag>
        <NTag round type="success">Round</NTag>
        <NTag round type="info" size="small">Small Round</NTag>
      </NSpace>
    </CodePreview>

    <CodePreview title="可关闭" description="设置 closable 属性使标签可关闭" :code="closableCode">
      <NSpace>
        <NTag closable type="success">Vue</NTag>
        <NTag closable type="info">React</NTag>
        <NTag closable type="warning">Angular</NTag>
        <NTag closable type="error">Svelte</NTag>
      </NSpace>
    </CodePreview>

    <CodePreview title="可选中" description="使用 NCheckTag 实现可选中的标签" :code="checkableCode">
      <NSpace>
        <NCheckTag v-model:checked="checked">{{ checked ? '已选中' : '未选中' }}</NCheckTag>
        <NCheckTag :checked="true">始终选中</NCheckTag>
        <NCheckTag :checked="false">未选中</NCheckTag>
      </NSpace>
    </CodePreview>
  </div>
</template>
