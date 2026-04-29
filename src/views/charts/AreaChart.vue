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
  title: { text: '面积图' },
  tooltip: { trigger: 'axis' },
  legend: { data: ['邮件', '联盟广告'] },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  },
  yAxis: { type: 'value' },
  series: [
    { name: '邮件', type: 'line', areaStyle: {}, data: [120, 132, 101, 134, 90, 230, 210] },
    { name: '联盟广告', type: 'line', areaStyle: {}, data: [220, 182, 191, 234, 290, 330, 310] },
  ],
})

const code = `import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components'

use([CanvasRenderer, LineChart, GridComponent, TooltipComponent, LegendComponent, TitleComponent])

const option = ref({
  title: { text: '面积图' },
  tooltip: { trigger: 'axis' },
  legend: { data: ['邮件', '联盟广告'] },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  },
  yAxis: { type: 'value' },
  series: [
    { name: '邮件', type: 'line', areaStyle: {}, data: [120, 132, 101, 134, 90, 230, 210] },
    { name: '联盟广告', type: 'line', areaStyle: {}, data: [220, 182, 191, 234, 290, 330, 310] },
  ],
})

// Template:
// <VChart :option="option" style="height: 400px" autoresize />`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">面积图</h2>
    <CodePreview title="基础面积图" description="使用 ECharts 绘制的面积图，通过 areaStyle 属性填充区域" :code="code">
      <VChart :option="option" style="height: 400px" autoresize />
    </CodePreview>
  </div>
</template>
