<script setup lang="ts">
import { ref } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { TreemapChart } from 'echarts/charts'
import { TooltipComponent, TitleComponent } from 'echarts/components'
import CodePreview from '@/components/common/CodePreview.vue'

use([CanvasRenderer, TreemapChart, TooltipComponent, TitleComponent])

const option = ref({
  title: { text: '矩形树图', left: 'center' },
  tooltip: { formatter: '{b}: {c}' },
  series: [
    {
      type: 'treemap',
      data: [
        {
          name: '技术部',
          value: 100,
          children: [
            { name: '前端', value: 40 },
            { name: '后端', value: 35 },
            { name: '测试', value: 15 },
            { name: '运维', value: 10 },
          ],
        },
        {
          name: '产品部',
          value: 60,
          children: [
            { name: '产品经理', value: 30 },
            { name: 'UI设计', value: 20 },
            { name: '用户研究', value: 10 },
          ],
        },
        {
          name: '市场部',
          value: 50,
          children: [
            { name: '品牌', value: 25 },
            { name: '渠道', value: 15 },
            { name: '活动', value: 10 },
          ],
        },
        { name: '行政部', value: 20 },
        { name: '财务部', value: 15 },
      ],
    },
  ],
})

const code = `import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { TreemapChart } from 'echarts/charts'
import { TooltipComponent, TitleComponent } from 'echarts/components'

use([CanvasRenderer, TreemapChart, TooltipComponent, TitleComponent])

const option = ref({
  title: { text: '矩形树图', left: 'center' },
  tooltip: { formatter: '{b}: {c}' },
  series: [
    {
      type: 'treemap',
      data: [
        {
          name: '技术部',
          value: 100,
          children: [
            { name: '前端', value: 40 },
            { name: '后端', value: 35 },
            { name: '测试', value: 15 },
          ],
        },
        {
          name: '产品部',
          value: 60,
          children: [
            { name: '产品经理', value: 30 },
            { name: 'UI设计', value: 20 },
          ],
        },
      ],
    },
  ],
})

// Template:
// <VChart :option="option" style="height: 400px" autoresize />`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">矩形树图</h2>
    <CodePreview title="矩形树图" description="使用 ECharts 绘制的矩形树图，通过面积大小展示层级数据" :code="code">
      <VChart :option="option" style="height: 400px" autoresize />
    </CodePreview>
  </div>
</template>
