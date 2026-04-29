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
  title: { text: '瀑布图' },
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' },
    formatter(params: any) {
      const tar = params[1] || params[0]
      return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value
    },
  },
  xAxis: {
    type: 'category',
    data: ['总收入', '房租', '水电', '交通', '餐饮', '娱乐', '其他', '结余'],
  },
  yAxis: { type: 'value' },
  series: [
    {
      name: '辅助',
      type: 'bar',
      stack: 'total',
      itemStyle: { borderColor: 'transparent', color: 'transparent' },
      emphasis: { itemStyle: { borderColor: 'transparent', color: 'transparent' } },
      data: [0, 7000, 5500, 5000, 3800, 3200, 2800, 0],
    },
    {
      name: '金额',
      type: 'bar',
      stack: 'total',
      label: { show: true, position: 'inside' },
      data: [10000, -3000, -1500, -500, -1200, -600, -400, 2800],
    },
  ],
})

const code = `import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components'

use([CanvasRenderer, BarChart, GridComponent, TooltipComponent, LegendComponent, TitleComponent])

const option = ref({
  title: { text: '瀑布图' },
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' },
  },
  xAxis: {
    type: 'category',
    data: ['总收入', '房租', '水电', '交通', '餐饮', '娱乐', '其他', '结余'],
  },
  yAxis: { type: 'value' },
  series: [
    {
      name: '辅助',
      type: 'bar',
      stack: 'total',
      itemStyle: { borderColor: 'transparent', color: 'transparent' },
      data: [0, 7000, 5500, 5000, 3800, 3200, 2800, 0],
    },
    {
      name: '金额',
      type: 'bar',
      stack: 'total',
      label: { show: true, position: 'inside' },
      data: [10000, -3000, -1500, -500, -1200, -600, -400, 2800],
    },
  ],
})

// Template:
// <VChart :option="option" style="height: 400px" autoresize />`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">瀑布图</h2>
    <CodePreview title="瀑布图" description="使用 ECharts 绘制的瀑布图，通过堆叠柱状图模拟瀑布效果" :code="code">
      <VChart :option="option" style="height: 400px" autoresize />
    </CodePreview>
  </div>
</template>
