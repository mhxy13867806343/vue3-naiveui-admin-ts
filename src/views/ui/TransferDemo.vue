<script setup lang="ts">
import { ref } from 'vue'
import { NTransfer } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const value = ref<string[]>([])

const options = [
  { label: 'Vue', value: 'vue' },
  { label: 'React', value: 'react' },
  { label: 'Angular', value: 'angular' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Solid', value: 'solid' },
  { label: 'Preact', value: 'preact' },
  { label: 'Lit', value: 'lit' },
  { label: 'Alpine', value: 'alpine' },
]

const basicCode = `const value = ref([])
const options = [
  { label: 'Vue', value: 'vue' },
  { label: 'React', value: 'react' },
]

<NTransfer v-model:value="value" :options="options" />`

const filterCode = `<NTransfer v-model:value="value" :options="options" source-filterable />`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Transfer 穿梭框</h2>

    <CodePreview title="基础用法" description="基础的穿梭框组件" :code="basicCode">
      <NTransfer v-model:value="value" :options="options" />
    </CodePreview>

    <CodePreview title="可搜索" description="设置 source-filterable 启用搜索" :code="filterCode">
      <NTransfer :options="options" source-filterable />
    </CodePreview>
  </div>
</template>
