<script setup lang="ts">
/**
 * 部门管理页面
 * NDataTable 树形表格：ID、部门名称、负责人、排序、状态、创建时间、操作
 */
import { h, ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  NDataTable, NButton, NSpace, NTag,
  NModal, NForm, NFormItem, NInput, NSwitch, NInputNumber,
  useMessage, useDialog,
} from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const { t } = useI18n()
const message = useMessage()
const dialog = useDialog()

interface DeptRow {
  key: number
  id: number
  name: string
  leader: string
  sort: number
  status: '启用' | '禁用'
  createTime: string
  parentId: number | null
  children?: DeptRow[]
}

// Modal state
const showModal = ref(false)
const isEdit = ref(false)
const editingRow = ref<DeptRow | null>(null)
const formModel = reactive({
  name: '',
  leader: '',
  sort: 1,
  status: '启用' as '启用' | '禁用',
  parentId: null as number | null,
})

let nextId = 1000

function resetForm() {
  formModel.name = ''
  formModel.leader = ''
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

function handleAddChild(row: DeptRow) {
  isEdit.value = false
  editingRow.value = null
  resetForm()
  formModel.parentId = row.id
  showModal.value = true
}

function handleEdit(row: DeptRow) {
  isEdit.value = true
  editingRow.value = row
  formModel.name = row.name
  formModel.leader = row.leader
  formModel.sort = row.sort
  formModel.status = row.status
  formModel.parentId = row.parentId
  showModal.value = true
}

function findAndRemove(list: DeptRow[], id: number): boolean {
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

function findParent(list: DeptRow[], parentId: number): DeptRow | null {
  for (const item of list) {
    if (item.id === parentId) return item
    if (item.children) {
      const found = findParent(item.children, parentId)
      if (found) return found
    }
  }
  return null
}

function handleDelete(row: DeptRow) {
  dialog.warning({
    title: '确认删除',
    content: `确定要删除部门 "${row.name}" 吗？`,
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
    message.error('请填写部门名称')
    return
  }
  if (isEdit.value && editingRow.value) {
    Object.assign(editingRow.value, {
      name: formModel.name,
      leader: formModel.leader,
      sort: formModel.sort,
      status: formModel.status,
    })
    message.success('编辑成功')
  } else {
    const newItem: DeptRow = {
      key: nextId,
      id: nextId,
      name: formModel.name,
      leader: formModel.leader,
      sort: formModel.sort,
      status: formModel.status,
      parentId: formModel.parentId,
      createTime: new Date().toISOString().slice(0, 10),
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
    width: 240,
    render(row) {
      return h(NSpace, { size: 4 }, {
        default: () => [
          h(NButton, { size: 'small', type: 'primary', quaternary: true, onClick: () => handleEdit(row) }, { default: () => t('common.edit') }),
          h(NButton, { size: 'small', type: 'success', quaternary: true, onClick: () => handleAddChild(row) }, { default: () => '添加子部门' }),
          h(NButton, { size: 'small', type: 'error', quaternary: true, onClick: () => handleDelete(row) }, { default: () => t('common.delete') }),
        ],
      })
    },
  },
]

const tableData = ref<DeptRow[]>([
  {
    key: 1, id: 1, name: '科技有限公司', leader: '陈总', sort: 1, status: '启用', createTime: '2023-01-01', parentId: null,
    children: [
      {
        key: 10, id: 10, name: '技术部', leader: '张工', sort: 1, status: '启用', createTime: '2023-01-01', parentId: 1,
        children: [
          { key: 101, id: 101, name: '前端开发组', leader: '李明', sort: 1, status: '启用', createTime: '2023-02-01', parentId: 10 },
          { key: 102, id: 102, name: '后端开发组', leader: '王强', sort: 2, status: '启用', createTime: '2023-02-01', parentId: 10 },
          { key: 103, id: 103, name: '移动端开发组', leader: '赵磊', sort: 3, status: '启用', createTime: '2023-03-01', parentId: 10 },
          { key: 104, id: 104, name: '测试组', leader: '孙丽', sort: 4, status: '启用', createTime: '2023-03-01', parentId: 10 },
        ],
      },
      {
        key: 20, id: 20, name: '产品部', leader: '李经理', sort: 2, status: '启用', createTime: '2023-01-01', parentId: 1,
        children: [
          { key: 201, id: 201, name: '产品经理组', leader: '周洋', sort: 1, status: '启用', createTime: '2023-02-01', parentId: 20 },
          { key: 202, id: 202, name: 'UI设计组', leader: '吴芳', sort: 2, status: '启用', createTime: '2023-02-01', parentId: 20 },
        ],
      },
      {
        key: 30, id: 30, name: '运维部', leader: '王工', sort: 3, status: '启用', createTime: '2023-01-01', parentId: 1,
        children: [
          { key: 301, id: 301, name: 'DevOps组', leader: '郑凯', sort: 1, status: '启用', createTime: '2023-04-01', parentId: 30 },
          { key: 302, id: 302, name: 'DBA组', leader: '冯涛', sort: 2, status: '启用', createTime: '2023-04-01', parentId: 30 },
        ],
      },
      {
        key: 40, id: 40, name: '商务部', leader: '赵总', sort: 4, status: '启用', createTime: '2023-01-01', parentId: 1,
        children: [
          { key: 401, id: 401, name: '销售组', leader: '钱进', sort: 1, status: '启用', createTime: '2023-02-01', parentId: 40 },
          { key: 402, id: 402, name: '市场组', leader: '韩梅', sort: 2, status: '启用', createTime: '2023-02-01', parentId: 40 },
        ],
      },
      {
        key: 50, id: 50, name: '人力资源部', leader: '孙主管', sort: 5, status: '启用', createTime: '2023-01-01', parentId: 1,
        children: [
          { key: 501, id: 501, name: '招聘组', leader: '杨帆', sort: 1, status: '启用', createTime: '2023-03-01', parentId: 50 },
          { key: 502, id: 502, name: '培训组', leader: '朱红', sort: 2, status: '禁用', createTime: '2023-03-01', parentId: 50 },
        ],
      },
      { key: 60, id: 60, name: '财务部', leader: '刘会计', sort: 6, status: '启用', createTime: '2023-01-01', parentId: 1 },
    ],
  },
])

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
  { title: '操作', key: 'actions', render(row) {
    return h(NSpace, {}, {
      default: () => [
        h(NButton, { onClick: () => handleEdit(row) }, { default: () => '编辑' }),
        h(NButton, { onClick: () => handleAddChild(row) }, { default: () => '添加子部门' }),
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
    <h2 class="text-xl font-semibold mb-4">{{ t('menu.departmentManagement') }}</h2>

    <CodePreview title="部门组织架构" description="使用 NDataTable 树形结构展示公司部门层级" :code="code">
      <NSpace style="margin-bottom: 16px">
        <NButton type="primary" @click="handleAdd">➕ {{ t('common.add') }}</NButton>
      </NSpace>
      <NDataTable
        :columns="columns"
        :data="tableData"
        :bordered="false"
        :row-key="(row: DeptRow) => row.key"
        default-expand-all
      />
    </CodePreview>

    <!-- Add/Edit Modal -->
    <NModal
      v-model:show="showModal"
      :title="isEdit ? '编辑部门' : '添加部门'"
      preset="card"
      style="width: 500px"
      :mask-closable="false"
    >
      <NForm label-placement="left" label-width="80">
        <NFormItem label="部门名称" required>
          <NInput v-model:value="formModel.name" placeholder="请输入部门名称" />
        </NFormItem>
        <NFormItem label="负责人">
          <NInput v-model:value="formModel.leader" placeholder="请输入负责人" />
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
