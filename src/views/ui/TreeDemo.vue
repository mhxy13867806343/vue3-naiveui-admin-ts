<script setup lang="ts">
import { ref } from 'vue'
import { NTree, NSpace, NSwitch } from 'naive-ui'
import type { TreeOption } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const treeData: TreeOption[] = [
  { key: '1', label: '文档', children: [
    { key: '1-1', label: '介绍.md' },
    { key: '1-2', label: '快速开始.md' },
    { key: '1-3', label: 'API 参考', children: [
      { key: '1-3-1', label: '组件 API' },
      { key: '1-3-2', label: '指令 API' },
    ] },
  ] },
  { key: '2', label: '源码', children: [
    { key: '2-1', label: 'components', children: [
      { key: '2-1-1', label: 'Button.vue' },
      { key: '2-1-2', label: 'Input.vue' },
    ] },
    { key: '2-2', label: 'utils', children: [
      { key: '2-2-1', label: 'helpers.ts' },
    ] },
  ] },
  { key: '3', label: '配置文件', children: [
    { key: '3-1', label: 'package.json' },
    { key: '3-2', label: 'tsconfig.json' },
    { key: '3-3', label: 'vite.config.ts' },
  ] },
]

const checkable = ref(false)
const checkedKeys = ref<string[]>([])

const basicCode = `<NTree :data="treeData" block-line default-expand-all />`
const checkableCode = `<NTree :data="treeData" checkable cascade block-line />`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Tree 树形控件</h2>

    <CodePreview title="基础用法" description="基础的树形展示" :code="basicCode">
      <NTree :data="treeData" block-line default-expand-all selectable />
    </CodePreview>

    <CodePreview title="可勾选" description="设置 checkable 属性启用复选框" :code="checkableCode">
      <NTree :data="treeData" checkable cascade block-line default-expand-all v-model:checked-keys="checkedKeys" />
      <p v-if="checkedKeys.length" style="margin-top: 8px; color: #666">已选: {{ checkedKeys.join(', ') }}</p>
    </CodePreview>
  </div>
</template>
