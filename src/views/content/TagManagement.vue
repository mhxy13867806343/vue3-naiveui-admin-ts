<script setup lang="ts">
/**
 * 标签管理页面
 * NDataTable：ID、标签名称、颜色、文章数、创建时间、操作
 */
import { h, ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  NDataTable, NButton, NSpace, NTag,
  NModal, NForm, NFormItem, NInput, NSelect, NColorPicker,
  useMessage, useDialog,
} from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const { t } = useI18n()
const message = useMessage()
const dialog = useDialog()

interface TagRow {
  key: number
  id: number
  name: string
  color: string
  type: 'success' | 'info' | 'warning' | 'error' | 'default'
  articleCount: number
  createTime: string
}

const typeOptions = [
  { label: 'Success', value: 'success' },
  { label: 'Info', value: 'info' },
  { label: 'Warning', value: 'warning' },
  { label: 'Error', value: 'error' },
  { label: 'Default', value: 'default' },
]

// Modal state
const showModal = ref(false)
const isEdit = ref(false)
const editingRow = ref<TagRow | null>(null)
const formModel = reactive({
  name: '',
  color: '#18a058',
  type: 'success' as TagRow['type'],
})

let nextId = 100

function resetForm() {
  formModel.name = ''
  formModel.color = '#18a058'
  formModel.type = 'success'
}

function handleAdd() {
  isEdit.value = false
  editingRow.value = null
  resetForm()
  showModal.value = true
}

function handleEdit(row: TagRow) {
  isEdit.value = true
  editingRow.value = row
  formModel.name = row.name
  formModel.color = row.color
  formModel.type = row.type
  showModal.value = true
}

function handleDelete(row: TagRow) {
  dialog.warning({
    title: '确认删除',
    content: `确定要删除标签 "${row.name}" 吗？`,
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
    message.error('请填写标签名称')
    return
  }
  if (isEdit.value && editingRow.value) {
    Object.assign(editingRow.value, {
      name: formModel.name,
      color: formModel.color,
      type: formModel.type,
    })
    message.success('编辑成功')
  } else {
    const newId = nextId++
    tableData.value.push({
      key: newId,
      id: newId,
      name: formModel.name,
      color: formModel.color,
      type: formModel.type,
      articleCount: 0,
      createTime: new Date().toISOString().slice(0, 10),
    })
    message.success('添加成功')
  }
  showModal.value = false
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

const tableData = ref<TagRow[]>([
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
])

const code = `const columns: DataTableColumns<TagRow> = [
  { title: 'ID', key: 'id' },
  { title: '标签名称', key: 'name',
    render(row) { return h(NTag, { type: row.type, round: true }, { default: () => row.name }) }
  },
  { title: '颜色', key: 'color',
    render(row) { return h('div', ...) }  // color dot + hex
  },
  { title: '文章数', key: 'articleCount', sorter: ... },
  { title: '操作', key: 'actions', render(row) {
    return h(NSpace, {}, {
      default: () => [
        h(NButton, { onClick: () => handleEdit(row) }, { default: () => '编辑' }),
        h(NButton, { onClick: () => handleDelete(row) }, { default: () => '删除' }),
      ]
    })
  }},
]

// CRUD modal with NColorPicker + NSelect for type
<NModal v-model:show="showModal">
  <NForm>
    <NFormItem label="颜色"><NColorPicker v-model:value="formModel.color" /></NFormItem>
    <NFormItem label="类型"><NSelect v-model:value="formModel.type" :options="typeOptions" /></NFormItem>
  </NForm>
</NModal>`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">{{ t('menu.tagManagement') }}</h2>

    <CodePreview title="标签列表" description="使用 NDataTable 和 NTag 展示标签，支持颜色展示和排序" :code="code">
      <NSpace style="margin-bottom: 16px">
        <NButton type="primary" @click="handleAdd">➕ {{ t('common.add') }}</NButton>
      </NSpace>
      <NDataTable :columns="columns" :data="tableData" :bordered="false" />
    </CodePreview>

    <!-- Add/Edit Modal -->
    <NModal
      v-model:show="showModal"
      :title="isEdit ? '编辑标签' : '添加标签'"
      preset="card"
      style="width: 480px"
      :mask-closable="false"
    >
      <NForm label-placement="left" label-width="80">
        <NFormItem label="标签名称" required>
          <NInput v-model:value="formModel.name" placeholder="请输入标签名称" />
        </NFormItem>
        <NFormItem label="颜色">
          <NColorPicker v-model:value="formModel.color" :show-alpha="false" />
        </NFormItem>
        <NFormItem label="类型">
          <NSelect v-model:value="formModel.type" :options="typeOptions" />
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
