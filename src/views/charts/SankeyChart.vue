<script setup lang="ts">
import { ref } from 'vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { SankeyChart } from 'echarts/charts'
import { TooltipComponent, TitleComponent } from 'echarts/components'
import CodePreview from '@/components/common/CodePreview.vue'

use([CanvasRenderer, SankeyChart, TooltipComponent, TitleComponent])

const option = ref({
  title: { text: '桑基图' },
  tooltip: { trigger: 'item', triggerOn: 'mousemove' },
  series: [
    {
      type: 'sankey',
      emphasis: { focus: 'adjacency' },
      data: [
        { name: '首页' },
        { name: '搜索页' },
        { name: '商品列表' },
        { name: '商品详情' },
        { name: '购物车' },
        { name: '结算页' },
        { name: '支付成功' },
        { name: '离开' },
      ],
      links: [
        { source: '首页', target: '搜索页', value: 50 },
        { source: '首页', target: '商品列表', value: 80 },
        { source: '首页', target: '离开', value: 20 },
        { source: '搜索页', target: '商品列表', value: 40 },
        { source: '搜索页', target: '离开', value: 10 },
        { source: '商品列表', target: '商品详情', value: 90 },
        { source: '商品列表', target: '离开', value: 30 },
        { source: '商品详情', target: '购物车', value: 60 },
        { source: '商品详情', target: '离开', value: 30 },
        { source: '购物车', target: '结算页', value: 45 },
        { source: '购物车', target: '离开', value: 15 },
        { source: '结算页', target: '支付成功', value: 35 },
        { source: '结算页', target: '离开', value: 10 },
      ],
    },
  ],
})

const code = `import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { SankeyChart } from 'echarts/charts'
import { TooltipComponent, TitleComponent } from 'echarts/components'

use([CanvasRenderer, SankeyChart, TooltipComponent, TitleComponent])

const option = ref({
  title: { text: '桑基图' },
  tooltip: { trigger: 'item', triggerOn: 'mousemove' },
  series: [
    {
      type: 'sankey',
      emphasis: { focus: 'adjacency' },
      data: [
        { name: '首页' },
        { name: '搜索页' },
        { name: '商品列表' },
        { name: '商品详情' },
        { name: '购物车' },
      ],
      links: [
        { source: '首页', target: '搜索页', value: 50 },
        { source: '首页', target: '商品列表', value: 80 },
        { source: '搜索页', target: '商品列表', value: 40 },
        { source: '商品列表', target: '商品详情', value: 90 },
        { source: '商品详情', target: '购物车', value: 60 },
      ],
    },
  ],
})

// Template:
// <VChart :option="option" style="height: 400px" autoresize />`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">桑基图</h2>
    <CodePreview title="桑基图" description="使用 ECharts 绘制的桑基图，展示数据流向和转化关系" :code="code">
      <VChart :option="option" style="height: 400px" autoresize />
    </CodePreview>
  </div>
</template>
