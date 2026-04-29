<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * AntV G6 赛事对阵图（Bracket）
 * 参考图：英雄联盟全球总决赛淘汰赛对阵
 */
import { onMounted, onBeforeUnmount, ref, shallowRef } from 'vue'
import { Graph } from '@antv/g6'
import { NCard } from 'naive-ui'

const containerRef = ref<HTMLDivElement | null>(null)
const graph = shallowRef<Graph | null>(null)

interface Match {
  id: string
  round: number
  date: string
  teamA: string
  teamB: string
  scoreA: number
  scoreB: number
  next?: string
}

const matches: Match[] = [
  // 第一轮
  { id: 'r1-1', round: 1, date: '2/09 14:00', teamA: 'TES', teamB: 'WE',  scoreA: 3, scoreB: 2, next: 'r2-1' },
  { id: 'r1-2', round: 1, date: '2/09 17:00', teamA: 'IG',  teamB: 'NIP', scoreA: 1, scoreB: 3, next: 'r2-2' },
  { id: 'r1-3', round: 1, date: '2/10 14:00', teamA: 'TT',  teamB: 'LNG', scoreA: 0, scoreB: 3, next: 'r2-3' },
  { id: 'r1-4', round: 1, date: '2/10 17:00', teamA: 'EDG', teamB: 'OMG', scoreA: 1, scoreB: 3, next: 'r2-4' },
  // 第二轮（晋级）
  { id: 'r2-1', round: 2, date: '2/11 14:00', teamA: 'TES', teamB: '',    scoreA: 0, scoreB: 0, next: 'r3-1' },
  { id: 'r2-2', round: 2, date: '2/11 14:00', teamA: 'NIP', teamB: '',    scoreA: 0, scoreB: 0, next: 'r3-1' },
  { id: 'r2-3', round: 2, date: '2/11 17:00', teamA: 'LNG', teamB: '',    scoreA: 0, scoreB: 0, next: 'r3-2' },
  { id: 'r2-4', round: 2, date: '2/11 17:00', teamA: 'OMG', teamB: '',    scoreA: 0, scoreB: 0, next: 'r3-2' },
  // 半决赛
  { id: 'r3-1', round: 3, date: '2/13 17:00', teamA: '?', teamB: '?', scoreA: 0, scoreB: 0, next: 'final' },
  { id: 'r3-2', round: 3, date: '2/14 17:00', teamA: '?', teamB: '?', scoreA: 0, scoreB: 0, next: 'final' },
  // 决赛
  { id: 'final', round: 4, date: '2/16 18:00', teamA: '?', teamB: '?', scoreA: 0, scoreB: 0 },
]

// 列布局：每轮一列
const colX = [80, 380, 680, 980]
const cardW = 220
const cardH = 84

function buildPositions() {
  const pos: Record<string, { x: number; y: number }> = {}
  // 第一轮均匀分布
  const r1 = matches.filter((m) => m.round === 1)
  r1.forEach((m, i) => {
    pos[m.id] = { x: colX[0], y: 60 + i * 130 }
  })
  // 后续每轮取上游中点
  for (let r = 2; r <= 4; r++) {
    const list = matches.filter((m) => m.round === r)
    list.forEach((m) => {
      const sources = matches.filter((s) => s.next === m.id)
      const ys = sources.map((s) => pos[s.id].y)
      const cy = ys.length ? ys.reduce((a, b) => a + b, 0) / ys.length : 60
      pos[m.id] = { x: colX[r - 1], y: cy }
    })
  }
  return pos
}

