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
  title: { text: '环形图', left: 'center' },
  tooltip: { trigger: 'item' },
  legend: { top: 'bottom' },
  series: [
    {
      name: '浏览器占比',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
      label: { show: false, position: 'center' },
      emphasis: {
        label: { show: true, fontSize: 20, fontWeight: 'bold' },
      },
      labelLine: { show: false },
      data: [
        { value: 1048, name: 'Chrome' },
        { value: 735, name: 'Firefox' },
        { value: 580, name: 'Safari' },
        { value: 484, name: 'Edge' },
        { value: 300, name: 'Other' },
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
  title: { text: '环形图', left: 'center' },
  tooltip: { trigger: 'item' },
  legend: { top: 'bottom' },
  series: [
    {
      name: '浏览器占比',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
      label: { show: false, position: 'center' },
      emphasis: {
        label: { show: true, fontSize: 20, fontWeight: 'bold' },
      },
      labelLine: { show: false },
      data: [
        { value: 1048, name: 'Chrome' },
        { value: 735, name: 'Firefox' },
        { value: 580, name: 'Safari' },
        { value: 484, name: 'Edge' },
        { value: 300, name: 'Other' },
      ],
    },
  ],
})

// Template:
// <VChart :option="option" style="height: 400px" autoresize />`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">环形图</h2>
    <CodePreview title="环形图" description="使用 ECharts 绘制的环形图，通过设置内外半径实现中空效果" :code="code">
      <VChart :option="option" style="height: 400px" autoresize />
    </CodePreview>
  </div>
</template>
