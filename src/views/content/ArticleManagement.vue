<script setup lang="ts">
/**
 * 文章管理页面
 * NDataTable：ID、标题、分类、标签、作者、状态、创建时间、操作
 */
import { h, ref, computed, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  NDataTable, NButton, NSpace, NTag, NInput, NPagination,
  NDrawer, NDrawerContent, NForm, NFormItem, NSelect, NModal,
  useMessage, useDialog,
} from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const { t } = useI18n()
const message = useMessage()
const dialog = useDialog()
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
  content: string
  createTime: string
}

const categoryOptions = [
  { label: '前端', value: '前端' },
  { label: '后端', value: '后端' },
  { label: '运维', value: '运维' },
  { label: '数据库', value: '数据库' },
  { label: '设计', value: '设计' },
]

const tagOptions = [
  { label: 'Vue', value: 'Vue' },
  { label: 'React', value: 'React' },
  { label: 'TypeScript', value: 'TypeScript' },
  { label: 'Node.js', value: 'Node.js' },
  { label: 'Docker', value: 'Docker' },
  { label: 'CSS', value: 'CSS' },
  { label: 'GraphQL', value: 'GraphQL' },
  { label: 'Webpack', value: 'Webpack' },
  { label: 'Vite', value: 'Vite' },
]

// Drawer state for Add/Edit
const showDrawer = ref(false)
const isEdit = ref(false)
const editingRow = ref<ArticleRow | null>(null)
const formModel = reactive({
  title: '',
  category: '前端',
  tags: [] as string[],
  content: '',
})

// Preview modal state
const showPreview = ref(false)
const previewArticle = ref<ArticleRow | null>(null)

function handleAdd() {
  isEdit.value = false
  editingRow.value = null
  formModel.title = ''
  formModel.category = '前端'
  formModel.tags = []
  formModel.content = ''
  showDrawer.value = true
}

function handleEdit(row: ArticleRow) {
  isEdit.value = true
  editingRow.value = row
  formModel.title = row.title
  formModel.category = row.category
  formModel.tags = [...row.tags]
  formModel.content = row.content || ''
  showDrawer.value = true
}

function handleSave() {
  if (!formModel.title) {
    message.error('请填写文章标题')
    return
  }
  if (isEdit.value && editingRow.value) {
    Object.assign(editingRow.value, {
      title: formModel.title,
      category: formModel.category,
      tags: [...formModel.tags],
      content: formModel.content,
    })
    message.success('编辑成功')
  } else {
    const newId = allData.length > 0 ? Math.max(...allData.map(d => d.id)) + 1 : 1
    allData.push({
      key: newId,
      id: newId,
      title: formModel.title,
      author: 'admin',
      category: formModel.category,
      status: '草稿',
      tags: [...formModel.tags],
      content: formModel.content,
      createTime: new Date().toISOString().slice(0, 10),
    })
    message.success('添加成功')
  }
  showDrawer.value = false
  handleSearch()
}

function handleDelete(row: ArticleRow) {
  dialog.warning({
    title: '确认删除',
    content: `确定要删除文章 "${row.title}" 吗？`,
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      const idx = allData.findIndex(d => d.id === row.id)
      if (idx !== -1) allData.splice(idx, 1)
      message.success('删除成功')
      handleSearch()
    },
  })
}

function handlePreview(row: ArticleRow) {
  previewArticle.value = row
  showPreview.value = true
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
    title: '操作', key: 'actions', width: 200,
    render(row) {
      return h(NSpace, { size: 4 }, {
        default: () => [
          h(NButton, { size: 'small', type: 'primary', quaternary: true, onClick: () => handleEdit(row) }, { default: () => t('common.edit') }),
          h(NButton, { size: 'small', type: 'info', quaternary: true, onClick: () => handlePreview(row) }, { default: () => '预览' }),
          h(NButton, { size: 'small', type: 'error', quaternary: true, onClick: () => handleDelete(row) }, { default: () => t('common.delete') }),
        ],
      })
    },
  },
]

