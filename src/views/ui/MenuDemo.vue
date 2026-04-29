<script setup lang="ts">
import { h, ref } from 'vue'
import { NMenu, NSwitch, NSpace, NIcon } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const collapsed = ref(false)

const menuOptions: MenuOption[] = [
  { label: '首页', key: 'home', icon: () => h(NIcon, null, { default: () => h('span', '🏠') }) },
  {
    label: '系统管理', key: 'system', icon: () => h(NIcon, null, { default: () => h('span', '⚙️') }),
    children: [
      { label: '用户管理', key: 'user' },
      { label: '角色管理', key: 'role' },
      { label: '菜单管理', key: 'menu' },
    ],
  },
  {
    label: '内容管理', key: 'content', icon: () => h(NIcon, null, { default: () => h('span', '📝') }),
    children: [
      { label: '文章管理', key: 'article' },
      { label: '分类管理', key: 'category' },
    ],
  },
  { label: '关于', key: 'about', icon: () => h(NIcon, null, { default: () => h('span', '📄') }) },
]

const horizontalOptions: MenuOption[] = [
  { label: '首页', key: 'home' },
  { label: '产品', key: 'product' },
  { label: '文档', key: 'docs' },
  { label: '关于', key: 'about' },
]

const basicCode = `const menuOptions = [
  { label: '首页', key: 'home', icon: () => h(NIcon, ...) },
  { label: '系统管理', key: 'system', children: [...] },
]

<NMenu :options="menuOptions" />`

const horizontalCode = `<NMenu mode="horizontal" :options="options" />`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Menu 菜单</h2>

    <CodePreview title="垂直菜单" description="垂直方向的导航菜单，支持折叠" :code="basicCode">
      <NSpace vertical :size="12">
        <NSwitch v-model:value="collapsed">
          <template #checked>折叠</template>
          <template #unchecked>展开</template>
        </NSwitch>
        <div :style="{ width: collapsed ? '64px' : '240px', transition: 'width 0.3s', border: '1px solid #e8e8e8', borderRadius: '8px' }">
          <NMenu :options="menuOptions" :collapsed="collapsed" :collapsed-width="64" />
        </div>
      </NSpace>
    </CodePreview>

    <CodePreview title="水平菜单" description="水平方向的导航菜单" :code="horizontalCode">
      <NMenu mode="horizontal" :options="horizontalOptions" />
    </CodePreview>
  </div>
</template>
