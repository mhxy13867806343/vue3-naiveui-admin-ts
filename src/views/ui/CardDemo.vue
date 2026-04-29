<script setup lang="ts">
import { NCard, NSpace, NButton, NGrid, NGridItem } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const basicCode = `<NCard title="卡片标题">
  <p>卡片内容</p>
</NCard>`

const actionCode = `<NCard title="带操作的卡片">
  <template #header-extra><NButton size="small">更多</NButton></template>
  <p>内容</p>
  <template #footer>页脚</template>
  <template #action><NButton type="primary">操作</NButton></template>
</NCard>`

const hoverCode = `<NCard title="悬浮效果" hoverable>内容</NCard>`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Card 卡片</h2>

    <CodePreview title="基础用法" description="基础的卡片容器" :code="basicCode">
      <NGrid :cols="3" :x-gap="16">
        <NGridItem><NCard title="卡片一"><p>这是卡片内容</p></NCard></NGridItem>
        <NGridItem><NCard title="卡片二"><p>这是卡片内容</p></NCard></NGridItem>
        <NGridItem><NCard title="卡片三"><p>这是卡片内容</p></NCard></NGridItem>
      </NGrid>
    </CodePreview>

    <CodePreview title="带操作" description="卡片支持 header-extra、footer、action 插槽" :code="actionCode">
      <NCard title="项目信息" style="max-width: 400px">
        <template #header-extra><NButton size="small" quaternary>更多</NButton></template>
        <p>这是一个带有操作按钮的卡片示例。</p>
        <template #footer><span style="color: #999; font-size: 13px">更新于 2024-01-15</span></template>
        <template #action>
          <NSpace>
            <NButton type="primary" size="small">编辑</NButton>
            <NButton size="small">取消</NButton>
          </NSpace>
        </template>
      </NCard>
    </CodePreview>

    <CodePreview title="悬浮效果" description="设置 hoverable 属性添加悬浮效果" :code="hoverCode">
      <NGrid :cols="3" :x-gap="16">
        <NGridItem><NCard title="Hoverable" hoverable><p>鼠标悬浮试试</p></NCard></NGridItem>
        <NGridItem><NCard title="Hoverable" hoverable><p>鼠标悬浮试试</p></NCard></NGridItem>
        <NGridItem><NCard title="Hoverable" hoverable><p>鼠标悬浮试试</p></NCard></NGridItem>
      </NGrid>
    </CodePreview>
  </div>
</template>
