<script setup lang="ts">
import { NEmpty, NSpace, NButton, NCard, NGrid, NGridItem } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const basicCode = `<NEmpty description="暂无数据" />`
const customCode = `<NEmpty description="没有找到结果">
  <template #extra>
    <NButton size="small" type="primary">刷新</NButton>
  </template>
</NEmpty>`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Empty 空状态</h2>

    <CodePreview title="基础用法" description="默认的空状态展示" :code="basicCode">
      <NEmpty description="暂无数据" />
    </CodePreview>

    <CodePreview title="自定义" description="自定义描述文字和额外内容" :code="customCode">
      <NGrid :cols="3" :x-gap="16">
        <NGridItem>
          <NCard size="small">
            <NEmpty description="暂无搜索结果">
              <template #extra><NButton size="small">清除筛选</NButton></template>
            </NEmpty>
          </NCard>
        </NGridItem>
        <NGridItem>
          <NCard size="small">
            <NEmpty description="暂无消息">
              <template #icon><span style="font-size: 36px">📭</span></template>
            </NEmpty>
          </NCard>
        </NGridItem>
        <NGridItem>
          <NCard size="small">
            <NEmpty description="暂无收藏">
              <template #icon><span style="font-size: 36px">⭐</span></template>
              <template #extra><NButton size="small" type="primary">去收藏</NButton></template>
            </NEmpty>
          </NCard>
        </NGridItem>
      </NGrid>
    </CodePreview>
  </div>
</template>
