<script setup lang="ts">
import { ref } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { HeatmapChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  VisualMapComponent,
} from 'echarts/components'
import CodePreview from '@/components/common/CodePreview.vue'

use([CanvasRenderer, HeatmapChart, GridComponent, TooltipComponent, TitleComponent, VisualMapComponent])

const hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a', '7a', '8a', '9a', '10a', '11a']
const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

const data: number[][] = []
for (let i = 0; i < 7; i++) {
  for (let j = 0; j < 12; j++) {
    data.push([j, i, Math.round(Math.random() * 10)])
  }
}

const option = ref({
  title: { text: '热力图' },
  tooltip: { position: 'top' },
  grid: { height: '50%', top: '10%' },
  xAxis: { type: 'category', data: hours, splitArea: { show: true } },
  yAxis: { type: 'category', data: days, splitArea: { show: true } },
  visualMap: { min: 0, max: 10, calculable: true, orient: 'horizontal', left: 'center', bottom: '15%' },
  series: [
    {
      name: '活跃度',
      type: 'heatmap',
      data,
      label: { show: true },
      emphasis: { itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0, 0, 0, 0.5)' } },
    },
  ],
})

const code = `import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { HeatmapChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, TitleComponent, VisualMapComponent } from 'echarts/components'

use([CanvasRenderer, HeatmapChart, GridComponent, TooltipComponent, TitleComponent, VisualMapComponent])

const hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a', '7a', '8a', '9a', '10a', '11a']
const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

const data = []
for (let i = 0; i < 7; i++) {
  for (let j = 0; j < 12; j++) {
    data.push([j, i, Math.round(Math.random() * 10)])
  }
}

const option = ref({
  title: { text: '热力图' },
  tooltip: { position: 'top' },
  grid: { height: '50%', top: '10%' },
  xAxis: { type: 'category', data: hours, splitArea: { show: true } },
  yAxis: { type: 'category', data: days, splitArea: { show: true } },
  visualMap: { min: 0, max: 10, calculable: true, orient: 'horizontal', left: 'center', bottom: '15%' },
  series: [
    {
      name: '活跃度',
      type: 'heatmap',
      data,
      label: { show: true },
    },
  ],
})

// Template:
// <VChart :option="option" style="height: 400px" autoresize />`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">热力图</h2>
    <CodePreview title="热力图" description="使用 ECharts 绘制的热力图，通过颜色深浅展示数据密度" :code="code">
      <VChart :option="option" style="height: 400px" autoresize />
    </CodePreview>
  </div>
</template>
