<script setup lang="ts">
/**
 * usePagination Hook 演示页面
 */
import { watch } from 'vue'
import { NButton, NAlert, NSpace, NInputNumber, NTag, NPagination } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'
import { usePagination } from '@/composables/usePagination'

const { page, pageSize, total, pageCount, onPageChange, onPageSizeChange } = usePagination({
  defaultPage: 1,
  defaultPageSize: 10,
})

// 模拟总数
total.value = 86

const code = `import { usePagination } from '@/composables/usePagination'

const { page, pageSize, total, pageCount, onPageChange, onPageSizeChange } = usePagination({
  defaultPage: 1,
  defaultPageSize: 10,
})

total.value = 86

// page 超过 pageCount 时自动修正
// 切换 pageSize 后自动重置到第一页`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">usePagination</h2>
    <CodePreview
      title="分页状态管理"
      description="usePagination 提供分页相关响应式状态，pageCount 自动计算，page 超出时自动修正"
      :code="code"
    >
      <NAlert type="info" title="说明" class="mb-4">
        修改总条数或每页条数，观察分页状态的自动计算和修正行为。
      </NAlert>

      <NSpace vertical :size="16">
        <NSpace align="center">
          <span>总条数：</span>
          <NInputNumber :value="total" :min="0" :max="500" @update:value="(v: number | null) => total = v ?? 0" />
        </NSpace>

        <NSpace align="center" :size="16">
          <NTag type="info">当前页: {{ page }}</NTag>
          <NTag type="success">每页条数: {{ pageSize }}</NTag>
          <NTag type="warning">总页数: {{ pageCount }}</NTag>
          <NTag>总条数: {{ total }}</NTag>
        </NSpace>

        <NPagination
          :page="page"
          :page-size="pageSize"
          :item-count="total"
          show-size-picker
          :page-sizes="[5, 10, 20, 50]"
          @update:page="onPageChange"
          @update:page-size="onPageSizeChange"
        />
      </NSpace>
    </CodePreview>
  </div>
</template>
