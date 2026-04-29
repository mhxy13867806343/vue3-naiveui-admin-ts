<script setup lang="ts">
import { NCard, NDescriptions, NDescriptionsItem, NTag, NSpace, NButton, NGrid, NGridItem } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const techStack = [
  { name: 'Vue 3', version: '3.5+', desc: '渐进式 JavaScript 框架' },
  { name: 'TypeScript', version: '5.x', desc: '类型安全的 JavaScript 超集' },
  { name: 'Naive UI', version: '2.x', desc: 'Vue 3 组件库' },
  { name: 'Vue Router', version: '4.x', desc: '官方路由管理器' },
  { name: 'Vue I18n', version: '9.x', desc: '国际化插件' },
  { name: 'Pinia', version: '2.x', desc: '状态管理库' },
  { name: 'ECharts', version: '5.x', desc: '数据可视化图表库' },
  { name: 'Vite', version: '6.x', desc: '下一代前端构建工具' },
  { name: 'Tailwind CSS', version: '4.x', desc: '原子化 CSS 框架' },
]

const code = `<NDescriptions label-placement="left" bordered :column="2">
  <NDescriptionsItem label="项目名称">Vue Admin Dashboard</NDescriptionsItem>
  <NDescriptionsItem label="版本号">1.0.0</NDescriptionsItem>
  <NDescriptionsItem label="技术栈">Vue 3 + Naive UI + TypeScript</NDescriptionsItem>
</NDescriptions>`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">关于 About</h2>

    <CodePreview title="项目信息" description="使用 NDescriptions 展示项目基本信息" :code="code">
      <NCard title="📋 Vue Admin Dashboard">
        <NDescriptions label-placement="left" bordered :column="2">
          <NDescriptionsItem label="项目名称">Vue Admin Dashboard</NDescriptionsItem>
          <NDescriptionsItem label="版本号">
            <NTag type="success" size="small">v1.0.0</NTag>
          </NDescriptionsItem>
          <NDescriptionsItem label="描述">基于 Vue 3 + Naive UI 的中后台管理系统模板</NDescriptionsItem>
          <NDescriptionsItem label="许可证">MIT License</NDescriptionsItem>
          <NDescriptionsItem label="作者">Admin Team</NDescriptionsItem>
          <NDescriptionsItem label="最后更新">2024-01-15</NDescriptionsItem>
        </NDescriptions>
      </NCard>
    </CodePreview>

    <CodePreview title="技术栈" description="项目使用的核心技术和工具" :code="`techStack.map(t => \`\${t.name} \${t.version}\`)`">
      <NGrid :cols="3" :x-gap="12" :y-gap="12">
        <NGridItem v-for="tech in techStack" :key="tech.name">
          <NCard size="small" hoverable>
            <div style="display: flex; justify-content: space-between; align-items: center">
              <strong>{{ tech.name }}</strong>
              <NTag size="small" type="info">{{ tech.version }}</NTag>
            </div>
            <p style="margin-top: 8px; color: #999; font-size: 13px">{{ tech.desc }}</p>
          </NCard>
        </NGridItem>
      </NGrid>
    </CodePreview>

    <CodePreview title="相关链接" description="项目仓库和文档链接" :code="`<NButton tag='a' href='...' target='_blank'>GitHub</NButton>`">
      <NSpace>
        <NButton tag="a" href="https://github.com/mhxy13867806343/vue3-naiveui-admin-ts" target="_blank" type="primary">🐙 GitHub项目地址</NButton>
        <NButton tag="a" href="https://gitee.com/fangjiayu/vue3-naiveui-admin-ts" target="_blank" type="warning">🟠 Gitee项目地址</NButton>
        <NButton tag="a" href="https://www.naiveui.com" target="_blank" type="info">📚 Naive UI 文档</NButton>
        <NButton tag="a" href="https://vuejs.org" target="_blank" type="success">💚 Vue.js 官网</NButton>
      </NSpace>
    </CodePreview>
  </div>
</template>
