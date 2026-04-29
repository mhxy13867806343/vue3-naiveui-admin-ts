<script setup lang="ts">
/**
 * 角色管理页面
 * 角色列表：ID、角色名称、角色标识、描述、状态、创建时间、操作
 */
import { h } from 'vue'
import { useI18n } from 'vue-i18n'
import { NDataTable, NButton, NSpace, NTag } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const { t } = useI18n()

interface RoleRow {
  key: number
  id: number
  name: string
  code: string
  description: string
  permCount: number
  userCount: number
  status: '启用' | '禁用'
  createTime: string
}

const columns: DataTableColumns<RoleRow> = [
  { title: 'ID', key: 'id', width: 60 },
  {
    title: '角色名称',
    key: 'name',
    width: 140,
    render(row) {
      return h(NTag, { type: 'primary', bordered: false }, { default: () => row.name })
    },
  },
  { title: '角色标识', key: 'code', width: 120 },
  { title: '描述', key: 'description', ellipsis: { tooltip: true } },
  { title: '权限数', key: 'permCount', width: 80 },
  { title: '用户数', key: 'userCount', width: 80 },
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
          h(NButton, { size: 'small', type: 'warning', quaternary: true }, { default: () => '权限' }),
          h(NButton, { size: 'small', type: 'error', quaternary: true }, { default: () => t('common.delete') }),
        ],
      })
    },
  },
]

const data: RoleRow[] = [
  { key: 1, id: 1, name: '超级管理员', code: 'super_admin', description: '拥有系统所有权限，可管理所有模块', permCount: 32, userCount: 2, status: '启用', createTime: '2024-01-01' },
  { key: 2, id: 2, name: '管理员', code: 'admin', description: '拥有大部分管理权限，不可修改系统配置', permCount: 24, userCount: 5, status: '启用', createTime: '2024-01-01' },
  { key: 3, id: 3, name: '编辑', code: 'editor', description: '可管理内容模块，包括文章、分类、标签', permCount: 12, userCount: 8, status: '启用', createTime: '2024-01-05' },
  { key: 4, id: 4, name: '普通用户', code: 'user', description: '仅有基础浏览权限', permCount: 6, userCount: 120, status: '启用', createTime: '2024-01-05' },
  { key: 5, id: 5, name: '访客', code: 'viewer', description: '只读权限，仅可查看公开内容', permCount: 3, userCount: 500, status: '禁用', createTime: '2024-02-01' },
]

const code = `interface RoleRow {
  id: number; name: string; code: string; description: string
  permCount: number; userCount: number; status: '启用' | '禁用'; createTime: string
}

const columns: DataTableColumns<RoleRow> = [
  { title: 'ID', key: 'id' },
  { title: '角色名称', key: 'name', render(row) { return h(NTag, ...) } },
  { title: '角色标识', key: 'code' },
  { title: '描述', key: 'description' },
  { title: '状态', key: 'status', render(row) { return h(NTag, ...) } },
  { title: '操作', key: 'actions', render() { ... } },
]

<NDataTable :columns="columns" :data="data" />`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">{{ t('menu.roleManagement') }}</h2>

    <CodePreview title="角色列表" description="使用 NDataTable 展示角色信息，包含角色标识、权限数量、状态和操作按钮" :code="code">
      <NSpace style="margin-bottom: 16px">
        <NButton type="primary">➕ {{ t('common.add') }}</NButton>
      </NSpace>
      <NDataTable :columns="columns" :data="data" :bordered="false" />
    </CodePreview>
  </div>
</template>
