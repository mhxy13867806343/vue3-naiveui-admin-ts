<script setup lang="ts">
import { ref } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { ThemeRiverChart } from 'echarts/charts'
import { TooltipComponent, TitleComponent, SingleAxisComponent } from 'echarts/components'
import CodePreview from '@/components/common/CodePreview.vue'

use([CanvasRenderer, ThemeRiverChart, TooltipComponent, TitleComponent, SingleAxisComponent])

const option = ref({
  title: { text: '主题河流图', left: 'center' },
  tooltip: { trigger: 'axis' },
  singleAxis: { type: 'time', top: 50, bottom: 50 },
  series: [
    {
      type: 'themeRiver',
      emphasis: { itemStyle: { shadowBlur: 20, shadowColor: 'rgba(0, 0, 0, 0.8)' } },
      data: [
        ['2024/01/01', 10, 'DX'],
        ['2024/02/01', 15, 'DX'],
        ['2024/03/01', 35, 'DX'],
        ['2024/04/01', 38, 'DX'],
        ['2024/05/01', 22, 'DX'],
        ['2024/06/01', 16, 'DX'],
        ['2024/01/01', 35, 'SS'],
        ['2024/02/01', 36, 'SS'],
        ['2024/03/01', 26, 'SS'],
        ['2024/04/01', 15, 'SS'],
        ['2024/05/01', 40, 'SS'],
        ['2024/06/01', 42, 'SS'],
        ['2024/01/01', 21, 'QG'],
        ['2024/02/01', 25, 'QG'],
        ['2024/03/01', 30, 'QG'],
        ['2024/04/01', 42, 'QG'],
        ['2024/05/01', 32, 'QG'],
        ['2024/06/01', 20, 'QG'],
        ['2024/01/01', 8, 'SY'],
        ['2024/02/01', 12, 'SY'],
        ['2024/03/01', 18, 'SY'],
        ['2024/04/01', 25, 'SY'],
        ['2024/05/01', 28, 'SY'],
        ['2024/06/01', 35, 'SY'],
      ],
    },
  ],
})

const code = `import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { ThemeRiverChart } from 'echarts/charts'
import { TooltipComponent, TitleComponent, SingleAxisComponent } from 'echarts/components'

use([CanvasRenderer, ThemeRiverChart, TooltipComponent, TitleComponent, SingleAxisComponent])

const option = ref({
  title: { text: '主题河流图', left: 'center' },
  tooltip: { trigger: 'axis' },
  singleAxis: { type: 'time', top: 50, bottom: 50 },
  series: [
    {
      type: 'themeRiver',
      emphasis: { itemStyle: { shadowBlur: 20, shadowColor: 'rgba(0, 0, 0, 0.8)' } },
      data: [
        ['2024/01/01', 10, 'DX'],
        ['2024/02/01', 15, 'DX'],
        ['2024/03/01', 35, 'DX'],
        ['2024/01/01', 35, 'SS'],
        ['2024/02/01', 36, 'SS'],
        ['2024/03/01', 26, 'SS'],
      ],
    },
  ],
})

// Template:
// <VChart :option="option" style="height: 400px" autoresize />`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">主题河流图</h2>
    <CodePreview title="主题河流图" description="使用 ECharts 绘制的主题河流图，展示数据随时间的变化趋势" :code="code">
      <VChart :option="option" style="height: 400px" autoresize />
    </CodePreview>
  </div>
</template>
