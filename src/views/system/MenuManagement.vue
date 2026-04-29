<script setup lang="ts">
/**
 * 菜单管理页面
 * NDataTable 树形表格展示菜单层级：ID、菜单名称、图标、路径、排序、状态、操作
 */
import { h } from 'vue'
import { useI18n } from 'vue-i18n'
import { NDataTable, NButton, NSpace, NTag } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const { t } = useI18n()

interface MenuRow {
  key: number
  id: number
  name: string
  icon: string
  path: string
  sort: number
  status: '启用' | '禁用'
  type: '目录' | '菜单' | '按钮'
  children?: MenuRow[]
}

const columns: DataTableColumns<MenuRow> = [
  { title: 'ID', key: 'id', width: 60 },
  {
    title: '菜单名称',
    key: 'name',
    width: 200,
  },
  { title: '图标', key: 'icon', width: 60 },
  {
    title: '路径',
    key: 'path',
    width: 220,
    render(row) {
      return row.path ? h(NTag, { type: 'info', size: 'small', bordered: false }, { default: () => row.path }) : '—'
    },
  },
  {
    title: '类型',
    key: 'type',
    width: 80,
    render(row) {
      const typeMap: Record<string, 'warning' | 'success' | 'info'> = { '目录': 'warning', '菜单': 'success', '按钮': 'info' }
      return h(NTag, { type: typeMap[row.type] || 'default', size: 'small' }, { default: () => row.type })
    },
  },
  { title: '排序', key: 'sort', width: 60 },
  {
    title: '状态',
    key: 'status',
    width: 80,
    render(row) {
      return h(NTag, { type: row.status === '启用' ? 'success' : 'error', size: 'small' }, { default: () => row.status })
    },
  },
  {
    title: '操作',
    key: 'actions',
    width: 180,
    render() {
      return h(NSpace, { size: 4 }, {
        default: () => [
          h(NButton, { size: 'small', type: 'primary', quaternary: true }, { default: () => t('common.edit') }),
          h(NButton, { size: 'small', type: 'success', quaternary: true }, { default: () => '添加子菜单' }),
          h(NButton, { size: 'small', type: 'error', quaternary: true }, { default: () => t('common.delete') }),
        ],
      })
    },
  },
]

const data: MenuRow[] = [
  {
    key: 1, id: 1, name: '仪表盘', icon: '📊', path: '/dashboard', sort: 1, status: '启用', type: '目录',
    children: [
      { key: 11, id: 11, name: '工作台', icon: '🏠', path: '/dashboard/workspace', sort: 1, status: '启用', type: '菜单' },
      { key: 12, id: 12, name: '数据分析', icon: '📈', path: '/dashboard/analytics', sort: 2, status: '启用', type: '菜单' },
    ],
  },
  {
    key: 2, id: 2, name: '系统管理', icon: '⚙️', path: '/system', sort: 2, status: '启用', type: '目录',
    children: [
      { key: 21, id: 21, name: '用户管理', icon: '👤', path: '/system/user', sort: 1, status: '启用', type: '菜单' },
      { key: 22, id: 22, name: '角色管理', icon: '🎭', path: '/system/role', sort: 2, status: '启用', type: '菜单' },
      { key: 23, id: 23, name: '菜单管理', icon: '📋', path: '/system/menu', sort: 3, status: '启用', type: '菜单' },
      { key: 24, id: 24, name: '部门管理', icon: '🏢', path: '/system/department', sort: 4, status: '启用', type: '菜单' },
    ],
  },
  {
    key: 3, id: 3, name: '内容管理', icon: '📝', path: '/content', sort: 3, status: '启用', type: '目录',
    children: [
      { key: 31, id: 31, name: '文章管理', icon: '📰', path: '/content/article', sort: 1, status: '启用', type: '菜单' },
      { key: 32, id: 32, name: '分类管理', icon: '📂', path: '/content/category', sort: 2, status: '启用', type: '菜单' },
      { key: 33, id: 33, name: '标签管理', icon: '🏷️', path: '/content/tag', sort: 3, status: '启用', type: '菜单' },
    ],
  },
  {
    key: 4, id: 4, name: '图表', icon: '📈', path: '/charts', sort: 4, status: '启用', type: '目录',
    children: [
      { key: 41, id: 41, name: '折线图', icon: '📉', path: '/charts/line', sort: 1, status: '启用', type: '菜单' },
      { key: 42, id: 42, name: '柱状图', icon: '📊', path: '/charts/bar', sort: 2, status: '启用', type: '菜单' },
      { key: 43, id: 43, name: '饼图', icon: '🥧', path: '/charts/pie', sort: 3, status: '启用', type: '菜单' },
      { key: 44, id: 44, name: '雷达图', icon: '🎯', path: '/charts/radar', sort: 4, status: '启用', type: '菜单' },
    ],
  },
  {
    key: 5, id: 5, name: '组件示例', icon: '🧩', path: '/components', sort: 5, status: '启用', type: '目录',
    children: [
      { key: 51, id: 51, name: '富文本编辑器', icon: '✏️', path: '/components/editor', sort: 1, status: '启用', type: '菜单' },
      { key: 52, id: 52, name: '拖拽列表', icon: '↕️', path: '/components/drag', sort: 2, status: '启用', type: '菜单' },
      { key: 53, id: 53, name: '图标展示', icon: '🎨', path: '/components/icons', sort: 3, status: '启用', type: '菜单' },
    ],
  },
  {
    key: 6, id: 6, name: '功能示例', icon: '🔧', path: '/features', sort: 6, status: '启用', type: '目录',
    children: [
      { key: 61, id: 61, name: '国际化', icon: '🌐', path: '/features/i18n', sort: 1, status: '启用', type: '菜单' },
      { key: 62, id: 62, name: '剪贴板', icon: '📋', path: '/features/clipboard', sort: 2, status: '启用', type: '菜单' },
      { key: 63, id: 63, name: '打印', icon: '🖨️', path: '/features/print', sort: 3, status: '启用', type: '菜单' },
    ],
  },
  { key: 7, id: 7, name: '权限管理', icon: '🔐', path: '/permission-management', sort: 7, status: '启用', type: '菜单' },
  { key: 8, id: 8, name: '关于', icon: '📄', path: '/about', sort: 8, status: '启用', type: '菜单' },
]

const code = `// 树形表格 - NDataTable with children
interface MenuRow {
  id: number; name: string; icon: string; path: string
  sort: number; status: string; type: string; children?: MenuRow[]
}

const columns: DataTableColumns<MenuRow> = [
  { title: 'ID', key: 'id' },
  { title: '菜单名称', key: 'name' },
  { title: '图标', key: 'icon' },
  { title: '路径', key: 'path', render(row) { return h(NTag, ...) } },
  { title: '类型', key: 'type', render(row) { return h(NTag, ...) } },
  { title: '状态', key: 'status', render(row) { return h(NTag, ...) } },
  { title: '操作', key: 'actions', render() { ... } },
]

<NDataTable :columns="columns" :data="data" :row-key="row => row.key"
  default-expand-all />`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">{{ t('menu.menuManagement') }}</h2>

    <CodePreview title="菜单树形表格" description="使用 NDataTable 树形结构展示系统菜单，支持展开/折叠" :code="code">
      <NSpace style="margin-bottom: 16px">
        <NButton type="primary">➕ {{ t('common.add') }}</NButton>
      </NSpace>
      <NDataTable
        :columns="columns"
        :data="data"
        :bordered="false"
        :row-key="(row: MenuRow) => row.key"
        default-expand-all
      />
    </CodePreview>
  </div>
</template>
