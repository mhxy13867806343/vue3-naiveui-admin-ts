<script setup lang="ts">
import { ref } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { GraphChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components'
import CodePreview from '@/components/common/CodePreview.vue'

use([CanvasRenderer, GraphChart, TooltipComponent, LegendComponent, TitleComponent])

const option = ref({
  title: { text: '关系图' },
  tooltip: {},
  legend: { data: ['团队'] },
  animationDurationUpdate: 1500,
  animationEasingUpdate: 'quinticInOut' as const,
  series: [
    {
      name: '团队',
      type: 'graph',
      layout: 'force',
      force: { repulsion: 200, edgeLength: 120 },
      roam: true,
      label: { show: true },
      data: [
        { name: 'CEO', symbolSize: 60, category: 0 },
        { name: 'CTO', symbolSize: 50, category: 0 },
        { name: 'CFO', symbolSize: 50, category: 0 },
        { name: '前端组长', symbolSize: 40, category: 1 },
        { name: '后端组长', symbolSize: 40, category: 1 },
        { name: '前端A', symbolSize: 30, category: 2 },
        { name: '前端B', symbolSize: 30, category: 2 },
        { name: '后端A', symbolSize: 30, category: 2 },
        { name: '后端B', symbolSize: 30, category: 2 },
        { name: '财务A', symbolSize: 30, category: 3 },
      ],
      links: [
        { source: 'CEO', target: 'CTO' },
        { source: 'CEO', target: 'CFO' },
        { source: 'CTO', target: '前端组长' },
        { source: 'CTO', target: '后端组长' },
        { source: '前端组长', target: '前端A' },
        { source: '前端组长', target: '前端B' },
        { source: '后端组长', target: '后端A' },
        { source: '后端组长', target: '后端B' },
        { source: 'CFO', target: '财务A' },
      ],
      categories: [{ name: '高管' }, { name: '组长' }, { name: '开发' }, { name: '财务' }],
    },
  ],
})

const code = `import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { GraphChart } from 'echarts/charts'
import { TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components'

use([CanvasRenderer, GraphChart, TooltipComponent, LegendComponent, TitleComponent])

const option = ref({
  title: { text: '关系图' },
  tooltip: {},
  series: [
    {
      name: '团队',
      type: 'graph',
      layout: 'force',
      force: { repulsion: 200, edgeLength: 120 },
      roam: true,
      label: { show: true },
      data: [
        { name: 'CEO', symbolSize: 60, category: 0 },
        { name: 'CTO', symbolSize: 50, category: 0 },
        { name: '前端组长', symbolSize: 40, category: 1 },
        { name: '前端A', symbolSize: 30, category: 2 },
      ],
      links: [
        { source: 'CEO', target: 'CTO' },
        { source: 'CTO', target: '前端组长' },
        { source: '前端组长', target: '前端A' },
      ],
      categories: [{ name: '高管' }, { name: '组长' }, { name: '开发' }],
    },
  ],
})

// Template:
// <VChart :option="option" style="height: 400px" autoresize />`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">关系图</h2>
    <CodePreview title="关系图" description="使用 ECharts 绘制的力导向关系图，展示节点之间的关联关系" :code="code">
      <VChart :option="option" style="height: 400px" autoresize />
    </CodePreview>
  </div>
</template>
