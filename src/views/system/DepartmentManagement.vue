<script setup lang="ts">
/**
 * 部门管理页面
 * NDataTable 树形表格：ID、部门名称、负责人、排序、状态、创建时间、操作
 */
import { h } from 'vue'
import { useI18n } from 'vue-i18n'
import { NDataTable, NButton, NSpace, NTag } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const { t } = useI18n()

interface DeptRow {
  key: number
  id: number
  name: string
  leader: string
  sort: number
  status: '启用' | '禁用'
  createTime: string
  children?: DeptRow[]
}

const columns: DataTableColumns<DeptRow> = [
  { title: 'ID', key: 'id', width: 60 },
  { title: '部门名称', key: 'name', width: 200 },
  { title: '负责人', key: 'leader', width: 100 },
  { title: '排序', key: 'sort', width: 60 },
  {
    title: '状态',
    key: 'status',
    width: 80,
    render(row) {
      return h(NTag, { type: row.status === '启用' ? 'success' : 'error', size: 'small' }, { default: () => row.status })
    },
  },
  { title: '创建时间', key: 'createTime', width: 120 },
  {
    title: '操作',
    key: 'actions',
    width: 200,
    render() {
      return h(NSpace, { size: 4 }, {
        default: () => [
          h(NButton, { size: 'small', type: 'primary', quaternary: true }, { default: () => t('common.edit') }),
          h(NButton, { size: 'small', type: 'success', quaternary: true }, { default: () => '添加子部门' }),
          h(NButton, { size: 'small', type: 'error', quaternary: true }, { default: () => t('common.delete') }),
        ],
      })
    },
  },
]

const data: DeptRow[] = [
  {
    key: 1, id: 1, name: '科技有限公司', leader: '陈总', sort: 1, status: '启用', createTime: '2023-01-01',
    children: [
      {
        key: 10, id: 10, name: '技术部', leader: '张工', sort: 1, status: '启用', createTime: '2023-01-01',
        children: [
          { key: 101, id: 101, name: '前端开发组', leader: '李明', sort: 1, status: '启用', createTime: '2023-02-01' },
          { key: 102, id: 102, name: '后端开发组', leader: '王强', sort: 2, status: '启用', createTime: '2023-02-01' },
          { key: 103, id: 103, name: '移动端开发组', leader: '赵磊', sort: 3, status: '启用', createTime: '2023-03-01' },
          { key: 104, id: 104, name: '测试组', leader: '孙丽', sort: 4, status: '启用', createTime: '2023-03-01' },
        ],
      },
      {
        key: 20, id: 20, name: '产品部', leader: '李经理', sort: 2, status: '启用', createTime: '2023-01-01',
        children: [
          { key: 201, id: 201, name: '产品经理组', leader: '周洋', sort: 1, status: '启用', createTime: '2023-02-01' },
          { key: 202, id: 202, name: 'UI设计组', leader: '吴芳', sort: 2, status: '启用', createTime: '2023-02-01' },
        ],
      },
      {
        key: 30, id: 30, name: '运维部', leader: '王工', sort: 3, status: '启用', createTime: '2023-01-01',
        children: [
          { key: 301, id: 301, name: 'DevOps组', leader: '郑凯', sort: 1, status: '启用', createTime: '2023-04-01' },
          { key: 302, id: 302, name: 'DBA组', leader: '冯涛', sort: 2, status: '启用', createTime: '2023-04-01' },
        ],
      },
      {
        key: 40, id: 40, name: '商务部', leader: '赵总', sort: 4, status: '启用', createTime: '2023-01-01',
        children: [
          { key: 401, id: 401, name: '销售组', leader: '钱进', sort: 1, status: '启用', createTime: '2023-02-01' },
          { key: 402, id: 402, name: '市场组', leader: '韩梅', sort: 2, status: '启用', createTime: '2023-02-01' },
        ],
      },
      {
        key: 50, id: 50, name: '人力资源部', leader: '孙主管', sort: 5, status: '启用', createTime: '2023-01-01',
        children: [
          { key: 501, id: 501, name: '招聘组', leader: '杨帆', sort: 1, status: '启用', createTime: '2023-03-01' },
          { key: 502, id: 502, name: '培训组', leader: '朱红', sort: 2, status: '禁用', createTime: '2023-03-01' },
        ],
      },
      { key: 60, id: 60, name: '财务部', leader: '刘会计', sort: 6, status: '启用', createTime: '2023-01-01' },
    ],
  },
]

const code = `// 树形表格 - NDataTable with children
interface DeptRow {
  id: number; name: string; leader: string; sort: number
  status: string; createTime: string; children?: DeptRow[]
}

const columns: DataTableColumns<DeptRow> = [
  { title: 'ID', key: 'id' },
  { title: '部门名称', key: 'name' },
  { title: '负责人', key: 'leader' },
  { title: '状态', key: 'status', render(row) { return h(NTag, ...) } },
  { title: '操作', key: 'actions', render() { ... } },
]

<NDataTable :columns="columns" :data="data" :row-key="row => row.key"
  default-expand-all />`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">{{ t('menu.departmentManagement') }}</h2>

    <CodePreview title="部门组织架构" description="使用 NDataTable 树形结构展示公司部门层级" :code="code">
      <NSpace style="margin-bottom: 16px">
        <NButton type="primary">➕ {{ t('common.add') }}</NButton>
      </NSpace>
      <NDataTable
        :columns="columns"
        :data="data"
        :bordered="false"
        :row-key="(row: DeptRow) => row.key"
        default-expand-all
      />
    </CodePreview>
  </div>
</template>
