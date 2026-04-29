<script setup lang="ts">
import { ref } from 'vue'
import { NCard, NGrid, NGridItem, NButton, NSpace } from 'naive-ui'
import { useRouter } from 'vue-router'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components'
import CodePreview from '@/components/common/CodePreview.vue'

use([CanvasRenderer, BarChart, GridComponent, TooltipComponent, LegendComponent, TitleComponent])

const router = useRouter()

const sampleOption = ref({
  title: { text: '月度销售数据' },
  tooltip: { trigger: 'axis' },
  xAxis: { type: 'category', data: ['1月', '2月', '3月', '4月', '5月', '6月'] },
  yAxis: { type: 'value' },
  series: [
    { name: '销售额', type: 'bar', data: [520, 680, 750, 890, 1100, 980], itemStyle: { color: '#18a058' } },
  ],
})

const chartLinks = [
  { name: '折线图', path: '/charts/line', emoji: '📈' },
  { name: '面积图', path: '/charts/area', emoji: '📊' },
  { name: '柱状图', path: '/charts/bar', emoji: '📊' },
  { name: '饼图', path: '/charts/pie', emoji: '🥧' },
  { name: '环形图', path: '/charts/doughnut', emoji: '🍩' },
  { name: '散点图', path: '/charts/scatter', emoji: '⚬' },
  { name: '雷达图', path: '/charts/radar', emoji: '🎯' },
  { name: '漏斗图', path: '/charts/funnel', emoji: '🔻' },
  { name: '仪表盘', path: '/charts/gauge', emoji: '⏱️' },
  { name: '热力图', path: '/charts/heatmap', emoji: '🌡️' },
  { name: '矩形树图', path: '/charts/treemap', emoji: '🟩' },
  { name: '旭日图', path: '/charts/sunburst', emoji: '☀️' },
  { name: '桑基图', path: '/charts/sankey', emoji: '🔀' },
  { name: 'K线图', path: '/charts/candlestick', emoji: '📉' },
  { name: '混合图', path: '/charts/mixed', emoji: '🔄' },
]

const introCode = `// 本项目使用 vue-echarts 集成 ECharts
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'

use([CanvasRenderer, BarChart, GridComponent, TooltipComponent])

const option = ref({
  xAxis: { type: 'category', data: ['1月', '2月', '3月'] },
  yAxis: { type: 'value' },
  series: [{ type: 'bar', data: [520, 680, 750] }],
})

// Template:
// <VChart :option="option" style="height: 400px" autoresize />`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">图表概览 Charts Overview</h2>

    <CodePreview title="ECharts 集成" description="本项目使用 vue-echarts 封装 ECharts，支持 25+ 种图表类型" :code="introCode">
      <VChart :option="sampleOption" style="height: 350px" autoresize />
    </CodePreview>

    <CodePreview title="图表导航" description="点击卡片跳转到对应的图表演示页面" :code="`router.push('/charts/line')`">
      <NGrid :cols="5" :x-gap="12" :y-gap="12">
        <NGridItem v-for="chart in chartLinks" :key="chart.path">
          <NCard size="small" hoverable style="cursor: pointer; text-align: center" @click="router.push(chart.path)">
            <div style="font-size: 28px">{{ chart.emoji }}</div>
            <div style="margin-top: 4px; font-size: 13px">{{ chart.name }}</div>
          </NCard>
        </NGridItem>
      </NGrid>
    </CodePreview>
  </div>
</template>
