<script setup lang="ts">
/**
 * 多级路由 1-4-2-1
 * DataTable 列表：分页 + 搜索 + 操作列
 */
import { ref, computed, h } from 'vue'
import {
  NCard, NDataTable, NInput, NSpace, NButton, NTag,
  NBreadcrumb, NBreadcrumbItem, NDivider,
  type DataTableColumns, useMessage,
} from 'naive-ui'

interface Row {
  id: number
  name: string
  email: string
  status: 'active' | 'inactive'
  createdAt: string
}

const message = useMessage()
const keyword = ref('')

const all: Row[] = Array.from({ length: 53 }).map((_, i) => ({
  id: i + 1,
  name: `用户${String(i + 1).padStart(2, '0')}`,
  email: `user${i + 1}@example.com`,
  status: i % 3 === 0 ? 'inactive' : 'active',
  createdAt: `2025-${String((i % 12) + 1).padStart(2, '0')}-15`,
}))

const filtered = computed(() => {
  const k = keyword.value.trim().toLowerCase()
  if (!k) return all
  return all.filter((r) => r.name.toLowerCase().includes(k) || r.email.toLowerCase().includes(k))
})

const pagination = ref({ page: 1, pageSize: 10, showSizePicker: true, pageSizes: [5, 10, 20] })

const columns: DataTableColumns<Row> = [
  { title: 'ID', key: 'id', width: 80 },
  { title: '姓名', key: 'name' },
  { title: '邮箱', key: 'email' },
  {
    title: '状态',
    key: 'status',
    render: (row) =>
      h(
        NTag,
        { type: row.status === 'active' ? 'success' : 'default', bordered: false, size: 'small' },
        { default: () => (row.status === 'active' ? '启用' : '禁用') },
      ),
  },
  { title: '创建日期', key: 'createdAt' },
  {
    title: '操作',
    key: 'actions',
    render: (row) =>
      h(
        NButton,
        {
          size: 'tiny',
          tertiary: true,
          onClick: () => message.info(`查看 ${row.name}`),
        },
        { default: () => '查看' },
      ),
  },
]
</script>

<template>
  <div class="p-4">
    <NBreadcrumb>
      <NBreadcrumbItem>多级路由</NBreadcrumbItem>
      <NBreadcrumbItem>1-4</NBreadcrumbItem>
      <NBreadcrumbItem>1-4-2</NBreadcrumbItem>
      <NBreadcrumbItem>1-4-2-1</NBreadcrumbItem>
    </NBreadcrumb>
    <NDivider />
    <NCard title="1-4-2-1 · DataTable 列表（搜索 + 分页）" size="small">
      <NSpace vertical>
        <NInput v-model:value="keyword" placeholder="搜索姓名或邮箱" clearable style="max-width: 280px" />
        <NDataTable
          :columns="columns"
          :data="filtered"
          :pagination="pagination"
          :bordered="false"
          striped
        />
      </NSpace>
    </NCard>
  </div>
</template>
