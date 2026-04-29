<script setup lang="ts">
/**
 * 菜单管理页面
 * NDataTable 树形表格展示菜单层级：ID、菜单名称、图标、路径、排序、状态、操作
 */
import { h, ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  NDataTable, NButton, NSpace, NTag,
  NModal, NForm, NFormItem, NInput, NSelect, NSwitch, NInputNumber,
  useMessage, useDialog,
} from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const { t } = useI18n()
const message = useMessage()
const dialog = useDialog()

interface MenuRow {
  key: number
  id: number
  name: string
  icon: string
  path: string
  sort: number
  status: '启用' | '禁用'
  type: '目录' | '菜单' | '按钮'
  parentId: number | null
  children?: MenuRow[]
}

// Modal state
const showModal = ref(false)
const isEdit = ref(false)
const editingRow = ref<MenuRow | null>(null)
const formModel = reactive({
  name: '',
  icon: '',
  path: '',
  type: '菜单' as '目录' | '菜单' | '按钮',
  sort: 1,
  status: '启用' as '启用' | '禁用',
  parentId: null as number | null,
})

const typeOptions = [
  { label: '目录', value: '目录' },
  { label: '菜单', value: '菜单' },
  { label: '按钮', value: '按钮' },
]

let nextId = 100

function resetForm() {
  formModel.name = ''
  formModel.icon = ''
  formModel.path = ''
  formModel.type = '菜单'
  formModel.sort = 1
  formModel.status = '启用'
  formModel.parentId = null
}

function handleAdd() {
  isEdit.value = false
  editingRow.value = null
  resetForm()
  showModal.value = true
}

function handleAddChild(row: MenuRow) {
  isEdit.value = false
  editingRow.value = null
  resetForm()
  formModel.parentId = row.id
  showModal.value = true
}

function handleEdit(row: MenuRow) {
  isEdit.value = true
  editingRow.value = row
  formModel.name = row.name
  formModel.icon = row.icon
  formModel.path = row.path
  formModel.type = row.type
  formModel.sort = row.sort
  formModel.status = row.status
  formModel.parentId = row.parentId
  showModal.value = true
}

function findAndRemove(list: MenuRow[], id: number): boolean {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      list.splice(i, 1)
      return true
    }
    if (list[i].children && findAndRemove(list[i].children!, id)) {
      return true
    }
  }
  return false
}

function findParent(list: MenuRow[], parentId: number): MenuRow | null {
  for (const item of list) {
    if (item.id === parentId) return item
    if (item.children) {
      const found = findParent(item.children, parentId)
      if (found) return found
    }
  }
  return null
}

function handleDelete(row: MenuRow) {
  dialog.warning({
    title: '确认删除',
    content: `确定要删除菜单 "${row.name}" 吗？`,
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      findAndRemove(tableData.value, row.id)
      message.success('删除成功')
    },
  })
}

function handleSave() {
  if (!formModel.name) {
    message.error('请填写菜单名称')
    return
  }
  if (isEdit.value && editingRow.value) {
    Object.assign(editingRow.value, {
      name: formModel.name,
      icon: formModel.icon,
      path: formModel.path,
      type: formModel.type,
      sort: formModel.sort,
      status: formModel.status,
    })
    message.success('编辑成功')
  } else {
    const newItem: MenuRow = {
      key: nextId,
      id: nextId,
      name: formModel.name,
      icon: formModel.icon,
      path: formModel.path,
      type: formModel.type,
      sort: formModel.sort,
      status: formModel.status,
      parentId: formModel.parentId,
    }
    nextId++
    if (formModel.parentId) {
      const parent = findParent(tableData.value, formModel.parentId)
      if (parent) {
        if (!parent.children) parent.children = []
        parent.children.push(newItem)
      }
    } else {
      tableData.value.push(newItem)
    }
    message.success('添加成功')
  }
  showModal.value = false
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
    width: 220,
    render(row) {
      return h(NSpace, { size: 4 }, {
        default: () => [
          h(NButton, { size: 'small', type: 'primary', quaternary: true, onClick: () => handleEdit(row) }, { default: () => t('common.edit') }),
          h(NButton, { size: 'small', type: 'success', quaternary: true, onClick: () => handleAddChild(row) }, { default: () => '添加子菜单' }),
          h(NButton, { size: 'small', type: 'error', quaternary: true, onClick: () => handleDelete(row) }, { default: () => t('common.delete') }),
        ],
      })
    },
  },
]

