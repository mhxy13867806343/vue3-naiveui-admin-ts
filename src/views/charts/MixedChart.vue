<script setup lang="ts">
import { ref } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components'
import CodePreview from '@/components/common/CodePreview.vue'

use([CanvasRenderer, BarChart, LineChart, GridComponent, TooltipComponent, LegendComponent, TitleComponent])

const option = ref({
  title: { text: '混合图（柱状图 + 折线图）' },
  tooltip: { trigger: 'axis', axisPointer: { type: 'cross', crossStyle: { color: '#999' } } },
  legend: { data: ['蒸发量', '降水量', '平均温度'] },
  xAxis: {
    type: 'category',
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    axisPointer: { type: 'shadow' },
  },
  yAxis: [
    { type: 'value', name: '水量(ml)', min: 0, max: 250 },
    { type: 'value', name: '温度(°C)', min: 0, max: 25 },
  ],
  series: [
    { name: '蒸发量', type: 'bar', data: [2, 4.9, 7, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20, 6.4, 3.3] },
    { name: '降水量', type: 'bar', data: [2.6, 5.9, 9, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6, 2.3] },
    { name: '平均温度', type: 'line', yAxisIndex: 1, data: [2, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23, 16.5, 12, 6.2] },
  ],
})

const code = `import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components'

use([CanvasRenderer, BarChart, LineChart, GridComponent, TooltipComponent, LegendComponent, TitleComponent])

const option = ref({
  title: { text: '混合图（柱状图 + 折线图）' },
  tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
  legend: { data: ['蒸发量', '降水量', '平均温度'] },
  xAxis: {
    type: 'category',
    data: ['1月', '2月', '3月', '4月', '5月', '6月'],
  },
  yAxis: [
    { type: 'value', name: '水量(ml)' },
    { type: 'value', name: '温度(°C)' },
  ],
  series: [
    { name: '蒸发量', type: 'bar', data: [2, 4.9, 7, 23.2, 25.6, 76.7] },
    { name: '降水量', type: 'bar', data: [2.6, 5.9, 9, 26.4, 28.7, 70.7] },
    { name: '平均温度', type: 'line', yAxisIndex: 1, data: [2, 2.2, 3.3, 4.5, 6.3, 10.2] },
  ],
})

// Template:
// <VChart :option="option" style="height: 400px" autoresize />`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">混合图</h2>
    <CodePreview title="混合图" description="使用 ECharts 绘制的柱状图与折线图混合图表，支持双 Y 轴" :code="code">
      <VChart :option="option" style="height: 400px" autoresize />
    </CodePreview>
  </div>
</template>
