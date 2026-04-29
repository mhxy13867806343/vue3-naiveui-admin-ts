<script setup lang="ts">
import { NDropdown, NButton, NSpace, useMessage } from 'naive-ui'
import type { DropdownOption } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const message = useMessage()

const options: DropdownOption[] = [
  { label: '编辑', key: 'edit' },
  { label: '复制', key: 'copy' },
  { type: 'divider', key: 'd1' },
  { label: '删除', key: 'delete' },
]

const nestedOptions: DropdownOption[] = [
  { label: '文件', key: 'file', children: [
    { label: '新建', key: 'new' },
    { label: '打开', key: 'open' },
    { label: '保存', key: 'save' },
  ] },
  { label: '编辑', key: 'edit-menu', children: [
    { label: '撤销', key: 'undo' },
    { label: '重做', key: 'redo' },
  ] },
]

function handleSelect(key: string) { message.info(`选择了: ${key}`) }

const basicCode = `const options = [
  { label: '编辑', key: 'edit' },
  { label: '复制', key: 'copy' },
  { type: 'divider', key: 'd1' },
  { label: '删除', key: 'delete' },
]

<NDropdown :options="options" @select="handleSelect">
  <NButton>下拉菜单</NButton>
</NDropdown>`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Dropdown 下拉菜单</h2>

    <CodePreview title="基础用法" description="基础的下拉菜单" :code="basicCode">
      <NSpace>
        <NDropdown :options="options" @select="handleSelect">
          <NButton>Hover 触发</NButton>
        </NDropdown>
        <NDropdown :options="options" trigger="click" @select="handleSelect">
          <NButton type="primary">Click 触发</NButton>
        </NDropdown>
      </NSpace>
    </CodePreview>

    <CodePreview title="嵌套菜单" description="下拉菜单支持多级嵌套" :code="`options = [{ label: '文件', children: [...] }]`">
      <NDropdown :options="nestedOptions" @select="handleSelect">
        <NButton>嵌套菜单</NButton>
      </NDropdown>
    </CodePreview>

    <CodePreview title="弹出位置" description="支持不同的弹出方向" :code="`<NDropdown placement='bottom-start'>`">
      <NSpace>
        <NDropdown :options="options" placement="bottom-start" @select="handleSelect"><NButton>Bottom Start</NButton></NDropdown>
        <NDropdown :options="options" placement="bottom-end" @select="handleSelect"><NButton>Bottom End</NButton></NDropdown>
      </NSpace>
    </CodePreview>
  </div>
</template>
