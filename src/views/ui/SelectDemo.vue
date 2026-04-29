<script setup lang="ts">
import { ref } from 'vue'
import { NSelect, NSpace } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const singleValue = ref(null)
const multiValue = ref(null)

const options = [
  { label: 'Vue', value: 'vue' },
  { label: 'React', value: 'react' },
  { label: 'Angular', value: 'angular' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Solid', value: 'solid' },
]

const basicCode = `<NSelect v-model:value="value" :options="options" placeholder="请选择" />`
const multiCode = `<NSelect v-model:value="value" :options="options" multiple placeholder="请选择" />`
const filterCode = `<NSelect :options="options" filterable placeholder="输入搜索" />`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Select 选择器</h2>

    <CodePreview title="基础用法" description="基础的单选选择器" :code="basicCode">
      <NSelect v-model:value="singleValue" :options="options" placeholder="请选择框架" style="width: 250px" />
    </CodePreview>

    <CodePreview title="多选" description="设置 multiple 属性启用多选" :code="multiCode">
      <NSelect v-model:value="multiValue" :options="options" multiple placeholder="请选择框架（多选）" style="width: 400px" />
    </CodePreview>

    <CodePreview title="可搜索" description="设置 filterable 属性启用搜索过滤" :code="filterCode">
      <NSelect :options="options" filterable clearable placeholder="输入关键词搜索" style="width: 250px" />
    </CodePreview>

    <CodePreview title="禁用" description="选择器可以被禁用" :code="`<NSelect disabled />`">
      <NSpace>
        <NSelect :options="options" disabled value="vue" style="width: 250px" />
      </NSpace>
    </CodePreview>
  </div>
</template>
