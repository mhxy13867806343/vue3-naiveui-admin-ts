<script setup lang="ts">
/**
 * 看板拖拽 (Kanban Board)
 * 多列拖拽，支持列内排序与跨列移动
 */
import { ref } from 'vue'
import draggable from 'vuedraggable'
import { NCard, NTag } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

interface Task {
  id: number
  title: string
  priority: 'high' | 'medium' | 'low'
}
interface Column {
  key: string
  title: string
  color: string
  tasks: Task[]
}

const columns = ref<Column[]>([
  {
    key: 'todo', title: '待办', color: '#94a3b8',
    tasks: [
      { id: 1, title: '需求评审', priority: 'high' },
      { id: 2, title: '原型设计', priority: 'medium' },
      { id: 3, title: '接口对接', priority: 'low' },
    ],
  },
  {
    key: 'doing', title: '进行中', color: '#3b82f6',
    tasks: [
      { id: 4, title: '编写组件', priority: 'high' },
      { id: 5, title: '联调测试', priority: 'medium' },
    ],
  },
  {
    key: 'review', title: '审核', color: '#f59e0b',
    tasks: [{ id: 6, title: 'Code Review', priority: 'medium' }],
  },
  {
    key: 'done', title: '已完成', color: '#10b981',
    tasks: [
      { id: 7, title: '上线发布', priority: 'high' },
      { id: 8, title: '文档归档', priority: 'low' },
    ],
  },
])

const priorityColor = { high: 'error', medium: 'warning', low: 'success' } as const
const priorityText = { high: '高', medium: '中', low: '低' } as const

const code = `<draggable
  v-for="col in columns"
  :key="col.key"
  v-model="col.tasks"
  :group="{ name: 'kanban' }"
  item-key="id"
  ghost-class="ghost"
  class="kanban-col"
>
  <template #item="{ element }">
    <div class="kanban-card">{{ element.title }}</div>
  </template>
</draggable>`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">看板拖拽</h2>
    <CodePreview
      title="Kanban Board"
      description="多列拖拽，支持列内排序与跨列移动 (group 同名即可跨列)"
      :code="code"
    >
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <NCard
          v-for="col in columns"
          :key="col.key"
          :title="col.title + ` (${col.tasks.length})`"
          size="small"
          :style="{ borderTop: `3px solid ${col.color}` }"
        >
          <draggable
            v-model="col.tasks"
            :group="{ name: 'kanban' }"
            item-key="id"
            ghost-class="kanban-ghost"
            animation="200"
            class="min-h-[200px] space-y-2"
          >
            <template #item="{ element }">
              <div class="p-3 bg-white border border-gray-200 rounded-lg shadow-sm cursor-grab active:cursor-grabbing hover:shadow-md transition">
                <div class="text-sm font-medium mb-2">{{ (element as Task).title }}</div>
                <NTag :type="priorityColor[(element as Task).priority]" size="small" :bordered="false">
                  {{ priorityText[(element as Task).priority] }}优先级
                </NTag>
              </div>
            </template>
          </draggable>
        </NCard>
      </div>
    </CodePreview>
  </div>
</template>

<style scoped>
.kanban-ghost {
  opacity: 0.4;
  background: #dbeafe;
}
</style>
