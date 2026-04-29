<script setup lang="ts">
/**
 * 分类管理页面
 * NDataTable：ID、分类名称、描述、文章数、排序、创建时间、操作
 */
import { h } from 'vue'
import { useI18n } from 'vue-i18n'
import { NDataTable, NButton, NSpace, NTag } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const { t } = useI18n()

interface CategoryRow {
  key: number
  id: number
  name: string
  description: string
  articleCount: number
  sort: number
  color: string
  createTime: string
}

const columns: DataTableColumns<CategoryRow> = [
  { title: 'ID', key: 'id', width: 60 },
  {
    title: '分类名称', key: 'name', width: 140,
    render(row) {
      return h(NTag, { color: { color: row.color, textColor: '#fff' }, size: 'small' }, { default: () => row.name })
    },
  },
  { title: '描述', key: 'description', ellipsis: { tooltip: true } },
  {
    title: '文章数', key: 'articleCount', width: 80,
    sorter: (a, b) => a.articleCount - b.articleCount,
  },
  { title: '排序', key: 'sort', width: 60 },
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

const data: CategoryRow[] = [
  { key: 1, id: 1, name: '前端', description: '前端开发相关技术文章，包括 Vue、React、CSS 等', articleCount: 42, sort: 1, color: '#18a058', createTime: '2024-01-01' },
  { key: 2, id: 2, name: '后端', description: '后端开发、API设计、微服务架构等', articleCount: 35, sort: 2, color: '#2080f0', createTime: '2024-01-01' },
  { key: 3, id: 3, name: '运维', description: 'DevOps、CI/CD、容器化、云原生', articleCount: 18, sort: 3, color: '#f0a020', createTime: '2024-01-05' },
  { key: 4, id: 4, name: '数据库', description: 'MySQL、PostgreSQL、Redis、MongoDB 等', articleCount: 15, sort: 4, color: '#d03050', createTime: '2024-01-05' },
  { key: 5, id: 5, name: '设计', description: 'UI/UX设计、交互设计、设计系统', articleCount: 12, sort: 5, color: '#8a2be2', createTime: '2024-01-10' },
  { key: 6, id: 6, name: '产品', description: '产品设计、需求分析、用户研究', articleCount: 8, sort: 6, color: '#ff6347', createTime: '2024-01-10' },
  { key: 7, id: 7, name: '测试', description: '自动化测试、性能测试、测试策略', articleCount: 10, sort: 7, color: '#20b2aa', createTime: '2024-01-15' },
  { key: 8, id: 8, name: '人工智能', description: '机器学习、深度学习、NLP、大模型', articleCount: 22, sort: 8, color: '#9370db', createTime: '2024-02-01' },
  { key: 9, id: 9, name: '移动端', description: 'iOS、Android、Flutter、React Native', articleCount: 14, sort: 9, color: '#3cb371', createTime: '2024-02-10' },
]

const code = `const columns: DataTableColumns<CategoryRow> = [
  { title: 'ID', key: 'id' },
  { title: '分类名称', key: 'name',
    render(row) {
      return h(NTag, { color: { color: row.color, textColor: '#fff' } },
        { default: () => row.name })
    }
  },
  { title: '描述', key: 'description' },
  { title: '文章数', key: 'articleCount', sorter: (a, b) => a.articleCount - b.articleCount },
  { title: '操作', key: 'actions', render() { ... } },
]

<NDataTable :columns="columns" :data="data" />`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">{{ t('menu.categoryManagement') }}</h2>

    <CodePreview title="分类列表" description="使用 NDataTable 和 NTag 展示文章分类，支持自定义颜色标签和排序" :code="code">
      <NSpace style="margin-bottom: 16px">
        <NButton type="primary">➕ {{ t('common.add') }}</NButton>
      </NSpace>
      <NDataTable :columns="columns" :data="data" :bordered="false" />
    </CodePreview>
  </div>
</template>
