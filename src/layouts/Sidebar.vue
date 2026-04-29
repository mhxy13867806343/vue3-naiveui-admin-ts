<script setup lang="ts">
/**
 * 侧边栏组件
 * 使用 Naive UI NMenu 渲染导航菜单，支持折叠、嵌套菜单、路由高亮
 */
import { h, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { NMenu, NIcon, NLayoutSider } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import { usePermissionStore } from '@/stores/permission'

const props = defineProps<{
  collapsed: boolean
}>()

const emit = defineEmits<{
  'update:collapsed': [value: boolean]
}>()

const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const permissionStore = usePermissionStore()

/** 根据动态路由和权限生成菜单数据 */
const menuOptions = computed<MenuOption[]>(() => {
  const options: MenuOption[] = []

  if (permissionStore.hasPermission('dashboard:view')) {
    options.push({
      label: () => t('menu.dashboard'),
      key: '/dashboard',
      icon: () => h(NIcon, null, { default: () => h('span', '📊') }),
    })
  }

  if (permissionStore.hasPermission('permission:view')) {
    options.push({
      label: () => t('menu.permissionManagement'),
      key: '/permission-management',
      icon: () => h(NIcon, null, { default: () => h('span', '🔐') }),
    })
  }

  return options
})

/** 当前激活的菜单项 */
const activeKey = computed(() => {
  return route.path
})

/** 菜单项点击导航 */
function handleMenuUpdate(key: string) {
  router.push(key)
}
</script>

<template>
  <NLayoutSider
    bordered
    :collapsed="props.collapsed"
    collapse-mode="width"
    :collapsed-width="64"
    :width="240"
    show-trigger
    @collapse="emit('update:collapsed', true)"
    @expand="emit('update:collapsed', false)"
    class="h-full"
  >
    <div class="p-4 text-center font-bold text-lg">
      {{ props.collapsed ? '📋' : 'Admin' }}
    </div>
    <NMenu
      :collapsed="props.collapsed"
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :options="menuOptions"
      :value="activeKey"
      @update:value="handleMenuUpdate"
    />
  </NLayoutSider>
</template>