const allData: ArticleRow[] = reactive([
  { key: 1, id: 1, title: 'Vue 3 Composition API 完全指南', author: '张三', category: '前端', status: '已发布', tags: ['Vue', 'TypeScript'], content: 'Vue 3 的 Composition API 是一种全新的组件逻辑组织方式...', createTime: '2024-01-15' },
  { key: 2, id: 2, title: 'Naive UI 组件库使用心得', author: '李四', category: '前端', status: '已发布', tags: ['Vue'], content: 'Naive UI 是一个 Vue 3 组件库，提供了丰富的组件...', createTime: '2024-01-12' },
  { key: 3, id: 3, title: 'Node.js 性能优化实践', author: '王五', category: '后端', status: '草稿', tags: ['Node.js'], content: 'Node.js 性能优化是后端开发中的重要课题...', createTime: '2024-01-10' },
  { key: 4, id: 4, title: 'Docker 容器化部署指南', author: '赵六', category: '运维', status: '已发布', tags: ['Docker'], content: 'Docker 容器化技术已经成为现代应用部署的标准...', createTime: '2024-01-08' },
  { key: 5, id: 5, title: 'TypeScript 高级类型技巧', author: '张三', category: '前端', status: '已发布', tags: ['TypeScript'], content: 'TypeScript 的类型系统非常强大...', createTime: '2024-01-05' },
  { key: 6, id: 6, title: 'MySQL 索引优化详解', author: '孙七', category: '数据库', status: '已下架', tags: ['MySQL'], content: 'MySQL 索引是提升查询性能的关键...', createTime: '2024-01-03' },
  { key: 7, id: 7, title: 'React vs Vue 全面对比', author: '李四', category: '前端', status: '草稿', tags: ['React', 'Vue'], content: 'React 和 Vue 是目前最流行的前端框架...', createTime: '2024-01-01' },
  { key: 8, id: 8, title: 'Kubernetes 入门到实践', author: '王五', category: '运维', status: '已发布', tags: ['Docker'], content: 'Kubernetes 是容器编排的事实标准...', createTime: '2023-12-28' },
  { key: 9, id: 9, title: 'GraphQL API 设计最佳实践', author: '赵六', category: '后端', status: '已发布', tags: ['GraphQL'], content: 'GraphQL 提供了一种更高效的 API 查询方式...', createTime: '2023-12-25' },
  { key: 10, id: 10, title: 'CSS Grid 布局完全指南', author: '张三', category: '前端', status: '已发布', tags: ['CSS'], content: 'CSS Grid 是一种强大的二维布局系统...', createTime: '2023-12-20' },
  { key: 11, id: 11, title: 'Redis 缓存策略与实战', author: '孙七', category: '数据库', status: '已发布', tags: ['Redis'], content: 'Redis 是最流行的内存数据库之一...', createTime: '2023-12-15' },
  { key: 12, id: 12, title: 'Webpack 5 模块联邦详解', author: '李四', category: '前端', status: '草稿', tags: ['Webpack'], content: 'Webpack 5 的模块联邦是微前端的重要实现方式...', createTime: '2023-12-10' },
  { key: 13, id: 13, title: 'Go 语言并发编程入门', author: '王五', category: '后端', status: '已发布', tags: ['Go'], content: 'Go 语言的并发模型基于 goroutine 和 channel...', createTime: '2023-12-05' },
  { key: 14, id: 14, title: 'Nginx 反向代理配置指南', author: '赵六', category: '运维', status: '已发布', tags: ['Nginx'], content: 'Nginx 是最流行的反向代理服务器...', createTime: '2023-12-01' },
  { key: 15, id: 15, title: 'Pinia 状态管理实战', author: '张三', category: '前端', status: '已发布', tags: ['Vue'], content: 'Pinia 是 Vue 3 推荐的状态管理库...', createTime: '2023-11-28' },
  { key: 16, id: 16, title: 'PostgreSQL 高级查询技巧', author: '孙七', category: '数据库', status: '已下架', tags: ['PostgreSQL'], content: 'PostgreSQL 提供了丰富的查询功能...', createTime: '2023-11-25' },
  { key: 17, id: 17, title: 'Vite 构建工具深度解析', author: '李四', category: '前端', status: '已发布', tags: ['Vite'], content: 'Vite 是新一代前端构建工具...', createTime: '2023-11-20' },
])

