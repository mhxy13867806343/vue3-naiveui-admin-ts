<script setup lang="ts">
import { ref } from 'vue'
import { NGrid, NGridItem, NStatistic, NCard, NDataTable } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, PieChart } from 'echarts/charts'
import { GridComponent, TooltipComponent, LegendComponent, TitleComponent } from 'echarts/components'
import CodePreview from '@/components/common/CodePreview.vue'

use([CanvasRenderer, LineChart, PieChart, GridComponent, TooltipComponent, LegendComponent, TitleComponent])

const lineOption = ref({
  title: { text: '访问趋势' },
  tooltip: { trigger: 'axis' },
  legend: { data: ['页面浏览', '独立访客'] },
  xAxis: { type: 'category', data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'] },
  yAxis: { type: 'value' },
  series: [
    { name: '页面浏览', type: 'line', data: [1200, 1400, 1100, 1500, 1800, 2200, 1900], smooth: true, areaStyle: { opacity: 0.3 } },
    { name: '独立访客', type: 'line', data: [800, 900, 750, 1000, 1200, 1500, 1300], smooth: true, areaStyle: { opacity: 0.3 } },
  ],
})

const pieOption = ref({
  title: { text: '流量来源分布' },
  tooltip: { trigger: 'item' },
  legend: { orient: 'vertical', left: 'left' },
  series: [{
    name: '来源',
    type: 'pie',
    radius: '60%',
    data: [
      { value: 1048, name: '搜索引擎' },
      { value: 735, name: '直接访问' },
      { value: 580, name: '邮件营销' },
      { value: 484, name: '联盟广告' },
      { value: 300, name: '社交媒体' },
    ],
  }],
})

interface TableRow { key: number; page: string; pv: number; uv: number; bounce: string; duration: string }
const tableColumns: DataTableColumns<TableRow> = [
  { title: '页面', key: 'page' },
  { title: '浏览量(PV)', key: 'pv', sorter: (a, b) => a.pv - b.pv },
  { title: '访客数(UV)', key: 'uv', sorter: (a, b) => a.uv - b.uv },
  { title: '跳出率', key: 'bounce' },
  { title: '平均停留', key: 'duration' },
]
const tableData: TableRow[] = [
  { key: 1, page: '/dashboard', pv: 5200, uv: 3100, bounce: '32%', duration: '3m 20s' },
  { key: 2, page: '/user/list', pv: 3800, uv: 2400, bounce: '28%', duration: '4m 10s' },
  { key: 3, page: '/content/article', pv: 2900, uv: 1800, bounce: '45%', duration: '2m 50s' },
  { key: 4, page: '/system/settings', pv: 1500, uv: 900, bounce: '55%', duration: '1m 30s' },
  { key: 5, page: '/charts/line', pv: 2100, uv: 1400, bounce: '38%', duration: '5m 00s' },
]

const statsCode = `<NGrid :cols="4" :x-gap="16">
  <NGridItem>
    <NCard>
      <NStatistic label="总访问量" :value="128560" />
    </NCard>
  </NGridItem>
</NGrid>`

const chartCode = `import VChart from 'vue-echarts'
// <VChart :option="lineOption" style="height: 400px" autoresize />`

const tableCode = `<NDataTable :columns="columns" :data="data" :pagination="{ pageSize: 5 }" />`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">数据分析 Analytics</h2>

    <CodePreview title="统计卡片" description="使用 NStatistic 和 NGrid 展示关键指标" :code="statsCode">
      <NGrid :cols="4" :x-gap="16" :y-gap="16">
        <NGridItem>
          <NCard><NStatistic label="总访问量" :value="128560"><template #prefix>👁️</template></NStatistic></NCard>
        </NGridItem>
        <NGridItem>
          <NCard><NStatistic label="新增用户" :value="1280"><template #prefix>👤</template></NStatistic></NCard>
        </NGridItem>
        <NGridItem>
          <NCard><NStatistic label="订单总数" :value="3460"><template #prefix>📦</template></NStatistic></NCard>
        </NGridItem>
        <NGridItem>
          <NCard><NStatistic label="总收入" :value="86400"><template #prefix>💰</template><template #suffix>元</template></NStatistic></NCard>
        </NGridItem>
      </NGrid>
    </CodePreview>

    <NGrid :cols="2" :x-gap="16" :y-gap="16">
      <NGridItem>
        <CodePreview title="访问趋势" description="使用 ECharts 折线图展示一周访问趋势" :code="chartCode">
          <VChart :option="lineOption" style="height: 350px" autoresize />
        </CodePreview>
      </NGridItem>
      <NGridItem>
        <CodePreview title="流量来源" description="使用 ECharts 饼图展示流量来源分布" :code="chartCode">
          <VChart :option="pieOption" style="height: 350px" autoresize />
        </CodePreview>
      </NGridItem>
    </NGrid>

    <CodePreview title="页面数据表" description="使用 NDataTable 展示页面访问详情，支持排序" :code="tableCode">
      <NDataTable :columns="tableColumns" :data="tableData" :pagination="{ pageSize: 5 }" />
    </CodePreview>
  </div>
</template>
