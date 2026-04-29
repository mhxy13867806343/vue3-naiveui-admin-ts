<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import CodePreview from '@/components/common/CodePreview.vue'

const { t } = useI18n()

const code = `import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, LineChart, PieChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components'

// 注册需要的组件
use([CanvasRenderer, BarChart, LineChart, PieChart, GridComponent, TooltipComponent, LegendComponent, TitleComponent])

const option = ref({
  title: { text: '图表标题' },
  tooltip: { trigger: 'axis' },
  xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed'] },
  yAxis: { type: 'value' },
  series: [{ type: 'bar', data: [120, 200, 150] }]
})

// Template:
// <VChart :option="option" style="height: 400px" autoresize />`
</script>

<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">{{ t('menu.chartsDemo') }}</h2>
    <CodePreview title="ECharts 图表示例" description="使用 vue-echarts 集成 ECharts 图表库，支持多种图表类型" :code="code">
      <p class="text-gray-500">页面开发中...请查看左侧菜单中的各类图表示例。</p>
    </CodePreview>
  </div>
</template>
