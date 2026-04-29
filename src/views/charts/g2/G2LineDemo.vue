<script setup lang="ts">
/**
 * AntV G2 折线图（基础）
 * https://g2.antv.antgroup.com/
 */
import { onMounted, onBeforeUnmount, ref, shallowRef } from 'vue'
import { Chart } from '@antv/g2'
import { NCard } from 'naive-ui'

const containerRef = ref<HTMLDivElement | null>(null)
const chart = shallowRef<Chart | null>(null)

const data = [
  { month: '1月', city: '北京', value: 7.0 },
  { month: '2月', city: '北京', value: 6.9 },
  { month: '3月', city: '北京', value: 9.5 },
  { month: '4月', city: '北京', value: 14.5 },
  { month: '5月', city: '北京', value: 18.4 },
  { month: '6月', city: '北京', value: 21.5 },
  { month: '7月', city: '北京', value: 25.2 },
  { month: '8月', city: '北京', value: 26.5 },
  { month: '9月', city: '北京', value: 23.3 },
  { month: '10月', city: '北京', value: 18.3 },
  { month: '11月', city: '北京', value: 13.9 },
  { month: '12月', city: '北京', value: 9.6 },
  { month: '1月', city: '上海', value: 3.9 },
  { month: '2月', city: '上海', value: 4.2 },
  { month: '3月', city: '上海', value: 5.7 },
  { month: '4月', city: '上海', value: 8.5 },
  { month: '5月', city: '上海', value: 11.9 },
  { month: '6月', city: '上海', value: 15.2 },
  { month: '7月', city: '上海', value: 17.0 },
  { month: '8月', city: '上海', value: 16.6 },
  { month: '9月', city: '上海', value: 14.2 },
  { month: '10月', city: '上海', value: 10.3 },
  { month: '11月', city: '上海', value: 6.6 },
  { month: '12月', city: '上海', value: 4.8 },
]

onMounted(() => {
  if (!containerRef.value) return
  const c = new Chart({
    container: containerRef.value,
    autoFit: true,
    height: 360,
  })
  c.data(data)
  c.line()
    .encode('x', 'month')
    .encode('y', 'value')
    .encode('color', 'city')
    .encode('shape', 'smooth')
  c.point()
    .encode('x', 'month')
    .encode('y', 'value')
    .encode('color', 'city')
    .encode('shape', 'point')
    .tooltip(false)
  c.render()
  chart.value = c
})

onBeforeUnmount(() => {
  chart.value?.destroy()
})
</script>

<template>
  <div class="p-4">
    <NCard title="G2 折线图（基础）" size="small">
      <template #header-extra>
        <span class="text-gray-400 text-sm">@antv/g2 · 多系列折线 + 平滑曲线</span>
      </template>
      <div ref="containerRef" style="width: 100%; height: 360px;"></div>
    </NCard>
  </div>
</template>
