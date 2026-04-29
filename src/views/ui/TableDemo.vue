<script setup lang="ts">
import { h, ref } from 'vue'
import { NDataTable, NTag, NButton, NSpace } from 'naive-ui'
import type { DataTableColumns, DataTableRowKey } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

interface Row { key: number; name: string; age: number; city: string; status: string }

const basicColumns: DataTableColumns<Row> = [
  { title: '姓名', key: 'name' },
  { title: '年龄', key: 'age', sorter: (a, b) => a.age - b.age },
  { title: '城市', key: 'city', filterOptions: [{ label: '北京', value: '北京' }, { label: '上海', value: '上海' }, { label: '深圳', value: '深圳' }], filter: (value, row) => row.city === value },
  { title: '状态', key: 'status', render(row) { return h(NTag, { type: row.status === '在职' ? 'success' : 'error', size: 'small' }, { default: () => row.status }) } },
]

const data: Row[] = [
  { key: 1, name: '张三', age: 28, city: '北京', status: '在职' },
  { key: 2, name: '李四', age: 32, city: '上海', status: '在职' },
  { key: 3, name: '王五', age: 25, city: '深圳', status: '离职' },
  { key: 4, name: '赵六', age: 35, city: '北京', status: '在职' },
  { key: 5, name: '孙七', age: 29, city: '上海', status: '在职' },
  { key: 6, name: '周八', age: 31, city: '深圳', status: '离职' },
  { key: 7, name: '吴九', age: 27, city: '北京', status: '在职' },
  { key: 8, name: '郑十', age: 33, city: '上海', status: '在职' },
]

const checkedRowKeys = ref<DataTableRowKey[]>([])

const selectionColumns: DataTableColumns<Row> = [
  { type: 'selection' },
  ...basicColumns,
]

const basicCode = `const columns = [
  { title: '姓名', key: 'name' },
  { title: '年龄', key: 'age', sorter: (a, b) => a.age - b.age },
  { title: '城市', key: 'city',
    filterOptions: [{ label: '北京', value: '北京' }],
    filter: (value, row) => row.city === value
  },
  { title: '状态', key: 'status',
    render(row) { return h(NTag, { type: row.status === '在职' ? 'success' : 'error' }, ...) }
  },
]

<NDataTable :columns="columns" :data="data" :pagination="{ pageSize: 5 }" />`

const selectionCode = `const columns = [
  { type: 'selection' },
  ...basicColumns,
]

const checkedRowKeys = ref([])

<NDataTable
  :columns="columns"
  :data="data"
  :row-key="row => row.key"
  v-model:checked-row-keys="checkedRowKeys"
/>`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Table 表格</h2>

    <CodePreview title="基础表格" description="支持排序、筛选和分页的数据表格" :code="basicCode">
      <NDataTable :columns="basicColumns" :data="data" :pagination="{ pageSize: 5 }" :bordered="false" />
    </CodePreview>

    <CodePreview title="可选择" description="通过 type: 'selection' 列启用行选择" :code="selectionCode">
      <p v-if="checkedRowKeys.length" style="margin-bottom: 8px; color: #666">已选择 {{ checkedRowKeys.length }} 项</p>
      <NDataTable
        :columns="selectionColumns"
        :data="data"
        :row-key="(row: Row) => row.key"
        v-model:checked-row-keys="checkedRowKeys"
        :pagination="{ pageSize: 5 }"
        :bordered="false"
      />
    </CodePreview>
  </div>
</template>
