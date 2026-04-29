<script setup lang="ts">
/**
 * 后台管理布局
 * 左侧固定侧边栏 + 右侧内容区域（Header + router-view）
 */
import { ref, onMounted } from 'vue'
import { NLayout, NLayoutContent, NLayoutHeader } from 'naive-ui'
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'
import { usePermissionStore } from '@/stores/permission'

const collapsed = ref(false)
const permissionStore = usePermissionStore()

onMounted(async () => {
  // 确保权限已加载
  if (permissionStore.permissions.length === 0) {
    await permissionStore.loadPermissions()
  }
})
</script>

<template>
  <NLayout has-sider class="h-screen">
    <Sidebar v-model:collapsed="collapsed" />
    <NLayout>
      <NLayoutHeader bordered class="h-14">
        <Header />
      </NLayoutHeader>
      <NLayoutContent
        content-class="p-6"
        class="bg-gray-50"
        :native-scrollbar="false"
      >
        <router-view />
      </NLayoutContent>
    </NLayout>
  </NLayout>
</template>
