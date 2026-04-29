<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * AntV G6 组织架构树（紧凑树布局）
 */
import { onMounted, onBeforeUnmount, ref, shallowRef } from 'vue'
import { Graph, treeToGraphData } from '@antv/g6'
import { NCard } from 'naive-ui'

const containerRef = ref<HTMLDivElement | null>(null)
const graph = shallowRef<Graph | null>(null)

const tree = {
  id: 'root',
  data: { label: 'CEO 张总' },
  children: [
    {
      id: 'cto',
      data: { label: 'CTO 李四' },
      children: [
        { id: 'fe', data: { label: '前端组' } },
        { id: 'be', data: { label: '后端组' } },
        { id: 'qa', data: { label: '测试组' } },
      ],
    },
    {
      id: 'coo',
      data: { label: 'COO 王五' },
      children: [
        { id: 'op', data: { label: '运营部' } },
        { id: 'cs', data: { label: '客服部' } },
      ],
    },
    {
      id: 'cfo',
      data: { label: 'CFO 赵六' },
      children: [
        { id: 'fin', data: { label: '财务部' } },
        { id: 'hr', data: { label: '人事部' } },
      ],
    },
  ],
}

onMounted(() => {
  if (!containerRef.value) return
  const g = new Graph({
    container: containerRef.value,
    autoFit: 'view',
    data: treeToGraphData(tree),
    node: {
      type: 'rect',
      style: {
        size: [120, 40],
        radius: 6,
        fill: '#2080f0',
        stroke: '#1060c8',
        lineWidth: 1,
        labelText: (d: any) => d.data?.label ?? '',
        labelFill: '#fff',
        labelPlacement: 'center',
        labelFontSize: 13,
      },
    },
    edge: {
      type: 'polyline',
      style: {
        router: { type: 'orth' },
        stroke: '#aaa',
        lineWidth: 1.2,
      },
    },
    layout: {
      type: 'compact-box',
      direction: 'TB',
      getHeight: () => 40,
      getWidth: () => 120,
      getVGap: () => 24,
      getHGap: () => 30,
    },
    behaviors: ['drag-canvas', 'zoom-canvas'],
  })
  g.render()
  graph.value = g
})

onBeforeUnmount(() => graph.value?.destroy())
</script>

<template>
  <div class="p-4">
    <NCard title="G6 组织架构树（紧凑树布局）" size="small">
      <template #header-extra>
        <span class="text-gray-400 text-sm">compact-box 布局 · 自上而下</span>
      </template>
      <div ref="containerRef" style="width: 100%; height: 480px; background: #fafafa; border-radius: 4px;"></div>
    </NCard>
  </div>
</template>
