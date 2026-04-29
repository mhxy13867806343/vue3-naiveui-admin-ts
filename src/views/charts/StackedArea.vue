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
  title: { text: '堆叠面积图' },
  tooltip: { trigger: 'axis', axisPointer: { type: 'cross', label: { backgroundColor: '#6a7985' } } },
  legend: { data: ['邮件', '联盟广告', '视频广告', '直接访问', '搜索引擎'] },
  xAxis: { type: 'category', boundaryGap: false, data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'] },
  yAxis: { type: 'value' },
  series: [
    { name: '邮件', type: 'line', stack: 'total', areaStyle: {}, data: [120, 132, 101, 134, 90, 230, 210] },
    { name: '联盟广告', type: 'line', stack: 'total', areaStyle: {}, data: [220, 182, 191, 234, 290, 330, 310] },
    { name: '视频广告', type: 'line', stack: 'total', areaStyle: {}, data: [150, 232, 201, 154, 190, 330, 410] },
    { name: '直接访问', type: 'line', stack: 'total', areaStyle: {}, data: [320, 332, 301, 334, 390, 330, 320] },
    { name: '搜索引擎', type: 'line', stack: 'total', areaStyle: {}, label: { show: true, position: 'top' }, data: [820, 932, 901, 934, 1290, 1330, 1320] },
  ],
})

const code = `import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components'

use([CanvasRenderer, LineChart, GridComponent, TooltipComponent, LegendComponent, TitleComponent])

const option = ref({
  title: { text: '堆叠面积图' },
  tooltip: { trigger: 'axis' },
  legend: { data: ['邮件', '联盟广告', '视频广告'] },
  xAxis: { type: 'category', boundaryGap: false, data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'] },
  yAxis: { type: 'value' },
  series: [
    { name: '邮件', type: 'line', stack: 'total', areaStyle: {}, data: [120, 132, 101, 134, 90, 230, 210] },
    { name: '联盟广告', type: 'line', stack: 'total', areaStyle: {}, data: [220, 182, 191, 234, 290, 330, 310] },
    { name: '视频广告', type: 'line', stack: 'total', areaStyle: {}, data: [150, 232, 201, 154, 190, 330, 410] },
  ],
})

// Template:
// <VChart :option="option" style="height: 400px" autoresize />`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">堆叠面积图</h2>
    <CodePreview title="堆叠面积图" description="使用 ECharts 绘制的堆叠面积图，通过 stack 属性实现数据堆叠" :code="code">
      <VChart :option="option" style="height: 400px" autoresize />
    </CodePreview>
  </div>
</template>
