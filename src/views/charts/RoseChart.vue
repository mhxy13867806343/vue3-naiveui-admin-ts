<script setup lang="ts">
import { ref } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components'
import CodePreview from '@/components/common/CodePreview.vue'

use([CanvasRenderer, PieChart, TooltipComponent, LegendComponent, TitleComponent])

const option = ref({
  title: { text: '南丁格尔玫瑰图', left: 'center' },
  tooltip: { trigger: 'item' },
  legend: { top: 'bottom' },
  series: [
    {
      name: '面积模式',
      type: 'pie',
      radius: [30, 150],
      center: ['50%', '50%'],
      roseType: 'area',
      itemStyle: { borderRadius: 8 },
      data: [
        { value: 40, name: 'rose 1' },
        { value: 38, name: 'rose 2' },
        { value: 32, name: 'rose 3' },
        { value: 30, name: 'rose 4' },
        { value: 28, name: 'rose 5' },
        { value: 26, name: 'rose 6' },
        { value: 22, name: 'rose 7' },
        { value: 18, name: 'rose 8' },
      ],
    },
  ],
})

const code = `import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components'

use([CanvasRenderer, PieChart, TooltipComponent, LegendComponent, TitleComponent])

const option = ref({
  title: { text: '南丁格尔玫瑰图', left: 'center' },
  tooltip: { trigger: 'item' },
  legend: { top: 'bottom' },
  series: [
    {
      name: '面积模式',
      type: 'pie',
      radius: [30, 150],
      center: ['50%', '50%'],
      roseType: 'area',
      itemStyle: { borderRadius: 8 },
      data: [
        { value: 40, name: 'rose 1' },
        { value: 38, name: 'rose 2' },
        { value: 32, name: 'rose 3' },
        { value: 30, name: 'rose 4' },
      ],
    },
  ],
})

// Template:
// <VChart :option="option" style="height: 400px" autoresize />`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">南丁格尔玫瑰图</h2>
    <CodePreview title="南丁格尔玫瑰图" description="使用 ECharts 绘制的玫瑰图，通过半径大小区分数据" :code="code">
      <VChart :option="option" style="height: 400px" autoresize />
    </CodePreview>
  </div>
</template>
