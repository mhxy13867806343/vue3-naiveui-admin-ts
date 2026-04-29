<script setup lang="ts">
/**
 * AntV G2 散点图（鸢尾花高级统计 · 颜色 + 大小双编码）
 */
import { onMounted, onBeforeUnmount, ref, shallowRef } from 'vue'
import { Chart } from '@antv/g2'
import { NCard } from 'naive-ui'

const containerRef = ref<HTMLDivElement | null>(null)
const chart = shallowRef<Chart | null>(null)

const iris = [
  ['setosa', 5.1, 3.5, 1.4, 0.2], ['setosa', 4.9, 3.0, 1.4, 0.2],
  ['setosa', 4.7, 3.2, 1.3, 0.2], ['setosa', 4.6, 3.1, 1.5, 0.2],
  ['setosa', 5.0, 3.6, 1.4, 0.2], ['setosa', 5.4, 3.9, 1.7, 0.4],
  ['setosa', 4.6, 3.4, 1.4, 0.3], ['setosa', 5.0, 3.4, 1.5, 0.2],
  ['setosa', 4.4, 2.9, 1.4, 0.2], ['setosa', 4.9, 3.1, 1.5, 0.1],
  ['versicolor', 7.0, 3.2, 4.7, 1.4], ['versicolor', 6.4, 3.2, 4.5, 1.5],
  ['versicolor', 6.9, 3.1, 4.9, 1.5], ['versicolor', 5.5, 2.3, 4.0, 1.3],
  ['versicolor', 6.5, 2.8, 4.6, 1.5], ['versicolor', 5.7, 2.8, 4.5, 1.3],
  ['versicolor', 6.3, 3.3, 4.7, 1.6], ['versicolor', 4.9, 2.4, 3.3, 1.0],
  ['versicolor', 6.6, 2.9, 4.6, 1.3], ['versicolor', 5.2, 2.7, 3.9, 1.4],
  ['virginica', 6.3, 3.3, 6.0, 2.5], ['virginica', 5.8, 2.7, 5.1, 1.9],
  ['virginica', 7.1, 3.0, 5.9, 2.1], ['virginica', 6.3, 2.9, 5.6, 1.8],
  ['virginica', 6.5, 3.0, 5.8, 2.2], ['virginica', 7.6, 3.0, 6.6, 2.1],
  ['virginica', 4.9, 2.5, 4.5, 1.7], ['virginica', 7.3, 2.9, 6.3, 1.8],
  ['virginica', 6.7, 2.5, 5.8, 1.8], ['virginica', 7.2, 3.6, 6.1, 2.5],
].map(([species, sl, sw, pl, pw]) => ({
  species: species as string,
  sepalLength: sl as number,
  sepalWidth: sw as number,
  petalLength: pl as number,
  petalWidth: pw as number,
}))

onMounted(() => {
  if (!containerRef.value) return
  const c = new Chart({
    container: containerRef.value,
    autoFit: true,
    height: 480,
  })
  c.data(iris)
  c.point()
    .encode('x', 'sepalLength')
    .encode('y', 'petalLength')
    .encode('color', 'species')
    .encode('size', 'petalWidth')
    .encode('shape', 'point')
    .scale('size', { range: [4, 14] })
    .style('fillOpacity', 0.7)
    .axis('x', { title: '萼片长度 (Sepal Length)' })
    .axis('y', { title: '花瓣长度 (Petal Length)' })
    .legend('size', { title: '花瓣宽度' })
  c.render()
  chart.value = c
})

onBeforeUnmount(() => chart.value?.destroy())
</script>

<template>
  <div class="p-4">
    <NCard title="G2 散点图（高级 · 颜色 + 大小双编码）" size="small">
      <template #header-extra>
        <span class="text-gray-400 text-sm">@antv/g2 · 鸢尾花数据集</span>
      </template>
      <div ref="containerRef" style="width: 100%; height: 480px;"></div>
      <div class="text-gray-500 text-sm mt-2">
        通过 X / Y / 颜色 / 大小 4 个视觉通道同时展示鸢尾花 4 个特征。
      </div>
    </NCard>
  </div>
</template>