const tableData = ref<MenuRow[]>([
  {
    key: 1, id: 1, name: '仪表盘', icon: '📊', path: '/dashboard', sort: 1, status: '启用', type: '目录', parentId: null,
    children: [
      { key: 11, id: 11, name: '工作台', icon: '🏠', path: '/dashboard/workspace', sort: 1, status: '启用', type: '菜单', parentId: 1 },
      { key: 12, id: 12, name: '数据分析', icon: '📈', path: '/dashboard/analytics', sort: 2, status: '启用', type: '菜单', parentId: 1 },
    ],
  },
  {
    key: 2, id: 2, name: '系统管理', icon: '⚙️', path: '/system', sort: 2, status: '启用', type: '目录', parentId: null,
    children: [
      { key: 21, id: 21, name: '用户管理', icon: '👤', path: '/system/user', sort: 1, status: '启用', type: '菜单', parentId: 2 },
      { key: 22, id: 22, name: '角色管理', icon: '🎭', path: '/system/role', sort: 2, status: '启用', type: '菜单', parentId: 2 },
      { key: 23, id: 23, name: '菜单管理', icon: '📋', path: '/system/menu', sort: 3, status: '启用', type: '菜单', parentId: 2 },
      { key: 24, id: 24, name: '部门管理', icon: '🏢', path: '/system/department', sort: 4, status: '启用', type: '菜单', parentId: 2 },
    ],
  },
  {
    key: 3, id: 3, name: '内容管理', icon: '📝', path: '/content', sort: 3, status: '启用', type: '目录', parentId: null,
    children: [
      { key: 31, id: 31, name: '文章管理', icon: '📰', path: '/content/article', sort: 1, status: '启用', type: '菜单', parentId: 3 },
      { key: 32, id: 32, name: '分类管理', icon: '📂', path: '/content/category', sort: 2, status: '启用', type: '菜单', parentId: 3 },
      { key: 33, id: 33, name: '标签管理', icon: '🏷️', path: '/content/tag', sort: 3, status: '启用', type: '菜单', parentId: 3 },
    ],
  },
  {
    key: 4, id: 4, name: '图表', icon: '📈', path: '/charts', sort: 4, status: '启用', type: '目录', parentId: null,
    children: [
      { key: 41, id: 41, name: '折线图', icon: '📉', path: '/charts/line', sort: 1, status: '启用', type: '菜单', parentId: 4 },
      { key: 42, id: 42, name: '柱状图', icon: '📊', path: '/charts/bar', sort: 2, status: '启用', type: '菜单', parentId: 4 },
      { key: 43, id: 43, name: '饼图', icon: '🥧', path: '/charts/pie', sort: 3, status: '启用', type: '菜单', parentId: 4 },
      { key: 44, id: 44, name: '雷达图', icon: '🎯', path: '/charts/radar', sort: 4, status: '启用', type: '菜单', parentId: 4 },
    ],
  },
  {
    key: 5, id: 5, name: '组件示例', icon: '🧩', path: '/components', sort: 5, status: '启用', type: '目录', parentId: null,
    children: [
      { key: 51, id: 51, name: '富文本编辑器', icon: '✏️', path: '/components/editor', sort: 1, status: '启用', type: '菜单', parentId: 5 },
      { key: 52, id: 52, name: '拖拽列表', icon: '↕️', path: '/components/drag', sort: 2, status: '启用', type: '菜单', parentId: 5 },
      { key: 53, id: 53, name: '图标展示', icon: '🎨', path: '/components/icons', sort: 3, status: '启用', type: '菜单', parentId: 5 },
    ],
  },
  {
    key: 6, id: 6, name: '功能示例', icon: '🔧', path: '/features', sort: 6, status: '启用', type: '目录', parentId: null,
    children: [
      { key: 61, id: 61, name: '国际化', icon: '🌐', path: '/features/i18n', sort: 1, status: '启用', type: '菜单', parentId: 6 },
      { key: 62, id: 62, name: '剪贴板', icon: '📋', path: '/features/clipboard', sort: 2, status: '启用', type: '菜单', parentId: 6 },
      { key: 63, id: 63, name: '打印', icon: '🖨️', path: '/features/print', sort: 3, status: '启用', type: '菜单', parentId: 6 },
    ],
  },
  { key: 7, id: 7, name: '权限管理', icon: '🔐', path: '/permission-management', sort: 7, status: '启用', type: '菜单', parentId: null },
  { key: 8, id: 8, name: '关于', icon: '📄', path: '/about', sort: 8, status: '启用', type: '菜单', parentId: null },
])

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
  { title: '操作', key: 'actions', render(row) {
    return h(NSpace, {}, {
      default: () => [
        h(NButton, { onClick: () => handleEdit(row) }, { default: () => '编辑' }),
        h(NButton, { onClick: () => handleAddChild(row) }, { default: () => '添加子菜单' }),
        h(NButton, { onClick: () => handleDelete(row) }, { default: () => '删除' }),
      ]
    })
  }},
]

