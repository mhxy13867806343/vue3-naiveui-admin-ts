<script setup lang="ts">
/**
 * 多级路由 1-4-2-2
 * Tree + Transfer 组合：树形选择 + 穿梭框
 */
import { ref } from 'vue'
import {
  NCard, NTree, NTransfer, NSpace, NBreadcrumb, NBreadcrumbItem, NDivider,
  type TreeOption,
} from 'naive-ui'

const treeData: TreeOption[] = [
  {
    label: '部门 A',
    key: 'A',
    children: [
      { label: '研发组', key: 'A-1', children: [
        { label: '前端', key: 'A-1-1' },
        { label: '后端', key: 'A-1-2' },
      ]},
      { label: '产品组', key: 'A-2' },
    ],
  },
  {
    label: '部门 B',
    key: 'B',
    children: [
      { label: '设计组', key: 'B-1' },
      { label: '测试组', key: 'B-2' },
    ],
  },
]
const checkedKeys = ref<Array<string | number>>(['A-1-1'])

const transferOptions = Array.from({ length: 12 }).map((_, i) => ({
  label: `权限节点 ${i + 1}`,
  value: `perm-${i + 1}`,
  disabled: i === 5,
}))
const transferValue = ref<string[]>(['perm-1', 'perm-3'])
</script>

<template>
  <div class="p-4">
    <NBreadcrumb>
      <NBreadcrumbItem>多级路由</NBreadcrumbItem>
      <NBreadcrumbItem>1-4</NBreadcrumbItem>
      <NBreadcrumbItem>1-4-2</NBreadcrumbItem>
      <NBreadcrumbItem>1-4-2-2</NBreadcrumbItem>
    </NBreadcrumb>
    <NDivider />
    <NSpace vertical size="large">
      <NCard title="1-4-2-2 · Tree 树形选择" size="small">
        <NTree
          :data="treeData"
          checkable
          cascade
          block-line
          :checked-keys="checkedKeys"
          :default-expand-all="true"
          style="max-width: 420px"
          @update:checked-keys="(k) => (checkedKeys = k)"
        />
        <div class="mt-3 text-gray-500 text-sm">已选: {{ checkedKeys.join('、') || '无' }}</div>
      </NCard>
      <NCard title="Transfer 穿梭框" size="small">
        <NTransfer
          v-model:value="transferValue"
          :options="transferOptions"
          source-filterable
          target-filterable
        />
      </NCard>
    </NSpace>
  </div>
</template>
