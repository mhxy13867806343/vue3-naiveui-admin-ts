<script setup lang="ts">
/**
 * 标签管理页面
 * NDataTable：ID、标签名称、颜色、文章数、创建时间、操作
 */
import { h } from 'vue'
import { useI18n } from 'vue-i18n'
import { NDataTable, NButton, NSpace, NTag } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const { t } = useI18n()

interface TagRow {
  key: number
  id: number
  name: string
  color: string
  type: 'success' | 'info' | 'warning' | 'error' | 'default'
  articleCount: number
  createTime: string
}

const columns: DataTableColumns<TagRow> = [
  { title: 'ID', key: 'id', width: 60 },
  {
    title: '标签名称', key: 'name', width: 160,
    render(row) {
      return h(NTag, { type: row.type, round: true, size: 'small' }, { default: () => row.name })
    },
  },
  {
    title: '颜色', key: 'color', width: 100,
    render(row) {
      return h('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } }, [
        h('span', { style: { width: '14px', height: '14px', borderRadius: '50%', backgroundColor: row.color, display: 'inline-block' } }),
        h('span', {}, row.color),
      ])
    },
  },
  {
    title: '文章数', key: 'articleCount', width: 80,
    sorter: (a, b) => a.articleCount - b.articleCount,
  },
  { title: '创建时间', key: 'createTime', width: 120 },
  {
    title: '操作', key: 'actions', width: 150,
    render() {
      return h(NSpace, { size: 4 }, {
        default: () => [
          h(NButton, { size: 'small', type: 'primary', quaternary: true }, { default: () => t('common.edit') }),
          h(NButton, { size: 'small', type: 'error', quaternary: true }, { default: () => t('common.delete') }),
        ],
      })
    },
  },
]

const data: TagRow[] = [
  { key: 1, id: 1, name: 'Vue', type: 'success', color: '#18a058', articleCount: 28, createTime: '2024-01-01' },
  { key: 2, id: 2, name: 'React', type: 'info', color: '#2080f0', articleCount: 15, createTime: '2024-01-01' },
  { key: 3, id: 3, name: 'TypeScript', type: 'warning', color: '#f0a020', articleCount: 22, createTime: '2024-01-05' },
  { key: 4, id: 4, name: 'JavaScript', type: 'error', color: '#d03050', articleCount: 18, createTime: '2024-01-05' },
  { key: 5, id: 5, name: 'Node.js', type: 'success', color: '#18a058', articleCount: 12, createTime: '2024-01-10' },
  { key: 6, id: 6, name: 'Docker', type: 'info', color: '#2080f0', articleCount: 9, createTime: '2024-01-10' },
  { key: 7, id: 7, name: 'Kubernetes', type: 'warning', color: '#f0a020', articleCount: 7, createTime: '2024-01-15' },
  { key: 8, id: 8, name: 'MySQL', type: 'error', color: '#d03050', articleCount: 11, createTime: '2024-01-15' },
  { key: 9, id: 9, name: 'Redis', type: 'success', color: '#18a058', articleCount: 8, createTime: '2024-02-01' },
  { key: 10, id: 10, name: 'GraphQL', type: 'info', color: '#2080f0', articleCount: 5, createTime: '2024-02-01' },
  { key: 11, id: 11, name: 'Webpack', type: 'warning', color: '#f0a020', articleCount: 6, createTime: '2024-02-10' },
  { key: 12, id: 12, name: 'Vite', type: 'success', color: '#18a058', articleCount: 10, createTime: '2024-02-10' },
  { key: 13, id: 13, name: 'CSS', type: 'info', color: '#2080f0', articleCount: 14, createTime: '2024-02-15' },
  { key: 14, id: 14, name: 'Nginx', type: 'default', color: '#909399', articleCount: 4, createTime: '2024-03-01' },
  { key: 15, id: 15, name: 'Git', type: 'warning', color: '#f0a020', articleCount: 3, createTime: '2024-03-01' },
]

const code = `const columns: DataTableColumns<TagRow> = [
  { title: 'ID', key: 'id' },
  { title: '标签名称', key: 'name',
    render(row) { return h(NTag, { type: row.type, round: true }, { default: () => row.name }) }
  },
  { title: '颜色', key: 'color',
    render(row) { return h('div', ...) }  // color dot + hex
  },
  { title: '文章数', key: 'articleCount', sorter: ... },
  { title: '操作', key: 'actions', render() { ... } },
]

<NDataTable :columns="columns" :data="data" />`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">{{ t('menu.tagManagement') }}</h2>

    <CodePreview title="标签列表" description="使用 NDataTable 和 NTag 展示标签，支持颜色展示和排序" :code="code">
      <NSpace style="margin-bottom: 16px">
        <NButton type="primary">➕ {{ t('common.add') }}</NButton>
      </NSpace>
      <NDataTable :columns="columns" :data="data" :bordered="false" />
    </CodePreview>
  </div>
</template>
