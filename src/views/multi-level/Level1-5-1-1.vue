<script setup lang="ts">
/**
 * 多级路由 1-5-1-1
 * DataTable 自定义渲染：行展开 / 多选 / 自定义单元格
 */
import { ref, h } from 'vue'
import {
  NCard, NDataTable, NSpace, NTag, NProgress, NAvatar,
  NBreadcrumb, NBreadcrumbItem, NDivider, NButton,
  type DataTableColumns, type DataTableRowKey, useMessage,
} from 'naive-ui'

interface Project {
  id: number
  name: string
  owner: string
  progress: number
  status: 'doing' | 'done' | 'pause'
  detail: string
}

const message = useMessage()

const data: Project[] = [
  { id: 1, name: '后台管理重构', owner: '张三', progress: 78, status: 'doing', detail: '已完成路由重构、菜单可配置化，正在做权限。' },
  { id: 2, name: '小程序上线', owner: '李四', progress: 100, status: 'done', detail: '已审核通过，于 2025-08 上线。' },
  { id: 3, name: '埋点接入', owner: '王五', progress: 35, status: 'pause', detail: '等待数据团队提供事件清单。' },
  { id: 4, name: '官网改版', owner: '赵六', progress: 60, status: 'doing', detail: 'UI 已交付，剩响应式适配。' },
]

const checkedRowKeys = ref<DataTableRowKey[]>([])

const statusMap = {
  doing: { type: 'info' as const, text: '进行中' },
  done: { type: 'success' as const, text: '已完成' },
  pause: { type: 'warning' as const, text: '暂停' },
}

const columns: DataTableColumns<Project> = [
  { type: 'selection' },
  { type: 'expand', renderExpand: (row) => h('div', { class: 'p-2 text-gray-600' }, row.detail) },
  { title: 'ID', key: 'id', width: 60 },
  { title: '项目', key: 'name' },
  {
    title: '负责人',
    key: 'owner',
    render: (row) =>
      h(NSpace, { align: 'center' }, {
        default: () => [
          h(NAvatar, { round: true, size: 'small' }, { default: () => row.owner[0] }),
          h('span', null, row.owner),
        ],
      }),
  },
  {
    title: '进度',
    key: 'progress',
    width: 220,
    render: (row) => h(NProgress, { type: 'line', percentage: row.progress, indicatorPlacement: 'inside' }),
  },
  {
    title: '状态',
    key: 'status',
    render: (row) =>
      h(NTag, { type: statusMap[row.status].type, bordered: false, size: 'small' }, {
        default: () => statusMap[row.status].text,
      }),
  },
]

function handleBatch() {
  if (!checkedRowKeys.value.length) {
    message.warning('请先选择行')
    return
  }
  message.success(`已对 ${checkedRowKeys.value.length} 行执行批量操作`)
}
</script>

<template>
  <div class="p-4">
    <NBreadcrumb>
      <NBreadcrumbItem>多级路由</NBreadcrumbItem>
      <NBreadcrumbItem>1-5</NBreadcrumbItem>
      <NBreadcrumbItem>1-5-1</NBreadcrumbItem>
      <NBreadcrumbItem>1-5-1-1</NBreadcrumbItem>
    </NBreadcrumb>
    <NDivider />
    <NCard title="1-5-1-1 · DataTable 自定义渲染（行展开 + 批量）" size="small">
      <template #header-extra>
        <NButton size="small" type="primary" @click="handleBatch">批量操作</NButton>
      </template>
      <NDataTable
        striped
        :columns="columns"
        :data="data"
        :row-key="(row: Project) => row.id"
        :checked-row-keys="checkedRowKeys"
        :bordered="false"
        @update:checked-row-keys="(keys) => (checkedRowKeys = keys)"
      />
    </NCard>
  </div>
</template>
