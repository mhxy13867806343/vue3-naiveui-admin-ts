<script setup lang="ts">
import { NBreadcrumb, NBreadcrumbItem, NSpace } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const basicCode = `<NBreadcrumb>
  <NBreadcrumbItem>首页</NBreadcrumbItem>
  <NBreadcrumbItem>系统管理</NBreadcrumbItem>
  <NBreadcrumbItem>用户管理</NBreadcrumbItem>
</NBreadcrumb>`

const iconCode = `<NBreadcrumb>
  <NBreadcrumbItem>🏠 首页</NBreadcrumbItem>
  <NBreadcrumbItem>📊 仪表盘</NBreadcrumbItem>
  <NBreadcrumbItem>📈 数据分析</NBreadcrumbItem>
</NBreadcrumb>`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Breadcrumb 面包屑</h2>

    <CodePreview title="基础用法" description="基础的面包屑导航" :code="basicCode">
      <NSpace vertical :size="16">
        <NBreadcrumb>
          <NBreadcrumbItem>首页</NBreadcrumbItem>
          <NBreadcrumbItem>系统管理</NBreadcrumbItem>
          <NBreadcrumbItem>用户管理</NBreadcrumbItem>
        </NBreadcrumb>
        <NBreadcrumb>
          <NBreadcrumbItem>首页</NBreadcrumbItem>
          <NBreadcrumbItem>内容管理</NBreadcrumbItem>
          <NBreadcrumbItem>文章管理</NBreadcrumbItem>
          <NBreadcrumbItem>编辑文章</NBreadcrumbItem>
        </NBreadcrumb>
      </NSpace>
    </CodePreview>

    <CodePreview title="带图标" description="面包屑项可以包含图标" :code="iconCode">
      <NSpace vertical :size="16">
        <NBreadcrumb>
          <NBreadcrumbItem>🏠 首页</NBreadcrumbItem>
          <NBreadcrumbItem>📊 仪表盘</NBreadcrumbItem>
          <NBreadcrumbItem>📈 数据分析</NBreadcrumbItem>
        </NBreadcrumb>
        <NBreadcrumb separator=">">
          <NBreadcrumbItem>🏠 Home</NBreadcrumbItem>
          <NBreadcrumbItem>⚙️ Settings</NBreadcrumbItem>
          <NBreadcrumbItem>👤 Profile</NBreadcrumbItem>
        </NBreadcrumb>
      </NSpace>
    </CodePreview>
  </div>
</template>
