<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * AntV G6 关系图（力导向布局）
 * https://g6.antv.antgroup.com/
 */
import { onMounted, onBeforeUnmount, ref, shallowRef } from 'vue'
import { Graph } from '@antv/g6'
import { NCard } from 'naive-ui'

const containerRef = ref<HTMLDivElement | null>(null)
const graph = shallowRef<Graph | null>(null)

const data = {
  nodes: [
    { id: '1', label: '前端', cluster: 'tech' },
    { id: '2', label: '后端', cluster: 'tech' },
    { id: '3', label: 'DBA', cluster: 'tech' },
    { id: '4', label: '运维', cluster: 'tech' },
    { id: '5', label: '产品', cluster: 'biz' },
    { id: '6', label: '设计', cluster: 'biz' },
    { id: '7', label: '运营', cluster: 'biz' },
    { id: '8', label: 'CEO', cluster: 'mgr' },
    { id: '9', label: 'CTO', cluster: 'mgr' },
    { id: '10', label: 'COO', cluster: 'mgr' },
  ],
  edges: [
    { source: '8', target: '9' }, { source: '8', target: '10' },
    { source: '9', target: '1' }, { source: '9', target: '2' },
    { source: '9', target: '3' }, { source: '9', target: '4' },
    { source: '10', target: '5' }, { source: '10', target: '6' },
    { source: '10', target: '7' },
    { source: '1', target: '2' }, { source: '2', target: '3' },
    { source: '5', target: '6' }, { source: '5', target: '1' },
    { source: '5', target: '2' }, { source: '7', target: '6' },
  ],
}

onMounted(() => {
  if (!containerRef.value) return
  const g = new Graph({
    container: containerRef.value,
    autoFit: 'view',
    data,
    node: {
      style: {
        size: 36,
        fill: (d: any) =>
          d.cluster === 'mgr' ? '#f0a020' : d.cluster === 'tech' ? '#2080f0' : '#18a058',
        stroke: '#fff',
        lineWidth: 2,
        labelText: (d: any) => d.label ?? '',
        labelFill: '#fff',
        labelPlacement: 'center',
        labelFontSize: 12,
      },
    },
    edge: {
      style: {
        stroke: '#aaa',
        lineWidth: 1,
        endArrow: true,
      },
    },
    layout: {
      type: 'force',
      preventOverlap: true,
      linkDistance: 100,
      nodeStrength: -50,
    },
    behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
  })
  g.render()
  graph.value = g
})

onBeforeUnmount(() => graph.value?.destroy())
</script>

<template>
  <div class="p-4">
    <NCard title="G6 关系图（力导向）" size="small">
      <template #header-extra>
        <span class="text-gray-400 text-sm">拖拽节点 / 滚轮缩放 / 拖拽画布</span>
      </template>
      <div ref="containerRef" style="width: 100%; height: 480px; background: #fafafa; border-radius: 4px;"></div>
    </NCard>
  </div>
</template>
