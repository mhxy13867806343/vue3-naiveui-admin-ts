<script setup lang="ts">
/**
 * 嵌套树拖拽 (Nested Tree Drag)
 * 基于 NTree 的拖拽排序与跨层级移动
 */
import { ref } from 'vue'
import { NTree, NCard, NAlert } from 'naive-ui'
import type { TreeOption, TreeDropInfo } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const data = ref<TreeOption[]>([
  {
    label: '前端组', key: 'fe',
    children: [
      { label: 'Vue 团队', key: 'fe-vue', children: [
        { label: '张三', key: 'u1' },
        { label: '李四', key: 'u2' },
      ] },
      { label: 'React 团队', key: 'fe-react', children: [
        { label: '王五', key: 'u3' },
      ] },
    ],
  },
  {
    label: '后端组', key: 'be',
    children: [
      { label: 'Java 团队', key: 'be-java', children: [
        { label: '赵六', key: 'u4' },
        { label: '钱七', key: 'u5' },
      ] },
      { label: 'Go 团队', key: 'be-go' },
    ],
  },
  { label: '运维组', key: 'ops' },
])

function findSiblingsAndIndex(node: TreeOption, nodes: TreeOption[] | undefined): [TreeOption[], number] | [null, null] {
  if (!nodes) return [null, null]
  for (let i = 0; i < nodes.length; ++i) {
    const n = nodes[i]
    if (n.key === node.key) return [nodes, i]
    const [siblings, index] = findSiblingsAndIndex(node, n.children)
    if (siblings && index !== null) return [siblings, index]
  }
  return [null, null]
}

function handleDrop({ node, dragNode, dropPosition }: TreeDropInfo) {
  const [dragSiblings, dragIndex] = findSiblingsAndIndex(dragNode, data.value)
  if (!dragSiblings || dragIndex === null) return
  dragSiblings.splice(dragIndex, 1)

  if (dropPosition === 'inside') {
    if (node.children) node.children.unshift(dragNode)
    else node.children = [dragNode]
  } else if (dropPosition === 'before' || dropPosition === 'after') {
    const [siblings, idx] = findSiblingsAndIndex(node, data.value)
    if (!siblings || idx === null) return
    siblings.splice(dropPosition === 'before' ? idx : idx + 1, 0, dragNode)
  }
  data.value = [...data.value]
}

const code = `<NTree
  block-line
  draggable
  :data="data"
  default-expand-all
  @drop="handleDrop"
/>

function handleDrop({ node, dragNode, dropPosition }) {
  // 1. 从原父节点移除
  // 2. 根据 dropPosition (before/inside/after) 插入到目标位置
}`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">嵌套树拖拽</h2>
    <CodePreview
      title="Nested Tree Drag"
      description="基于 NTree 的拖拽，支持跨层级移动节点 (before / inside / after)"
      :code="code"
    >
      <NAlert type="info" class="mb-4">
        长按节点拖动到其它分组下，或拖到节点之间形成同级排序。
      </NAlert>
      <NCard size="small">
        <NTree
          block-line
          draggable
          :data="data"
          :default-expand-all="true"
          @drop="handleDrop"
        />
      </NCard>
    </CodePreview>
  </div>
</template>
