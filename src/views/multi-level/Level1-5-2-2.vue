<script setup lang="ts">
/**
 * 多级路由 1-5-2-2
 * 综合 Dashboard：统计卡片 + 表格 + 抽屉编辑
 */
import { ref, h } from 'vue'
import {
  NCard, NGrid, NGridItem, NStatistic, NDataTable, NTag, NSpace, NButton,
  NDrawer, NDrawerContent, NForm, NFormItem, NInput, NInputNumber,
  NBreadcrumb, NBreadcrumbItem, NDivider, NProgress,
  type DataTableColumns, useMessage,
} from 'naive-ui'

interface Order {
  id: string
  customer: string
  amount: number
  status: 'pending' | 'paid' | 'shipped' | 'closed'
  createdAt: string
}

const message = useMessage()

const stats = ref([
  { label: '今日订单', value: 128, suffix: '单' },
  { label: '支付金额', value: 23856, prefix: '￥' },
  { label: '活跃用户', value: 4321, suffix: '人' },
  { label: '转化率', value: 18.6, suffix: '%' },
])

const overall = 72

const orders = ref<Order[]>([
  { id: 'NO-1001', customer: '张三', amount: 320, status: 'paid', createdAt: '10:12' },
  { id: 'NO-1002', customer: '李四', amount: 1280, status: 'pending', createdAt: '10:23' },
  { id: 'NO-1003', customer: '王五', amount: 99, status: 'shipped', createdAt: '11:05' },
  { id: 'NO-1004', customer: '赵六', amount: 540, status: 'closed', createdAt: '11:43' },
  { id: 'NO-1005', customer: '钱七', amount: 2380, status: 'paid', createdAt: '12:08' },
])

const statusMap = {
  pending: { type: 'warning' as const, text: '待支付' },
  paid: { type: 'info' as const, text: '已支付' },
  shipped: { type: 'success' as const, text: '已发货' },
  closed: { type: 'default' as const, text: '已关闭' },
}

const showDrawer = ref(false)
const editing = ref<Order | null>(null)
const draft = ref({ customer: '', amount: 0 })

function openEdit(row: Order) {
  editing.value = row
  draft.value = { customer: row.customer, amount: row.amount }
  showDrawer.value = true
}

function saveEdit() {
  if (!editing.value) return
  editing.value.customer = draft.value.customer
  editing.value.amount = draft.value.amount
  message.success(`已更新 ${editing.value.id}`)
  showDrawer.value = false
}

const columns: DataTableColumns<Order> = [
  { title: '订单号', key: 'id', width: 110 },
  { title: '客户', key: 'customer' },
  {
    title: '金额',
    key: 'amount',
    render: (row) => h('span', { class: 'font-mono' }, `￥ ${row.amount.toFixed(2)}`),
  },
  {
    title: '状态',
    key: 'status',
    render: (row) =>
      h(NTag, { type: statusMap[row.status].type, bordered: false, size: 'small' }, {
        default: () => statusMap[row.status].text,
      }),
  },
  { title: '时间', key: 'createdAt', width: 80 },
  {
    title: '操作',
    key: 'actions',
    width: 100,
    render: (row) =>
      h(NButton, { size: 'tiny', tertiary: true, type: 'primary', onClick: () => openEdit(row) }, {
        default: () => '编辑',
      }),
  },
]
</script>

<template>
  <div class="p-4">
    <NBreadcrumb>
      <NBreadcrumbItem>多级路由</NBreadcrumbItem>
      <NBreadcrumbItem>1-5</NBreadcrumbItem>
      <NBreadcrumbItem>1-5-2</NBreadcrumbItem>
      <NBreadcrumbItem>1-5-2-2</NBreadcrumbItem>
    </NBreadcrumb>
    <NDivider />
    <NSpace vertical size="large">
      <NGrid :cols="4" :x-gap="12" :y-gap="12" responsive="screen">
        <NGridItem v-for="s in stats" :key="s.label">
          <NCard size="small" hoverable>
            <NStatistic :label="s.label" :value="s.value">
              <template v-if="s.prefix" #prefix>{{ s.prefix }}</template>
              <template v-if="s.suffix" #suffix>{{ s.suffix }}</template>
            </NStatistic>
          </NCard>
        </NGridItem>
      </NGrid>

      <NCard title="目标完成度" size="small">
        <NProgress
          type="line"
          :percentage="overall"
          :height="14"
          indicator-placement="inside"
          processing
        />
      </NCard>

      <NCard title="1-5-2-2 · 今日订单" size="small">
        <NDataTable :columns="columns" :data="orders" :bordered="false" striped />
      </NCard>
    </NSpace>

    <NDrawer v-model:show="showDrawer" :width="380" placement="right">
      <NDrawerContent :title="`编辑 ${editing?.id ?? ''}`" closable>
        <NForm label-placement="left" label-width="80">
          <NFormItem label="客户">
            <NInput v-model:value="draft.customer" />
          </NFormItem>
          <NFormItem label="金额">
            <NInputNumber v-model:value="draft.amount" :min="0" :precision="2" />
          </NFormItem>
        </NForm>
        <template #footer>
          <NSpace>
            <NButton @click="showDrawer = false">取消</NButton>
            <NButton type="primary" @click="saveEdit">保存</NButton>
          </NSpace>
        </template>
      </NDrawerContent>
    </NDrawer>
  </div>
</template>
