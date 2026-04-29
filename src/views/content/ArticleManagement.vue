<script setup lang="ts">
/**
 * 文章管理页面
 * NDataTable：ID、标题、分类、标签、作者、状态、创建时间、操作
 */
import { h, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { NDataTable, NButton, NSpace, NTag, NInput, NPagination } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const { t } = useI18n()
const searchText = ref('')
const currentPage = ref(1)
const pageSize = ref(10)

interface ArticleRow {
  key: number
  id: number
  title: string
  author: string
  category: string
  status: '已发布' | '草稿' | '已下架'
  tags: string[]
  createTime: string
}

const columns: DataTableColumns<ArticleRow> = [
  { title: 'ID', key: 'id', width: 60 },
  { title: '标题', key: 'title', ellipsis: { tooltip: true } },
  { title: '作者', key: 'author', width: 100 },
  {
    title: '分类', key: 'category', width: 100,
    render(row) { return h(NTag, { type: 'info', size: 'small', bordered: false }, { default: () => row.category }) },
  },
  {
    title: '标签', key: 'tags', width: 200,
    render(row) {
      return h(NSpace, { size: 4 }, {
        default: () => row.tags.map(tag => h(NTag, { size: 'small', round: true }, { default: () => tag })),
      })
    },
  },
  {
    title: '状态', key: 'status', width: 90,
    render(row) {
      const map: Record<string, 'success' | 'warning' | 'error'> = { '已发布': 'success', '草稿': 'warning', '已下架': 'error' }
      return h(NTag, { type: map[row.status] || 'default', size: 'small' }, { default: () => row.status })
    },
  },
  { title: '创建时间', key: 'createTime', width: 120 },
  {
    title: '操作', key: 'actions', width: 180,
    render() {
      return h(NSpace, { size: 4 }, {
        default: () => [
          h(NButton, { size: 'small', type: 'primary', quaternary: true }, { default: () => t('common.edit') }),
          h(NButton, { size: 'small', type: 'info', quaternary: true }, { default: () => '预览' }),
          h(NButton, { size: 'small', type: 'error', quaternary: true }, { default: () => t('common.delete') }),
        ],
      })
    },
  },
]

const allData: ArticleRow[] = [
  { key: 1, id: 1, title: 'Vue 3 Composition API 完全指南', author: '张三', category: '前端', status: '已发布', tags: ['Vue', 'TypeScript'], createTime: '2024-01-15' },
  { key: 2, id: 2, title: 'Naive UI 组件库使用心得', author: '李四', category: '前端', status: '已发布', tags: ['Naive UI', 'Vue'], createTime: '2024-01-12' },
  { key: 3, id: 3, title: 'Node.js 性能优化实践', author: '王五', category: '后端', status: '草稿', tags: ['Node.js', '性能'], createTime: '2024-01-10' },
  { key: 4, id: 4, title: 'Docker 容器化部署指南', author: '赵六', category: '运维', status: '已发布', tags: ['Docker', 'DevOps'], createTime: '2024-01-08' },
  { key: 5, id: 5, title: 'TypeScript 高级类型技巧', author: '张三', category: '前端', status: '已发布', tags: ['TypeScript'], createTime: '2024-01-05' },
  { key: 6, id: 6, title: 'MySQL 索引优化详解', author: '孙七', category: '数据库', status: '已下架', tags: ['MySQL', '优化'], createTime: '2024-01-03' },
  { key: 7, id: 7, title: 'React vs Vue 全面对比', author: '李四', category: '前端', status: '草稿', tags: ['React', 'Vue'], createTime: '2024-01-01' },
  { key: 8, id: 8, title: 'Kubernetes 入门到实践', author: '王五', category: '运维', status: '已发布', tags: ['K8s', 'DevOps'], createTime: '2023-12-28' },
  { key: 9, id: 9, title: 'GraphQL API 设计最佳实践', author: '赵六', category: '后端', status: '已发布', tags: ['GraphQL', 'API'], createTime: '2023-12-25' },
  { key: 10, id: 10, title: 'CSS Grid 布局完全指南', author: '张三', category: '前端', status: '已发布', tags: ['CSS', '布局'], createTime: '2023-12-20' },
  { key: 11, id: 11, title: 'Redis 缓存策略与实战', author: '孙七', category: '数据库', status: '已发布', tags: ['Redis', '缓存'], createTime: '2023-12-15' },
  { key: 12, id: 12, title: 'Webpack 5 模块联邦详解', author: '李四', category: '前端', status: '草稿', tags: ['Webpack', '微前端'], createTime: '2023-12-10' },
  { key: 13, id: 13, title: 'Go 语言并发编程入门', author: '王五', category: '后端', status: '已发布', tags: ['Go', '并发'], createTime: '2023-12-05' },
  { key: 14, id: 14, title: 'Nginx 反向代理配置指南', author: '赵六', category: '运维', status: '已发布', tags: ['Nginx', '运维'], createTime: '2023-12-01' },
  { key: 15, id: 15, title: 'Pinia 状态管理实战', author: '张三', category: '前端', status: '已发布', tags: ['Pinia', 'Vue'], createTime: '2023-11-28' },
  { key: 16, id: 16, title: 'PostgreSQL 高级查询技巧', author: '孙七', category: '数据库', status: '已下架', tags: ['PostgreSQL', 'SQL'], createTime: '2023-11-25' },
  { key: 17, id: 17, title: 'Vite 构建工具深度解析', author: '李四', category: '前端', status: '已发布', tags: ['Vite', '构建'], createTime: '2023-11-20' },
]

const filteredData = ref(allData)

function handleSearch() {
  currentPage.value = 1
  if (!searchText.value) { filteredData.value = allData; return }
  filteredData.value = allData.filter(a => a.title.includes(searchText.value) || a.author.includes(searchText.value))
}

function handleReset() {
  searchText.value = ''
  currentPage.value = 1
  filteredData.value = allData
}

const pagedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredData.value.slice(start, start + pageSize.value)
})

