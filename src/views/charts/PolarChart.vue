<script setup lang="ts">
import { ref } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import {
  PolarComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
} from 'echarts/components'
import CodePreview from '@/components/common/CodePreview.vue'

use([CanvasRenderer, BarChart, PolarComponent, TooltipComponent, LegendComponent, TitleComponent])

const option = ref({
  title: { text: '极坐标图' },
  tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
  legend: { data: ['A', 'B', 'C'], top: 'bottom' },
  polar: {},
  angleAxis: { type: 'category', data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'] },
  radiusAxis: {},
  series: [
    { type: 'bar', data: [1, 2, 3, 4, 3, 5, 1], coordinateSystem: 'polar', name: 'A', stack: 'a' },
    { type: 'bar', data: [2, 4, 6, 1, 3, 2, 1], coordinateSystem: 'polar', name: 'B', stack: 'a' },
    { type: 'bar', data: [1, 2, 3, 4, 1, 2, 5], coordinateSystem: 'polar', name: 'C', stack: 'a' },
  ],
})

const code = `import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import { PolarComponent, TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components'

use([CanvasRenderer, BarChart, PolarComponent, TooltipComponent, LegendComponent, TitleComponent])

const option = ref({
  title: { text: '极坐标图' },
  tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
  legend: { data: ['A', 'B', 'C'], top: 'bottom' },
  polar: {},
  angleAxis: { type: 'category', data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'] },
  radiusAxis: {},
  series: [
    { type: 'bar', data: [1, 2, 3, 4, 3, 5, 1], coordinateSystem: 'polar', name: 'A', stack: 'a' },
    { type: 'bar', data: [2, 4, 6, 1, 3, 2, 1], coordinateSystem: 'polar', name: 'B', stack: 'a' },
    { type: 'bar', data: [1, 2, 3, 4, 1, 2, 5], coordinateSystem: 'polar', name: 'C', stack: 'a' },
  ],
})

// Template:
// <VChart :option="option" style="height: 400px" autoresize />`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">极坐标图</h2>
    <CodePreview title="极坐标图" description="使用 ECharts 绘制的极坐标堆叠柱状图" :code="code">
      <VChart :option="option" style="height: 400px" autoresize />
    </CodePreview>
  </div>
</template>
