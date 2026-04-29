<script setup lang="ts">
import { ref } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { FunnelChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components'
import CodePreview from '@/components/common/CodePreview.vue'

use([CanvasRenderer, FunnelChart, TooltipComponent, LegendComponent, TitleComponent])

const option = ref({
  title: { text: '漏斗图', left: 'center' },
  tooltip: { trigger: 'item', formatter: '{a} <br/>{b} : {c}%' },
  legend: { top: 'bottom', data: ['展现', '点击', '访问', '咨询', '订单'] },
  series: [
    {
      name: '转化漏斗',
      type: 'funnel',
      left: '10%',
      top: 60,
      bottom: 60,
      width: '80%',
      min: 0,
      max: 100,
      minSize: '0%',
      maxSize: '100%',
      sort: 'descending',
      gap: 2,
      label: { show: true, position: 'inside' },
      emphasis: { label: { fontSize: 20 } },
      data: [
        { value: 100, name: '展现' },
        { value: 80, name: '点击' },
        { value: 60, name: '访问' },
        { value: 40, name: '咨询' },
        { value: 20, name: '订单' },
      ],
    },
  ],
})

const code = `import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { FunnelChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components'

use([CanvasRenderer, FunnelChart, TooltipComponent, LegendComponent, TitleComponent])

const option = ref({
  title: { text: '漏斗图', left: 'center' },
  tooltip: { trigger: 'item', formatter: '{a} <br/>{b} : {c}%' },
  legend: { top: 'bottom', data: ['展现', '点击', '访问', '咨询', '订单'] },
  series: [
    {
      name: '转化漏斗',
      type: 'funnel',
      left: '10%',
      top: 60,
      bottom: 60,
      width: '80%',
      sort: 'descending',
      gap: 2,
      label: { show: true, position: 'inside' },
      data: [
        { value: 100, name: '展现' },
        { value: 80, name: '点击' },
        { value: 60, name: '访问' },
        { value: 40, name: '咨询' },
        { value: 20, name: '订单' },
      ],
    },
  ],
})

// Template:
// <VChart :option="option" style="height: 400px" autoresize />`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">漏斗图</h2>
    <CodePreview title="漏斗图" description="使用 ECharts 绘制的漏斗图，适合展示转化率数据" :code="code">
      <VChart :option="option" style="height: 400px" autoresize />
    </CodePreview>
  </div>
</template>
