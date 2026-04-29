<script setup lang="ts">
import { ref } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { GaugeChart } from 'echarts/charts'
import { TooltipComponent, TitleComponent } from 'echarts/components'
import CodePreview from '@/components/common/CodePreview.vue'

use([CanvasRenderer, GaugeChart, TooltipComponent, TitleComponent])

const option = ref({
  title: { text: '仪表盘图', left: 'center' },
  tooltip: { formatter: '{a} <br/>{b} : {c}%' },
  series: [
    {
      name: '业务指标',
      type: 'gauge',
      detail: { formatter: '{value}%', fontSize: 24 },
      data: [{ value: 72.5, name: '完成率' }],
      axisLine: {
        lineStyle: {
          width: 20,
          color: [
            [0.3, '#fd666d'],
            [0.7, '#37a2da'],
            [1, '#67e0e3'],
          ],
        },
      },
    },
  ],
})

const code = `import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { GaugeChart } from 'echarts/charts'
import { TooltipComponent, TitleComponent } from 'echarts/components'

use([CanvasRenderer, GaugeChart, TooltipComponent, TitleComponent])

const option = ref({
  title: { text: '仪表盘图', left: 'center' },
  tooltip: { formatter: '{a} <br/>{b} : {c}%' },
  series: [
    {
      name: '业务指标',
      type: 'gauge',
      detail: { formatter: '{value}%', fontSize: 24 },
      data: [{ value: 72.5, name: '完成率' }],
      axisLine: {
        lineStyle: {
          width: 20,
          color: [
            [0.3, '#fd666d'],
            [0.7, '#37a2da'],
            [1, '#67e0e3'],
          ],
        },
      },
    },
  ],
})

// Template:
// <VChart :option="option" style="height: 400px" autoresize />`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">仪表盘图</h2>
    <CodePreview title="仪表盘图" description="使用 ECharts 绘制的仪表盘图，适合展示完成率等指标" :code="code">
      <VChart :option="option" style="height: 400px" autoresize />
    </CodePreview>
  </div>
</template>
