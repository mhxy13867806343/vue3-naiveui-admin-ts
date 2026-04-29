<script setup lang="ts">
import { ref } from 'vue'
import draggable from 'vuedraggable'
import CodePreview from '@/components/common/CodePreview.vue'

interface ListItem {
  id: number
  name: string
  status: string
}

const list = ref<ListItem[]>([
  { id: 1, name: '完成项目需求文档', status: '已完成' },
  { id: 2, name: '设计数据库架构', status: '进行中' },
  { id: 3, name: '开发用户认证模块', status: '待开始' },
  { id: 4, name: '编写单元测试', status: '待开始' },
  { id: 5, name: '部署到测试环境', status: '待开始' },
  { id: 6, name: '代码审查', status: '进行中' },
  { id: 7, name: '性能优化', status: '待开始' },
  { id: 8, name: '编写用户手册', status: '待开始' },
])

const drag = ref(false)

const statusColor: Record<string, string> = {
  '已完成': 'bg-green-100 text-green-800',
  '进行中': 'bg-blue-100 text-blue-800',
  '待开始': 'bg-gray-100 text-gray-600',
}

const code = `import { ref } from 'vue'
import draggable from 'vuedraggable'

interface ListItem {
  id: number
  name: string
  status: string
}

const list = ref<ListItem[]>([
  { id: 1, name: '完成项目需求文档', status: '已完成' },
  { id: 2, name: '设计数据库架构', status: '进行中' },
  { id: 3, name: '开发用户认证模块', status: '待开始' },
])

const drag = ref(false)

// Template:
// <draggable
//   v-model="list"
//   item-key="id"
//   handle=".drag-handle"
//   ghost-class="opacity-50"
//   @start="drag = true"
//   @end="drag = false"
//   tag="ul"
// >
//   <template #item="{ element }">
//     <li>
//       <span class="drag-handle">☰</span>
//       <span>{{ element.name }}</span>
//       <span>{{ element.status }}</span>
//     </li>
//   </template>
// </draggable>`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">拖拽列表</h2>
    <CodePreview title="vuedraggable 拖拽列表" description="基于 vuedraggable 实现的可拖拽排序列表，支持拖拽手柄" :code="code">
      <p class="text-gray-500 mb-4">拖拽列表项可以重新排序，拖拽手柄为左侧图标。</p>
      <draggable
        v-model="list"
        item-key="id"
        handle=".drag-handle"
        ghost-class="opacity-50"
        @start="drag = true"
        @end="drag = false"
        tag="ul"
        class="space-y-2"
      >
        <template #item="{ element }">
          <li class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 cursor-default hover:bg-gray-100 transition-colors">
            <span class="drag-handle cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 text-lg select-none">☰</span>
            <span class="flex-1 text-sm">{{ element.name }}</span>
            <span class="text-xs px-2 py-1 rounded-full" :class="statusColor[element.status]">{{ element.status }}</span>
          </li>
        </template>
      </draggable>
      <div class="mt-4 p-3 bg-gray-50 rounded text-sm text-gray-500">
        <strong>当前顺序：</strong>{{ list.map(i => i.name).join(' → ') }}
      </div>
    </CodePreview>
  </div>
</template>
