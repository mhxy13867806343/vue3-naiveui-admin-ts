<script setup lang="ts">
import { ref } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components'
import CodePreview from '@/components/common/CodePreview.vue'

use([CanvasRenderer, LineChart, GridComponent, TooltipComponent, LegendComponent, TitleComponent])

const option = ref({
  title: { text: '折线图' },
  tooltip: { trigger: 'axis' },
  legend: { data: ['销售额', '利润'] },
  xAxis: {
    type: 'category',
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
  },
  yAxis: { type: 'value' },
  series: [
    { name: '销售额', type: 'line', data: [820, 932, 901, 934, 1290, 1330, 1320], smooth: true },
    { name: '利润', type: 'line', data: [320, 432, 401, 534, 690, 730, 720], smooth: true },
  ],
})

const code = `import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components'

use([CanvasRenderer, LineChart, GridComponent, TooltipComponent, LegendComponent, TitleComponent])

const option = ref({
  title: { text: '折线图' },
  tooltip: { trigger: 'axis' },
  legend: { data: ['销售额', '利润'] },
  xAxis: {
    type: 'category',
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
  },
  yAxis: { type: 'value' },
  series: [
    { name: '销售额', type: 'line', data: [820, 932, 901, 934, 1290, 1330, 1320], smooth: true },
    { name: '利润', type: 'line', data: [320, 432, 401, 534, 690, 730, 720], smooth: true },
  ],
})

// Template:
// <VChart :option="option" style="height: 400px" autoresize />`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">折线图</h2>
    <CodePreview title="基础折线图" description="使用 ECharts 绘制的基础折线图，支持平滑曲线和多系列数据展示" :code="code">
      <VChart :option="option" style="height: 400px" autoresize />
    </CodePreview>
  </div>
</template>
