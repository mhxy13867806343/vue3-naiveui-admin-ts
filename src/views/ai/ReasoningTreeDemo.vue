<script setup lang="ts">
/**
 * ReasoningTree 推理树 Demo
 * 展示树状/分支式推理过程：每个节点是一个思考分支，可标记 "已采用 / 已拒绝 / 探索中"
 * 与 Thinking（线性思考）的区别：可视化"分支决策"
 * 灵感：ToT (Tree of Thoughts) 论文 / o1 多路径推理
 */
import { ref, computed } from 'vue'
import { NCard, NButton, NSpace, NTag, NTree, type TreeOption } from 'naive-ui'

interface Node {
  id: string
  label: string
  detail: string
  status: 'explored' | 'selected' | 'rejected' | 'pending'
  children?: Node[]
}

const fullTree: Node = {
  id: 'root',
  label: '问题：用户请求"高效查找数组中第 K 大的元素"',
  detail: '需要权衡时间复杂度、空间复杂度与可读性。',
  status: 'pending',
  children: [
    {
      id: 'a',
      label: '思路 A：直接排序后取索引',
      detail: 'sort + 取倒数第 K 个，O(n log n)。',
      status: 'pending',
      children: [
        { id: 'a1', label: '✅ 简单易懂、代码量少', detail: '5 行内可实现', status: 'pending' },
        { id: 'a2', label: '❌ 浪费：完整排序', detail: '当 K << n 时不划算', status: 'pending' },
      ],
    },
    {
      id: 'b',
      label: '思路 B：最小堆（大小为 K）',
      detail: '维护 K 大小的最小堆，O(n log K)。',
      status: 'pending',
      children: [
        { id: 'b1', label: '✅ K 较小时显著快', detail: '空间 O(K)', status: 'pending' },
        { id: 'b2', label: '⚠️ 需实现/导入堆结构', detail: 'JS 原生无优先队列', status: 'pending' },
      ],
    },
    {
      id: 'c',
      label: '思路 C：快速选择 (Quickselect)',
      detail: '类快排分区，平均 O(n)，最坏 O(n²)。',
      status: 'pending',
      children: [
        { id: 'c1', label: '✅ 平均最优', detail: '与快排同思路', status: 'pending' },
        { id: 'c2', label: '⚠️ 最坏退化', detail: '需引入随机化避免', status: 'pending' },
      ],
    },
    {
      id: 'd',
      label: '思路 D：Bucket / Counting (特例)',
      detail: '若数值范围有限，可 O(n) 完成。',
      status: 'pending',
      children: [
        { id: 'd1', label: '⚠️ 仅特定数据', detail: '通用性差', status: 'pending' },
      ],
    },
  ],
}

const tree = ref<Node>(JSON.parse(JSON.stringify(fullTree)))
const verdict = ref('')
const running = ref(false)

function applyStatusByPath(node: Node, path: string[], status: Node['status']): boolean {
  if (path.length === 0) {
    node.status = status
    return true
  }
  const [head, ...rest] = path
  const child = node.children?.find((c) => c.id === head)
  if (!child) return false
  if (rest.length === 0) {
    child.status = status
    return true
  }
  return applyStatusByPath(child, rest, status)
}

const steps: { path: string[]; status: Node['status']; delay: number }[] = [
  { path: [], status: 'explored', delay: 400 },
  { path: ['a'], status: 'explored', delay: 600 },
  { path: ['a', 'a1'], status: 'explored', delay: 400 },
  { path: ['a', 'a2'], status: 'rejected', delay: 500 },
  { path: ['a'], status: 'rejected', delay: 400 },
  { path: ['b'], status: 'explored', delay: 600 },
  { path: ['b', 'b1'], status: 'explored', delay: 400 },
  { path: ['b', 'b2'], status: 'rejected', delay: 500 },
  { path: ['c'], status: 'explored', delay: 600 },
  { path: ['c', 'c1'], status: 'explored', delay: 400 },
  { path: ['c', 'c2'], status: 'explored', delay: 500 },
  { path: ['d'], status: 'rejected', delay: 500 },
  { path: ['c'], status: 'selected', delay: 600 },
]

let timer: number | null = null
async function start() {
  if (running.value) return
  running.value = true
  reset(false)
  for (const s of steps) {
    await new Promise<void>((r) => {
      timer = window.setTimeout(() => {
        applyStatusByPath(tree.value, s.path, s.status)
        r()
      }, s.delay)
    })
  }
  verdict.value = '✅ 最终选择：思路 C (快速选择 Quickselect)，平均 O(n)，是最优解。引入随机化 pivot 缓解最坏情况。'
  running.value = false
}

function reset(clearVerdict = true) {
  if (timer) clearTimeout(timer)
  tree.value = JSON.parse(JSON.stringify(fullTree))
  if (clearVerdict) verdict.value = ''
}

// 转 NTree 数据
function toTreeOption(node: Node): TreeOption {
  return {
    key: node.id,
    label: node.label,
    children: node.children?.map(toTreeOption),
    suffix: () => h_status(node),
  }
}
import { h } from 'vue'
function h_status(node: Node) {
  const map = {
    pending: { type: 'default', text: '待定' },
    explored: { type: 'info', text: '探索中' },
    selected: { type: 'success', text: '✅ 采用' },
    rejected: { type: 'error', text: '❌ 拒绝' },
  } as const
  const cfg = map[node.status]
  return h(
    NTag,
    { size: 'small', type: cfg.type, bordered: false },
    { default: () => cfg.text },
  )
}

const treeData = computed<TreeOption[]>(() => [toTreeOption(tree.value)])
const expanded = ref<string[]>(['root', 'a', 'b', 'c', 'd'])
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">ReasoningTree 推理树</h2>

    <NCard>
      <NSpace class="mb-4">
        <NButton type="primary" :disabled="running" @click="start">🌳 开始推理</NButton>
        <NButton @click="reset(true)">🔄 重置</NButton>
        <NTag v-if="running" :bordered="false" type="warning">⏳ 正在分支探索...</NTag>
        <NTag v-else-if="verdict" :bordered="false" type="success">推理完成</NTag>
      </NSpace>

      <NTree
        :data="treeData"
        :default-expanded-keys="expanded"
        block-line
        block-node
        class="reason-tree"
      />

      <div v-if="verdict" class="verdict">{{ verdict }}</div>
    </NCard>
  </div>
</template>

<style scoped>
.reason-tree {
  background: #fafafa;
  border-radius: 8px;
  padding: 12px;
}
.verdict {
  margin-top: 16px;
  padding: 14px 18px;
  background: #f0fdf4;
  border-left: 4px solid #18a058;
  border-radius: 6px;
  line-height: 1.7;
  color: #1f2937;
}
</style>
