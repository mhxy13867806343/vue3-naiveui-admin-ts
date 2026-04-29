<script setup lang="ts">
import { ref } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BoxplotChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, TitleComponent } from 'echarts/components'
import CodePreview from '@/components/common/CodePreview.vue'

use([CanvasRenderer, BoxplotChart, GridComponent, TooltipComponent, TitleComponent])

const option = ref({
  title: { text: '箱线图' },
  tooltip: { trigger: 'item', axisPointer: { type: 'shadow' } },
  xAxis: { type: 'category', data: ['实验A', '实验B', '实验C', '实验D', '实验E'] },
  yAxis: { type: 'value' },
  series: [
    {
      name: 'boxplot',
      type: 'boxplot',
      data: [
        [655, 850, 940, 980, 1175],
        [672, 780, 840, 930, 1070],
        [780, 840, 855, 880, 940],
        [620, 740, 810, 870, 1000],
        [700, 810, 865, 920, 1060],
      ],
    },
  ],
})

const code = `import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BoxplotChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, TitleComponent } from 'echarts/components'

use([CanvasRenderer, BoxplotChart, GridComponent, TooltipComponent, TitleComponent])

const option = ref({
  title: { text: '箱线图' },
  tooltip: { trigger: 'item', axisPointer: { type: 'shadow' } },
  xAxis: { type: 'category', data: ['实验A', '实验B', '实验C', '实验D', '实验E'] },
  yAxis: { type: 'value' },
  series: [
    {
      name: 'boxplot',
      type: 'boxplot',
      data: [
        [655, 850, 940, 980, 1175],
        [672, 780, 840, 930, 1070],
        [780, 840, 855, 880, 940],
        [620, 740, 810, 870, 1000],
        [700, 810, 865, 920, 1060],
      ],
    },
  ],
})

// Template:
// <VChart :option="option" style="height: 400px" autoresize />`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">箱线图</h2>
    <CodePreview title="箱线图" description="使用 ECharts 绘制的箱线图，展示数据分布的统计特征" :code="code">
      <VChart :option="option" style="height: 400px" autoresize />
    </CodePreview>
  </div>
</template>