const code = `const columns: DataTableColumns<ArticleRow> = [
  { title: 'ID', key: 'id' },
  { title: '标题', key: 'title' },
  { title: '作者', key: 'author' },
  { title: '分类', key: 'category', render(row) { return h(NTag, ...) } },
  { title: '标签', key: 'tags', render(row) { return h(NSpace, ...) } },
  { title: '状态', key: 'status', render(row) { return h(NTag, ...) } },
  { title: '操作', key: 'actions', render() { ... } },
]

<NDataTable :columns="columns" :data="pagedData" />
<NPagination v-model:page="currentPage" :item-count="filteredData.length" />`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">{{ t('menu.articleManagement') }}</h2>

    <CodePreview title="文章列表" description="使用 NDataTable 展示文章列表，支持搜索、分页和状态标签" :code="code">
      <NSpace style="margin-bottom: 16px" align="center">
        <NInput v-model:value="searchText" :placeholder="t('common.search')" clearable style="width: 250px" @clear="handleSearch" @keyup.enter="handleSearch" />
        <NButton type="primary" @click="handleSearch">🔍 {{ t('common.search') }}</NButton>
        <NButton @click="handleReset">{{ t('common.reset') }}</NButton>
        <NButton type="success">✏️ 写文章</NButton>
      </NSpace>
      <NDataTable :columns="columns" :data="pagedData" :bordered="false" />
      <div style="display: flex; justify-content: flex-end; margin-top: 16px">
        <NPagination
          v-model:page="currentPage"
          :page-size="pageSize"
          :item-count="filteredData.length"
          show-size-picker
          :page-sizes="[5, 10, 20]"
          @update:page-size="(size: number) => { pageSize = size; currentPage = 1 }"
        />
      </div>
    </CodePreview>
  </div>
</template>
