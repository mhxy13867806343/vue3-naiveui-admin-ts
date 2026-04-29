<script setup lang="ts">
/**
 * 多级路由 1-3-1
 * Card 卡片：基础、可悬浮、网格排列
 */
import { NCard, NGrid, NGridItem, NBreadcrumb, NBreadcrumbItem, NDivider, NTag, NSpace } from 'naive-ui'

const list = [
  { title: '总用户数', value: '1,284', color: '#18a058', tag: '+12%' },
  { title: '今日订单', value: '328', color: '#2080f0', tag: '+5%' },
  { title: '待处理', value: '47', color: '#f0a020', tag: '紧急' },
  { title: '系统异常', value: '2', color: '#d03050', tag: '需关注' },
]
</script>

<template>
  <div class="p-4">
    <NBreadcrumb>
      <NBreadcrumbItem>多级路由</NBreadcrumbItem>
      <NBreadcrumbItem>1-3</NBreadcrumbItem>
      <NBreadcrumbItem>1-3-1</NBreadcrumbItem>
    </NBreadcrumb>
    <NDivider />
    <NSpace vertical size="large">
      <NGrid :cols="4" :x-gap="12" :y-gap="12" responsive="screen">
        <NGridItem v-for="item in list" :key="item.title">
          <NCard hoverable size="small">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-gray-500 text-sm">{{ item.title }}</div>
                <div class="text-2xl font-bold mt-2" :style="{ color: item.color }">
                  {{ item.value }}
                </div>
              </div>
              <NTag :bordered="false" size="small">{{ item.tag }}</NTag>
            </div>
          </NCard>
        </NGridItem>
      </NGrid>
      <NCard title="1-3-1 · Card 卡片说明" size="small">
        <p class="text-gray-600 leading-7">
          演示 <code>NCard</code> 与 <code>NGrid</code> 的组合，实现常见的指标看板。
          <code>hoverable</code> 提供悬浮反馈，<code>responsive="screen"</code> 让网格在不同断点自动调整列数。
        </p>
      </NCard>
    </NSpace>
  </div>
</template>