onMounted(() => {
  if (!containerRef.value) return

  const positions = buildPositions()
  const nodes = matches.map((m) => ({
    id: m.id,
    x: positions[m.id].x,
    y: positions[m.id].y,
    data: m as unknown as Record<string, unknown>,
  }))
  const edges = matches
    .filter((m) => m.next)
    .map((m) => ({ source: m.id, target: m.next! }))

  const g = new Graph({
    container: containerRef.value,
    autoFit: 'view',
    padding: 20,
    data: { nodes, edges },
    node: {
      type: 'rect',
      style: {
        size: [cardW, cardH],
        radius: 4,
        fill: '#ffffff',
        stroke: '#d9d9d9',
        lineWidth: 1,
        shadowColor: 'rgba(0,0,0,0.06)',
        shadowBlur: 6,
        shadowOffsetY: 2,
      },
    },
    edge: {
      type: 'polyline',
      style: {
        router: { type: 'orth' },
        stroke: '#bfbfbf',
        lineWidth: 1.2,
      },
    },
    behaviors: ['drag-canvas', 'zoom-canvas'],
  })

  // 自定义 HTML 节点：用 G6 渲染后再叠加一层 DOM 卡片
  // 这里使用更简单的方式：监听 afterrender，遍历节点位置往容器里塞 DOM 卡片
  g.render().then(() => {
    const wrap = containerRef.value
    if (!wrap) return
    const overlay = document.createElement('div')
    overlay.style.position = 'absolute'
    overlay.style.inset = '0'
    overlay.style.pointerEvents = 'none'
    wrap.style.position = 'relative'
    wrap.appendChild(overlay)

    matches.forEach((m) => {
      const p = positions[m.id]
      const card = document.createElement('div')
      const aWin = m.scoreA > m.scoreB
      const bWin = m.scoreB > m.scoreA
      const empty = m.scoreA === 0 && m.scoreB === 0
      card.innerHTML = `
        <div style="font-size:12px;color:#999;margin-bottom:4px;">${m.date}</div>
        <div style="display:flex;align-items:center;justify-content:space-between;padding:4px 8px;background:${aWin ? '#f5fcf6' : '#fafafa'};border-radius:3px;margin-bottom:3px;">
          <span style="font-weight:${aWin ? 600 : 400};color:${aWin ? '#18a058' : '#333'}">${m.teamA || '-'}</span>
          <span style="font-weight:600;color:${aWin ? '#18a058' : '#999'}">${empty ? '' : m.scoreA}</span>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;padding:4px 8px;background:${bWin ? '#f5fcf6' : '#fafafa'};border-radius:3px;">
          <span style="font-weight:${bWin ? 600 : 400};color:${bWin ? '#18a058' : '#333'}">${m.teamB || '-'}</span>
          <span style="font-weight:600;color:${bWin ? '#18a058' : '#999'}">${empty ? '' : m.scoreB}</span>
        </div>
      `
      Object.assign(card.style, {
        position: 'absolute',
        left: `${p.x - cardW / 2}px`,
        top: `${p.y - cardH / 2}px`,
        width: `${cardW}px`,
        height: `${cardH}px`,
        boxSizing: 'border-box',
        padding: '6px 8px',
        background: '#fff',
        pointerEvents: 'none',
      })
      overlay.appendChild(card)
    })

    // 跟随画布缩放/平移
    const sync = () => {
      const zoom = g.getZoom()
      const [tx, ty] = (g as any).getPosition?.() ?? [0, 0]
      overlay.style.transformOrigin = '0 0'
      overlay.style.transform = `translate(${tx}px, ${ty}px) scale(${zoom})`
    }
    sync()
    g.on('viewportchange', sync)
    g.on('afterrender', sync)
  })

  graph.value = g
})

onBeforeUnmount(() => graph.value?.destroy())
</script>

<template>
  <div class="p-4">
    <NCard title="G6 赛事对阵图（Bracket）" size="small">
      <template #header-extra>
        <span class="text-gray-400 text-sm">@antv/g6 · 拖拽平移 / 滚轮缩放</span>
      </template>
      <div
        ref="containerRef"
        style="width: 100%; height: 560px; background: #fff; border: 1px solid #f0f0f0; border-radius: 4px; overflow: hidden;"
      ></div>
      <div class="text-gray-500 text-sm mt-2">
        参考英雄联盟全球总决赛对阵图样式：左侧 4 场首轮 → 2 场半区决出 → 半决赛 → 决赛。
      </div>
    </NCard>
  </div>
</template>