const filteredData = ref([...allData])

function handleSearch() {
  currentPage.value = 1
  if (!searchText.value) { filteredData.value = [...allData]; return }
  filteredData.value = allData.filter(a => a.title.includes(searchText.value) || a.author.includes(searchText.value))
}

function handleReset() {
  searchText.value = ''
  currentPage.value = 1
  filteredData.value = [...allData]
}

const pagedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredData.value.slice(start, start + pageSize.value)
})

const code = `const columns: DataTableColumns<ArticleRow> = [
  { title: 'ID', key: 'id' },
  { title: '标题', key: 'title' },
  { title: '操作', key: 'actions', render(row) {
    return h(NSpace, {}, {
      default: () => [
        h(NButton, { onClick: () => handleEdit(row) }, { default: () => '编辑' }),
        h(NButton, { onClick: () => handlePreview(row) }, { default: () => '预览' }),
        h(NButton, { onClick: () => handleDelete(row) }, { default: () => '删除' }),
      ]
    })
  }},
]

// Drawer for Add/Edit, Modal for Preview
<NDrawer v-model:show="showDrawer">
  <NForm>...</NForm>
</NDrawer>
<NModal v-model:show="showPreview">
  <div>{{ previewArticle?.content }}</div>
</NModal>`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">{{ t('menu.articleManagement') }}</h2>

    <CodePreview title="文章列表" description="使用 NDataTable 展示文章列表，NDrawer 编辑文章，NModal 预览文章" :code="code">
      <NSpace style="margin-bottom: 16px" align="center">
        <NInput v-model:value="searchText" :placeholder="t('common.search')" clearable style="width: 250px" @clear="handleSearch" @keyup.enter="handleSearch" />
        <NButton type="primary" @click="handleSearch">🔍 {{ t('common.search') }}</NButton>
        <NButton @click="handleReset">{{ t('common.reset') }}</NButton>
        <NButton type="success" @click="handleAdd">✏️ 写文章</NButton>
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

    <!-- Add/Edit Drawer -->
    <NDrawer v-model:show="showDrawer" :width="520">
      <NDrawerContent :title="isEdit ? '编辑文章' : '写文章'" closable>
        <NForm label-placement="top">
          <NFormItem label="标题" required>
            <NInput v-model:value="formModel.title" placeholder="请输入文章标题" />
          </NFormItem>
          <NFormItem label="分类">
            <NSelect v-model:value="formModel.category" :options="categoryOptions" />
          </NFormItem>
          <NFormItem label="标签">
            <NSelect v-model:value="formModel.tags" :options="tagOptions" multiple />
          </NFormItem>
          <NFormItem label="内容">
            <NInput v-model:value="formModel.content" type="textarea" :rows="10" placeholder="请输入文章内容" />
          </NFormItem>
        </NForm>
        <template #footer>
          <NSpace justify="end">
            <NButton @click="showDrawer = false">{{ t('common.cancel') }}</NButton>
            <NButton type="primary" @click="handleSave">{{ t('common.save') }}</NButton>
          </NSpace>
        </template>
      </NDrawerContent>
    </NDrawer>

    <!-- Preview Modal -->
    <NModal
      v-model:show="showPreview"
      preset="card"
      :title="previewArticle?.title || '文章预览'"
      style="width: 600px; max-height: 80vh"
    >
      <div v-if="previewArticle">
        <NSpace style="margin-bottom: 12px" align="center">
          <NTag type="info" size="small">{{ previewArticle.category }}</NTag>
          <NTag v-for="tag in previewArticle.tags" :key="tag" size="small" round>{{ tag }}</NTag>
          <span style="color: #999; font-size: 13px">{{ previewArticle.author }} · {{ previewArticle.createTime }}</span>
        </NSpace>
        <div style="line-height: 1.8; white-space: pre-wrap">{{ previewArticle.content }}</div>
      </div>
    </NModal>
  </div>
</template>
