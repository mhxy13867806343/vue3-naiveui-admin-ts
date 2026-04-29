<script setup lang="ts">
/**
 * 多级路由 1-2-1
 * Tag 标签：基础、可关闭、可选中
 */
import { ref } from 'vue'
import { NCard, NSpace, NTag, NBreadcrumb, NBreadcrumbItem, NDivider, NButton } from 'naive-ui'

const tags = ref(['Vue', 'Naive UI', 'TypeScript', 'Vite'])
function removeTag(idx: number) {
  tags.value.splice(idx, 1)
}
function resetTags() {
  tags.value = ['Vue', 'Naive UI', 'TypeScript', 'Vite']
}

const checked = ref<string[]>(['前端'])
const checkable = ['前端', '后端', '运维', '设计']
</script>

<template>
  <div class="p-4">
    <NBreadcrumb>
      <NBreadcrumbItem>多级路由</NBreadcrumbItem>
      <NBreadcrumbItem>1-2</NBreadcrumbItem>
      <NBreadcrumbItem>1-2-1</NBreadcrumbItem>
    </NBreadcrumb>
    <NDivider />
    <NCard title="1-2-1 · Tag 标签" size="small">
      <NSpace vertical size="large">
        <NSpace>
          <NTag>默认</NTag>
          <NTag type="primary">Primary</NTag>
          <NTag type="info">Info</NTag>
          <NTag type="success">Success</NTag>
          <NTag type="warning">Warning</NTag>
          <NTag type="error">Error</NTag>
        </NSpace>
        <NSpace>
          <NTag
            v-for="(t, i) in tags"
            :key="t"
            closable
            type="primary"
            @close="removeTag(i)"
          >
            {{ t }}
          </NTag>
          <NButton size="tiny" @click="resetTags">重置</NButton>
        </NSpace>
        <NSpace>
          <NTag
            v-for="t in checkable"
            :key="t"
            checkable
            :checked="checked.includes(t)"
            @update:checked="(v) => v ? checked.push(t) : checked.splice(checked.indexOf(t), 1)"
          >
            {{ t }}
          </NTag>
        </NSpace>
        <div class="text-gray-500 text-sm">已选: {{ checked.join('、') || '无' }}</div>
      </NSpace>
    </NCard>
  </div>
</template>
