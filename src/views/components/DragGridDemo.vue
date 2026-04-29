<script setup lang="ts">
/**
 * 拖拽排序网格 (Drag Sort Grid)
 * 卡片网格拖拽重排
 */
import { ref } from 'vue'
import draggable from 'vuedraggable'
import { NButton } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

interface Photo {
  id: number
  title: string
  color: string
  emoji: string
}

const palette = ['#fde68a', '#bbf7d0', '#bfdbfe', '#fbcfe8', '#ddd6fe', '#fed7aa', '#a7f3d0', '#fecaca']
const emojis = ['🍎', '🍊', '🍋', '🍇', '🍉', '🍓', '🥝', '🍑', '🥭', '🍒']

const list = ref<Photo[]>(
  Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: `卡片 ${i + 1}`,
    color: palette[i % palette.length],
    emoji: emojis[i % emojis.length],
  })),
)

function shuffle() {
  list.value = [...list.value].sort(() => Math.random() - 0.5)
}

const code = `<draggable
  v-model="list"
  item-key="id"
  ghost-class="ghost"
  animation="250"
  class="grid grid-cols-5 gap-3"
>
  <template #item="{ element }">
    <div class="aspect-square rounded-xl flex items-center justify-center cursor-grab">
      {{ element.emoji }}
    </div>
  </template>
</draggable>`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">拖拽排序网格</h2>
    <CodePreview
      title="Drag Sort Grid"
      description="卡片网格拖拽重排，可用于图片墙、Dashboard 小部件排序等场景"
      :code="code"
    >
      <div class="mb-4">
        <NButton size="small" @click="shuffle">🔀 随机打乱</NButton>
      </div>
      <draggable
        v-model="list"
        item-key="id"
        ghost-class="grid-ghost"
        animation="250"
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3"
      >
        <template #item="{ element }">
          <div
            class="aspect-square rounded-xl flex flex-col items-center justify-center cursor-grab active:cursor-grabbing select-none shadow-sm hover:shadow-md transition"
            :style="{ background: (element as Photo).color }"
          >
            <span class="text-4xl mb-1">{{ (element as Photo).emoji }}</span>
            <span class="text-xs text-gray-700">{{ (element as Photo).title }}</span>
          </div>
        </template>
      </draggable>
    </CodePreview>
  </div>
</template>

<style scoped>
.grid-ghost {
  opacity: 0.3;
  transform: scale(0.95);
}
</style>
