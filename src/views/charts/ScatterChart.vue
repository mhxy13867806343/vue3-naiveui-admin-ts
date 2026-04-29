<script setup lang="ts">
import { ref } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { ScatterChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components'
import CodePreview from '@/components/common/CodePreview.vue'

use([CanvasRenderer, ScatterChart, GridComponent, TooltipComponent, LegendComponent, TitleComponent])

const option = ref({
  title: { text: '散点图' },
  tooltip: { trigger: 'item' },
  legend: { data: ['男性', '女性'] },
  xAxis: { name: '身高(cm)' },
  yAxis: { name: '体重(kg)' },
  series: [
    {
      name: '男性',
      type: 'scatter',
      data: [
        [174, 65.6], [175.3, 71.8], [193.5, 80.7], [186.5, 72.6], [187.2, 78.8],
        [181.5, 74.8], [184, 86.4], [184.5, 78.4], [175, 62], [184, 81.6],
        [180, 76.6], [177.8, 83.6], [192, 90], [176, 74.6], [174, 71],
      ],
    },
    {
      name: '女性',
      type: 'scatter',
      data: [
        [161.2, 51.6], [167.5, 59], [159.5, 49.2], [157, 63], [155.8, 53.6],
        [170, 59], [159.1, 47.6], [166, 69.8], [176.2, 66.8], [160.2, 75.2],
        [172.5, 55.2], [170.9, 54.2], [172.9, 62.5], [153.4, 42], [160, 50],
      ],
    },
  ],
})

const code = `import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { ScatterChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components'

use([CanvasRenderer, ScatterChart, GridComponent, TooltipComponent, LegendComponent, TitleComponent])

const option = ref({
  title: { text: '散点图' },
  tooltip: { trigger: 'item' },
  legend: { data: ['男性', '女性'] },
  xAxis: { name: '身高(cm)' },
  yAxis: { name: '体重(kg)' },
  series: [
    {
      name: '男性',
      type: 'scatter',
      data: [
        [174, 65.6], [175.3, 71.8], [193.5, 80.7], [186.5, 72.6], [187.2, 78.8],
        [181.5, 74.8], [184, 86.4], [184.5, 78.4], [175, 62], [184, 81.6],
      ],
    },
    {
      name: '女性',
      type: 'scatter',
      data: [
        [161.2, 51.6], [167.5, 59], [159.5, 49.2], [157, 63], [155.8, 53.6],
        [170, 59], [159.1, 47.6], [166, 69.8], [176.2, 66.8], [160.2, 75.2],
      ],
    },
  ],
})

// Template:
// <VChart :option="option" style="height: 400px" autoresize />`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">散点图</h2>
    <CodePreview title="散点图" description="使用 ECharts 绘制的散点图，适合展示两个变量之间的关系" :code="code">
      <VChart :option="option" style="height: 400px" autoresize />
    </CodePreview>
  </div>
</template>
