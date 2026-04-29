<script setup lang="ts">
/**
 * 分类管理页面
 * NDataTable：ID、分类名称、描述、文章数、排序、创建时间、操作
 */
import { h, ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  NDataTable, NButton, NSpace, NTag,
  NModal, NForm, NFormItem, NInput, NInputNumber, NColorPicker,
  useMessage, useDialog,
} from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const { t } = useI18n()
const message = useMessage()
const dialog = useDialog()

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

// Modal state
const showModal = ref(false)
const isEdit = ref(false)
const editingRow = ref<CategoryRow | null>(null)
const formModel = reactive({
  name: '',
  description: '',
  color: '#18a058',
  sort: 1,
})

let nextId = 100

function resetForm() {
  formModel.name = ''
  formModel.description = ''
  formModel.color = '#18a058'
  formModel.sort = 1
}

function handleAdd() {
  isEdit.value = false
  editingRow.value = null
  resetForm()
  showModal.value = true
}

function handleEdit(row: CategoryRow) {
  isEdit.value = true
  editingRow.value = row
  formModel.name = row.name
  formModel.description = row.description
  formModel.color = row.color
  formModel.sort = row.sort
  showModal.value = true
}

function handleDelete(row: CategoryRow) {
  dialog.warning({
    title: '确认删除',
    content: `确定要删除分类 "${row.name}" 吗？`,
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      const idx = tableData.value.findIndex(d => d.id === row.id)
      if (idx !== -1) tableData.value.splice(idx, 1)
      message.success('删除成功')
    },
  })
}

function handleSave() {
  if (!formModel.name) {
    message.error('请填写分类名称')
    return
  }
  if (isEdit.value && editingRow.value) {
    Object.assign(editingRow.value, {
      name: formModel.name,
      description: formModel.description,
      color: formModel.color,
      sort: formModel.sort,
    })
    message.success('编辑成功')
  } else {
    const newId = nextId++
    tableData.value.push({
      key: newId,
      id: newId,
      name: formModel.name,
      description: formModel.description,
      articleCount: 0,
      sort: formModel.sort,
      color: formModel.color,
      createTime: new Date().toISOString().slice(0, 10),
    })
    message.success('添加成功')
  }
  showModal.value = false
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
    render(row) {
      return h(NSpace, { size: 4 }, {
        default: () => [
          h(NButton, { size: 'small', type: 'primary', quaternary: true, onClick: () => handleEdit(row) }, { default: () => t('common.edit') }),
          h(NButton, { size: 'small', type: 'error', quaternary: true, onClick: () => handleDelete(row) }, { default: () => t('common.delete') }),
        ],
      })
    },
  },
]

const tableData = ref<CategoryRow[]>([
  { key: 1, id: 1, name: '前端', description: '前端开发相关技术文章，包括 Vue、React、CSS 等', articleCount: 42, sort: 1, color: '#18a058', createTime: '2024-01-01' },
  { key: 2, id: 2, name: '后端', description: '后端开发、API设计、微服务架构等', articleCount: 35, sort: 2, color: '#2080f0', createTime: '2024-01-01' },
  { key: 3, id: 3, name: '运维', description: 'DevOps、CI/CD、容器化、云原生', articleCount: 18, sort: 3, color: '#f0a020', createTime: '2024-01-05' },
  { key: 4, id: 4, name: '数据库', description: 'MySQL、PostgreSQL、Redis、MongoDB 等', articleCount: 15, sort: 4, color: '#d03050', createTime: '2024-01-05' },
  { key: 5, id: 5, name: '设计', description: 'UI/UX设计、交互设计、设计系统', articleCount: 12, sort: 5, color: '#8a2be2', createTime: '2024-01-10' },
  { key: 6, id: 6, name: '产品', description: '产品设计、需求分析、用户研究', articleCount: 8, sort: 6, color: '#ff6347', createTime: '2024-01-10' },
  { key: 7, id: 7, name: '测试', description: '自动化测试、性能测试、测试策略', articleCount: 10, sort: 7, color: '#20b2aa', createTime: '2024-01-15' },
  { key: 8, id: 8, name: '人工智能', description: '机器学习、深度学习、NLP、大模型', articleCount: 22, sort: 8, color: '#9370db', createTime: '2024-02-01' },
  { key: 9, id: 9, name: '移动端', description: 'iOS、Android、Flutter、React Native', articleCount: 14, sort: 9, color: '#3cb371', createTime: '2024-02-10' },
])

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
  { title: '操作', key: 'actions', render(row) {
    return h(NSpace, {}, {
      default: () => [
        h(NButton, { onClick: () => handleEdit(row) }, { default: () => '编辑' }),
        h(NButton, { onClick: () => handleDelete(row) }, { default: () => '删除' }),
      ]
    })
  }},
]

// CRUD modal with NColorPicker
<NModal v-model:show="showModal">
  <NForm>
    <NFormItem label="颜色"><NColorPicker v-model:value="formModel.color" /></NFormItem>
  </NForm>
</NModal>`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">{{ t('menu.categoryManagement') }}</h2>

    <CodePreview title="分类列表" description="使用 NDataTable 和 NTag 展示文章分类，支持自定义颜色标签和排序" :code="code">
      <NSpace style="margin-bottom: 16px">
        <NButton type="primary" @click="handleAdd">➕ {{ t('common.add') }}</NButton>
      </NSpace>
      <NDataTable :columns="columns" :data="tableData" :bordered="false" />
    </CodePreview>

    <!-- Add/Edit Modal -->
    <NModal
      v-model:show="showModal"
      :title="isEdit ? '编辑分类' : '添加分类'"
      preset="card"
      style="width: 500px"
      :mask-closable="false"
    >
      <NForm label-placement="left" label-width="80">
        <NFormItem label="分类名称" required>
          <NInput v-model:value="formModel.name" placeholder="请输入分类名称" />
        </NFormItem>
        <NFormItem label="描述">
          <NInput v-model:value="formModel.description" type="textarea" :rows="3" placeholder="请输入分类描述" />
        </NFormItem>
        <NFormItem label="颜色">
          <NColorPicker v-model:value="formModel.color" :show-alpha="false" />
        </NFormItem>
        <NFormItem label="排序">
          <NInputNumber v-model:value="formModel.sort" :min="1" style="width: 100%" />
        </NFormItem>
      </NForm>
      <template #footer>
        <NSpace justify="end">
          <NButton @click="showModal = false">{{ t('common.cancel') }}</NButton>
          <NButton type="primary" @click="handleSave">{{ t('common.save') }}</NButton>
        </NSpace>
      </template>
    </NModal>
  </div>
</template>
