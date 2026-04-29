<script setup lang="ts">
import { ref } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { ParallelChart } from 'echarts/charts'
import { ParallelComponent, TooltipComponent, TitleComponent } from 'echarts/components'
import CodePreview from '@/components/common/CodePreview.vue'

use([CanvasRenderer, ParallelChart, ParallelComponent, TooltipComponent, TitleComponent])

const option = ref({
  title: { text: '平行坐标图' },
  parallelAxis: [
    { dim: 0, name: '价格' },
    { dim: 1, name: '净含量' },
    { dim: 2, name: '评分' },
    { dim: 3, name: '销量' },
    { dim: 4, name: '好评率(%)' },
  ],
  series: [
    {
      type: 'parallel',
      lineStyle: { width: 2 },
      data: [
        [12.99, 100, 4.8, 2340, 96],
        [9.99, 80, 4.5, 5670, 92],
        [19.99, 200, 4.9, 1230, 98],
        [6.99, 50, 4.2, 8900, 88],
        [15.99, 150, 4.7, 3450, 95],
        [24.99, 300, 4.6, 890, 94],
        [8.49, 75, 4.3, 6780, 90],
        [11.99, 120, 4.4, 4560, 91],
      ],
    },
  ],
})

const code = `import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { ParallelChart } from 'echarts/charts'
import { ParallelComponent, TooltipComponent, TitleComponent } from 'echarts/components'

use([CanvasRenderer, ParallelChart, ParallelComponent, TooltipComponent, TitleComponent])

const option = ref({
  title: { text: '平行坐标图' },
  parallelAxis: [
    { dim: 0, name: '价格' },
    { dim: 1, name: '净含量' },
    { dim: 2, name: '评分' },
    { dim: 3, name: '销量' },
    { dim: 4, name: '好评率(%)' },
  ],
  series: [
    {
      type: 'parallel',
      lineStyle: { width: 2 },
      data: [
        [12.99, 100, 4.8, 2340, 96],
        [9.99, 80, 4.5, 5670, 92],
        [19.99, 200, 4.9, 1230, 98],
      ],
    },
  ],
})

// Template:
// <VChart :option="option" style="height: 400px" autoresize />`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">平行坐标图</h2>
    <CodePreview title="平行坐标图" description="使用 ECharts 绘制的平行坐标图，适合多维数据可视化分析" :code="code">
      <VChart :option="option" style="height: 400px" autoresize />
    </CodePreview>
  </div>
</template>
