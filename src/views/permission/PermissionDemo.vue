<script setup lang="ts">
import { ref, computed } from 'vue'
import { NSelect, NCard, NGrid, NGridItem, NButton, NSpace, NTag, NDataTable, NAlert, NSwitch } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const currentRole = ref<string>('admin')

const roleOptions = [
  { label: '管理员 (admin)', value: 'admin' },
  { label: '普通用户 (user)', value: 'user' },
  { label: '编辑 (editor)', value: 'editor' },
]

const allPermissions = [
  { key: 'dashboard:view', module: '仪表盘', name: '查看仪表盘', admin: true, editor: true, user: true },
  { key: 'user:view', module: '用户管理', name: '查看用户', admin: true, editor: false, user: false },
  { key: 'user:create', module: '用户管理', name: '创建用户', admin: true, editor: false, user: false },
  { key: 'user:edit', module: '用户管理', name: '编辑用户', admin: true, editor: false, user: false },
  { key: 'user:delete', module: '用户管理', name: '删除用户', admin: true, editor: false, user: false },
  { key: 'role:view', module: '角色管理', name: '查看角色', admin: true, editor: false, user: false },
  { key: 'role:edit', module: '角色管理', name: '编辑角色', admin: true, editor: false, user: false },
  { key: 'content:view', module: '内容管理', name: '查看内容', admin: true, editor: true, user: true },
  { key: 'content:create', module: '内容管理', name: '创建内容', admin: true, editor: true, user: false },
  { key: 'content:edit', module: '内容管理', name: '编辑内容', admin: true, editor: true, user: false },
  { key: 'content:delete', module: '内容管理', name: '删除内容', admin: true, editor: false, user: false },
  { key: 'system:settings', module: '系统设置', name: '系统配置', admin: true, editor: false, user: false },
  { key: 'permission:view', module: '权限管理', name: '查看权限', admin: true, editor: false, user: false },
  { key: 'permission:edit', module: '权限管理', name: '编辑权限', admin: true, editor: false, user: false },
]

const currentPermissions = computed(() => {
  return allPermissions.filter(p => p[currentRole.value as keyof typeof p] === true).map(p => p.key)
})

function hasPermission(perm: string) {
  return currentPermissions.value.includes(perm)
}

const visibleMenus = computed(() => {
  const menus = [
    { name: '📊 仪表盘', perm: 'dashboard:view' },
    { name: '👥 用户管理', perm: 'user:view' },
    { name: '🔐 角色管理', perm: 'role:view' },
    { name: '📝 内容管理', perm: 'content:view' },
    { name: '⚙️ 系统设置', perm: 'system:settings' },
    { name: '🔑 权限管理', perm: 'permission:view' },
  ]
  return menus.map(m => ({ ...m, visible: hasPermission(m.perm) }))
})

interface PermRow { key: string; module: string; name: string; admin: boolean; editor: boolean; user: boolean }

const permColumns: DataTableColumns<PermRow> = [
  { title: '模块', key: 'module', width: 100 },
  { title: '权限名称', key: 'name' },
  { title: '权限标识', key: 'key' },
  { title: 'Admin', key: 'admin', width: 80, render(row) { return row.admin ? '✅' : '❌' } },
  { title: 'Editor', key: 'editor', width: 80, render(row) { return row.editor ? '✅' : '❌' } },
  { title: 'User', key: 'user', width: 80, render(row) { return row.user ? '✅' : '❌' } },
]

const roleCode = `const currentRole = ref('admin')

// 根据角色计算权限
const currentPermissions = computed(() => {
  return allPermissions.filter(p => p[currentRole.value]).map(p => p.key)
})

function hasPermission(perm: string) {
  return currentPermissions.value.includes(perm)
}

// 在模板中使用
// <NButton v-if="hasPermission('user:create')">创建用户</NButton>`

const directiveCode = `// v-permission 指令用法示例
// <NButton v-permission="'user:create'">创建用户</NButton>
// <NButton v-permission="'user:delete'">删除用户</NButton>

// 指令实现原理
app.directive('permission', {
  mounted(el, binding) {
    const permission = binding.value
    if (!hasPermission(permission)) {
      el.parentNode?.removeChild(el)
    }
  },
})`

const menuCode = `// 根据权限动态显示菜单
const visibleMenus = computed(() => {
  return menus.filter(m => hasPermission(m.perm))
})`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">权限演示 Permission Demo</h2>

    <NAlert type="info" title="说明" style="margin-bottom: 16px">
      此页面演示基于角色的权限控制。切换角色后，页面上的按钮、菜单项会根据权限动态显示/隐藏。
    </NAlert>

    <CodePreview title="角色切换" description="选择不同角色查看权限变化" :code="roleCode">
      <NSpace align="center">
        <span>当前角色：</span>
        <NSelect v-model:value="currentRole" :options="roleOptions" style="width: 250px" />
        <NTag :type="currentRole === 'admin' ? 'success' : currentRole === 'editor' ? 'warning' : 'info'">
          {{ currentRole }} - {{ currentPermissions.length }} 个权限
        </NTag>
      </NSpace>
    </CodePreview>

    <NGrid :cols="2" :x-gap="16" :y-gap="16">
      <NGridItem>
        <CodePreview title="菜单权限控制" description="根据角色权限动态显示/隐藏菜单项" :code="menuCode">
          <div style="display: flex; flex-direction: column; gap: 8px">
            <div v-for="menu in visibleMenus" :key="menu.perm" style="display: flex; align-items: center; gap: 8px; padding: 8px 12px; border-radius: 6px; background: #f5f5f5">
              <span>{{ menu.name }}</span>
              <NTag v-if="menu.visible" type="success" size="small">可见</NTag>
              <NTag v-else type="error" size="small">隐藏</NTag>
            </div>
          </div>
        </CodePreview>
      </NGridItem>

      <NGridItem>
        <CodePreview title="按钮权限控制" description="根据权限显示/隐藏操作按钮" :code="directiveCode">
          <NSpace vertical :size="12">
            <NSpace>
              <NButton v-if="hasPermission('user:create')" type="primary">➕ 创建用户</NButton>
              <NButton v-if="hasPermission('user:edit')" type="info">✏️ 编辑用户</NButton>
              <NButton v-if="hasPermission('user:delete')" type="error">🗑️ 删除用户</NButton>
              <NTag v-if="!hasPermission('user:create')" type="warning">无用户管理权限</NTag>
            </NSpace>
            <NSpace>
              <NButton v-if="hasPermission('content:create')" type="primary">📝 写文章</NButton>
              <NButton v-if="hasPermission('content:edit')" type="info">✏️ 编辑文章</NButton>
              <NButton v-if="hasPermission('content:delete')" type="error">🗑️ 删除文章</NButton>
              <NTag v-if="!hasPermission('content:create')" type="warning">无内容编辑权限</NTag>
            </NSpace>
            <NSpace>
              <NButton v-if="hasPermission('system:settings')">⚙️ 系统设置</NButton>
              <NButton v-if="hasPermission('permission:edit')">🔑 权限配置</NButton>
              <NTag v-if="!hasPermission('system:settings')" type="warning">无系统管理权限</NTag>
            </NSpace>
          </NSpace>
        </CodePreview>
      </NGridItem>
    </NGrid>

    <CodePreview title="权限矩阵" description="展示所有权限在各角色下的分配情况" :code="`<NDataTable :columns='permColumns' :data='allPermissions' />`">
      <NDataTable :columns="permColumns" :data="allPermissions" :bordered="false" :pagination="false" />
    </CodePreview>
  </div>
</template>
