<script setup lang="ts">
/**
 * AntV G2 多系列柱状图（分组 / 堆叠 切换）
 */
import { onMounted, onBeforeUnmount, ref, shallowRef, watch } from 'vue'
import { Chart } from '@antv/g2'
import { NCard, NRadioGroup, NRadio, NSpace } from 'naive-ui'

const containerRef = ref<HTMLDivElement | null>(null)
const chart = shallowRef<Chart | null>(null)
const mode = ref<'group' | 'stack'>('group')

const data = [
  { quarter: 'Q1', product: '手机', sales: 320 },
  { quarter: 'Q2', product: '手机', sales: 412 },
  { quarter: 'Q3', product: '手机', sales: 502 },
  { quarter: 'Q4', product: '手机', sales: 580 },
  { quarter: 'Q1', product: '电脑', sales: 230 },
  { quarter: 'Q2', product: '电脑', sales: 280 },
  { quarter: 'Q3', product: '电脑', sales: 340 },
  { quarter: 'Q4', product: '电脑', sales: 390 },
  { quarter: 'Q1', product: '配件', sales: 150 },
  { quarter: 'Q2', product: '配件', sales: 198 },
  { quarter: 'Q3', product: '配件', sales: 220 },
  { quarter: 'Q4', product: '配件', sales: 260 },
]

function render() {
  if (!containerRef.value) return
  chart.value?.destroy()
  const c = new Chart({ container: containerRef.value, autoFit: true, height: 360 })
  c.data(data)
  const interval = c
    .interval()
    .encode('x', 'quarter')
    .encode('y', 'sales')
    .encode('color', 'product')

  if (mode.value === 'group') {
    interval.transform({ type: 'dodgeX' })
  } else {
    interval.transform({ type: 'stackY' })
  }

  c.render()
  chart.value = c
}

onMounted(render)
watch(mode, render)
onBeforeUnmount(() => chart.value?.destroy())
</script>

<template>
  <div class="p-4">
    <NCard title="G2 多系列柱状图（分组 / 堆叠）" size="small">
      <template #header-extra>
        <NRadioGroup v-model:value="mode" size="small">
          <NSpace>
            <NRadio value="group">分组</NRadio>
            <NRadio value="stack">堆叠</NRadio>
          </NSpace>
        </NRadioGroup>
      </template>
      <div ref="containerRef" style="width: 100%; height: 360px;"></div>
    </NCard>
  </div>
</template>
