<script setup lang="ts">
/**
 * 后台管理布局
 * 左侧固定侧边栏 + 右侧内容区域（Header + router-view）
 */
import { ref } from 'vue'
import { NLayout, NLayoutContent, NLayoutHeader } from 'naive-ui'
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'

const collapsed = ref(false)
</script>

<template>
  <NLayout has-sider class="h-screen">
    <Sidebar v-model:collapsed="collapsed" />
    <NLayout>
      <NLayoutHeader bordered class="h-16">
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