// CRUD modal pattern
const showModal = ref(false)
const isEdit = ref(false)
function handleAdd() { isEdit.value = false; showModal.value = true }
function handleEdit(row) { isEdit.value = true; formModel = { ...row }; showModal.value = true }
function handleDelete(row) { dialog.warning({ title: '确认删除', ... }) }

<NDataTable :columns="columns" :data="tableData" :row-key="row => row.key"
  default-expand-all />`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">{{ t('menu.menuManagement') }}</h2>

    <CodePreview title="菜单树形表格" description="使用 NDataTable 树形结构展示系统菜单，支持展开/折叠" :code="code">
      <NSpace style="margin-bottom: 16px">
        <NButton type="primary" @click="handleAdd">➕ {{ t('common.add') }}</NButton>
      </NSpace>
      <NDataTable
        :columns="columns"
        :data="tableData"
        :bordered="false"
        :row-key="(row: MenuRow) => row.key"
        default-expand-all
      />
    </CodePreview>

    <!-- Add/Edit Modal -->
    <NModal
      v-model:show="showModal"
      :title="isEdit ? '编辑菜单' : '添加菜单'"
      preset="card"
      style="width: 520px"
      :mask-closable="false"
    >
      <NForm label-placement="left" label-width="80">
        <NFormItem label="菜单名称" required>
          <NInput v-model:value="formModel.name" placeholder="请输入菜单名称" />
        </NFormItem>
        <NFormItem label="图标">
          <NInput v-model:value="formModel.icon" placeholder="请输入图标（如 📊）" />
        </NFormItem>
        <NFormItem label="路径">
          <NInput v-model:value="formModel.path" placeholder="请输入路由路径" />
        </NFormItem>
        <NFormItem label="类型">
          <NSelect v-model:value="formModel.type" :options="typeOptions" />
        </NFormItem>
        <NFormItem label="排序">
          <NInputNumber v-model:value="formModel.sort" :min="1" style="width: 100%" />
        </NFormItem>
        <NFormItem label="状态">
          <NSwitch
            :value="formModel.status === '启用'"
            @update:value="(val: boolean) => formModel.status = val ? '启用' : '禁用'"
          >
            <template #checked>启用</template>
            <template #unchecked>禁用</template>
          </NSwitch>
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
