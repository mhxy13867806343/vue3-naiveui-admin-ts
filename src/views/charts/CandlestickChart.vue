<script setup lang="ts">
import { ref } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { CandlestickChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, TitleComponent } from 'echarts/components'
import CodePreview from '@/components/common/CodePreview.vue'

use([CanvasRenderer, CandlestickChart, GridComponent, TooltipComponent, TitleComponent])

const option = ref({
  title: { text: 'K线图' },
  tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
  xAxis: {
    type: 'category',
    data: ['2024/1/2', '2024/1/3', '2024/1/4', '2024/1/5', '2024/1/8', '2024/1/9', '2024/1/10', '2024/1/11', '2024/1/12', '2024/1/15'],
  },
  yAxis: { scale: true },
  series: [
    {
      type: 'candlestick',
      data: [
        [20, 34, 10, 38],
        [40, 35, 30, 50],
        [31, 38, 33, 44],
        [38, 15, 5, 42],
        [20, 34, 10, 38],
        [28, 36, 24, 45],
        [32, 42, 30, 48],
        [36, 30, 26, 40],
        [30, 38, 28, 42],
        [34, 44, 32, 50],
      ],
    },
  ],
})

const code = `import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { CandlestickChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, TitleComponent } from 'echarts/components'

use([CanvasRenderer, CandlestickChart, GridComponent, TooltipComponent, TitleComponent])

const option = ref({
  title: { text: 'K线图' },
  tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
  xAxis: {
    type: 'category',
    data: ['2024/1/2', '2024/1/3', '2024/1/4', '2024/1/5', '2024/1/8'],
  },
  yAxis: { scale: true },
  series: [
    {
      type: 'candlestick',
      data: [
        [20, 34, 10, 38],
        [40, 35, 30, 50],
        [31, 38, 33, 44],
        [38, 15, 5, 42],
        [20, 34, 10, 38],
      ],
    },
  ],
})

// Template:
// <VChart :option="option" style="height: 400px" autoresize />`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">K线图</h2>
    <CodePreview title="K线图" description="使用 ECharts 绘制的 K 线图（蜡烛图），适合展示股票等金融数据" :code="code">
      <VChart :option="option" style="height: 400px" autoresize />
    </CodePreview>
  </div>
</template>
