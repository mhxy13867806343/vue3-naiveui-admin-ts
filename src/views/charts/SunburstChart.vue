<script setup lang="ts">
import { ref } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { SunburstChart } from 'echarts/charts'
import { TooltipComponent, TitleComponent } from 'echarts/components'
import CodePreview from '@/components/common/CodePreview.vue'

use([CanvasRenderer, SunburstChart, TooltipComponent, TitleComponent])

const option = ref({
  title: { text: '旭日图', left: 'center' },
  tooltip: { trigger: 'item' },
  series: [
    {
      type: 'sunburst',
      data: [
        {
          name: '前端',
          children: [
            { name: 'Vue', value: 40, children: [{ name: 'Vue 3', value: 25 }, { name: 'Vue 2', value: 15 }] },
            { name: 'React', value: 35, children: [{ name: 'Next.js', value: 20 }, { name: 'CRA', value: 15 }] },
            { name: 'Angular', value: 15 },
          ],
        },
        {
          name: '后端',
          children: [
            { name: 'Java', value: 30 },
            { name: 'Python', value: 25 },
            { name: 'Go', value: 20 },
            { name: 'Node.js', value: 15 },
          ],
        },
        {
          name: '数据库',
          children: [
            { name: 'MySQL', value: 25 },
            { name: 'PostgreSQL', value: 20 },
            { name: 'MongoDB', value: 15 },
          ],
        },
      ],
      radius: [0, '90%'],
      label: { rotate: 'radial' },
    },
  ],
})

const code = `import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { SunburstChart } from 'echarts/charts'
import { TooltipComponent, TitleComponent } from 'echarts/components'

use([CanvasRenderer, SunburstChart, TooltipComponent, TitleComponent])

const option = ref({
  title: { text: '旭日图', left: 'center' },
  tooltip: { trigger: 'item' },
  series: [
    {
      type: 'sunburst',
      data: [
        {
          name: '前端',
          children: [
            { name: 'Vue', value: 40 },
            { name: 'React', value: 35 },
            { name: 'Angular', value: 15 },
          ],
        },
        {
          name: '后端',
          children: [
            { name: 'Java', value: 30 },
            { name: 'Python', value: 25 },
          ],
        },
      ],
      radius: [0, '90%'],
      label: { rotate: 'radial' },
    },
  ],
})

// Template:
// <VChart :option="option" style="height: 400px" autoresize />`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">旭日图</h2>
    <CodePreview title="旭日图" description="使用 ECharts 绘制的旭日图，适合展示层级数据的占比关系" :code="code">
      <VChart :option="option" style="height: 400px" autoresize />
    </CodePreview>
  </div>
</template>
