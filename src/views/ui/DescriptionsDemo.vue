<script setup lang="ts">
import { NDescriptions, NDescriptionsItem, NTag } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const basicCode = `<NDescriptions label-placement="left" :column="2">
  <NDescriptionsItem label="姓名">张三</NDescriptionsItem>
  <NDescriptionsItem label="年龄">28</NDescriptionsItem>
  <NDescriptionsItem label="城市">北京</NDescriptionsItem>
  <NDescriptionsItem label="职业">前端工程师</NDescriptionsItem>
</NDescriptions>`

const borderedCode = `<NDescriptions label-placement="left" bordered :column="2">
  <NDescriptionsItem label="项目">Admin Dashboard</NDescriptionsItem>
</NDescriptions>`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Descriptions 描述列表</h2>

    <CodePreview title="基础用法" description="基础的描述列表" :code="basicCode">
      <NDescriptions label-placement="left" :column="2" title="用户信息">
        <NDescriptionsItem label="姓名">张三</NDescriptionsItem>
        <NDescriptionsItem label="年龄">28</NDescriptionsItem>
        <NDescriptionsItem label="城市">北京</NDescriptionsItem>
        <NDescriptionsItem label="职业">前端工程师</NDescriptionsItem>
        <NDescriptionsItem label="邮箱">zhangsan@example.com</NDescriptionsItem>
        <NDescriptionsItem label="状态"><NTag type="success" size="small">在职</NTag></NDescriptionsItem>
      </NDescriptions>
    </CodePreview>

    <CodePreview title="带边框" description="设置 bordered 属性添加边框" :code="borderedCode">
      <NDescriptions label-placement="left" bordered :column="2" title="项目信息">
        <NDescriptionsItem label="项目名称">Vue Admin Dashboard</NDescriptionsItem>
        <NDescriptionsItem label="版本"><NTag size="small" type="info">v1.0.0</NTag></NDescriptionsItem>
        <NDescriptionsItem label="框架">Vue 3</NDescriptionsItem>
        <NDescriptionsItem label="UI 库">Naive UI</NDescriptionsItem>
        <NDescriptionsItem label="构建工具">Vite</NDescriptionsItem>
        <NDescriptionsItem label="语言">TypeScript</NDescriptionsItem>
      </NDescriptions>
    </CodePreview>
  </div>
</template>
