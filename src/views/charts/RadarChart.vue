<script setup lang="ts">
import { ref } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { RadarChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components'
import CodePreview from '@/components/common/CodePreview.vue'

use([CanvasRenderer, RadarChart, TooltipComponent, LegendComponent, TitleComponent])

const option = ref({
  title: { text: '雷达图' },
  tooltip: {},
  legend: { data: ['预算分配', '实际开销'] },
  radar: {
    indicator: [
      { name: '销售', max: 6500 },
      { name: '管理', max: 16000 },
      { name: '信息技术', max: 30000 },
      { name: '客服', max: 38000 },
      { name: '研发', max: 52000 },
      { name: '市场', max: 25000 },
    ],
  },
  series: [
    {
      type: 'radar',
      data: [
        { value: [4200, 3000, 20000, 35000, 50000, 18000], name: '预算分配' },
        { value: [5000, 14000, 28000, 26000, 42000, 21000], name: '实际开销' },
      ],
    },
  ],
})

const code = `import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { RadarChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components'

use([CanvasRenderer, RadarChart, TooltipComponent, LegendComponent, TitleComponent])

const option = ref({
  title: { text: '雷达图' },
  tooltip: {},
  legend: { data: ['预算分配', '实际开销'] },
  radar: {
    indicator: [
      { name: '销售', max: 6500 },
      { name: '管理', max: 16000 },
      { name: '信息技术', max: 30000 },
      { name: '客服', max: 38000 },
      { name: '研发', max: 52000 },
      { name: '市场', max: 25000 },
    ],
  },
  series: [
    {
      type: 'radar',
      data: [
        { value: [4200, 3000, 20000, 35000, 50000, 18000], name: '预算分配' },
        { value: [5000, 14000, 28000, 26000, 42000, 21000], name: '实际开销' },
      ],
    },
  ],
})

// Template:
// <VChart :option="option" style="height: 400px" autoresize />`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">雷达图</h2>
    <CodePreview title="雷达图" description="使用 ECharts 绘制的雷达图，适合多维度数据对比" :code="code">
      <VChart :option="option" style="height: 400px" autoresize />
    </CodePreview>
  </div>
</template>
