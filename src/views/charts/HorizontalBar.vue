<script setup lang="ts">
import { ref } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components'
import CodePreview from '@/components/common/CodePreview.vue'

use([CanvasRenderer, BarChart, GridComponent, TooltipComponent, LegendComponent, TitleComponent])

const option = ref({
  title: { text: '横向柱状图' },
  tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
  legend: {},
  xAxis: { type: 'value' },
  yAxis: {
    type: 'category',
    data: ['巴西', '印尼', '美国', '印度', '中国', '世界'],
  },
  series: [
    { name: '2023', type: 'bar', data: [18203, 23489, 29034, 104970, 131744, 630230] },
    { name: '2024', type: 'bar', data: [19325, 23438, 31000, 121594, 134141, 681807] },
  ],
})

const code = `import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components'

use([CanvasRenderer, BarChart, GridComponent, TooltipComponent, LegendComponent, TitleComponent])

const option = ref({
  title: { text: '横向柱状图' },
  tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
  legend: {},
  xAxis: { type: 'value' },
  yAxis: {
    type: 'category',
    data: ['巴西', '印尼', '美国', '印度', '中国', '世界'],
  },
  series: [
    { name: '2023', type: 'bar', data: [18203, 23489, 29034, 104970, 131744, 630230] },
    { name: '2024', type: 'bar', data: [19325, 23438, 31000, 121594, 134141, 681807] },
  ],
})

// Template:
// <VChart :option="option" style="height: 400px" autoresize />`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">横向柱状图</h2>
    <CodePreview title="横向柱状图" description="使用 ECharts 绘制的横向柱状图，交换 X/Y 轴实现水平展示" :code="code">
      <VChart :option="option" style="height: 400px" autoresize />
    </CodePreview>
  </div>
</template>
