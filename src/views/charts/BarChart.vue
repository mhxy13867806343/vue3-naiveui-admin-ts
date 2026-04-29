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
  title: { text: '柱状图' },
  tooltip: { trigger: 'axis' },
  legend: { data: ['2023年', '2024年'] },
  xAxis: {
    type: 'category',
    data: ['1月', '2月', '3月', '4月', '5月', '6月'],
  },
  yAxis: { type: 'value' },
  series: [
    { name: '2023年', type: 'bar', data: [520, 600, 750, 680, 700, 830] },
    { name: '2024年', type: 'bar', data: [620, 732, 801, 834, 890, 930] },
  ],
})

const code = `import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components'

use([CanvasRenderer, BarChart, GridComponent, TooltipComponent, LegendComponent, TitleComponent])

const option = ref({
  title: { text: '柱状图' },
  tooltip: { trigger: 'axis' },
  legend: { data: ['2023年', '2024年'] },
  xAxis: {
    type: 'category',
    data: ['1月', '2月', '3月', '4月', '5月', '6月'],
  },
  yAxis: { type: 'value' },
  series: [
    { name: '2023年', type: 'bar', data: [520, 600, 750, 680, 700, 830] },
    { name: '2024年', type: 'bar', data: [620, 732, 801, 834, 890, 930] },
  ],
})

// Template:
// <VChart :option="option" style="height: 400px" autoresize />`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">柱状图</h2>
    <CodePreview title="基础柱状图" description="使用 ECharts 绘制的基础柱状图，支持多系列对比" :code="code">
      <VChart :option="option" style="height: 400px" autoresize />
    </CodePreview>
  </div>
</template>
