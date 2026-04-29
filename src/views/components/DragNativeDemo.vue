<script setup lang="ts">
/**
 * 原生 HTML5 拖拽 (Native Drag & Drop)
 * 文件拖入上传 + DataTransfer API
 */
import { ref } from 'vue'
import { NCard, NTag, NButton, NList, NListItem } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

interface FileItem { name: string; size: number; type: string }

const isOver = ref(false)
const files = ref<FileItem[]>([])

function fmt(bytes: number) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / 1024 / 1024).toFixed(2) + ' MB'
}

function onDragOver(e: DragEvent) {
  e.preventDefault()
  isOver.value = true
}
function onDragLeave() {
  isOver.value = false
}
function onDrop(e: DragEvent) {
  e.preventDefault()
  isOver.value = false
  const dt = e.dataTransfer
  if (!dt) return
  const arr = Array.from(dt.files).map((f) => ({ name: f.name, size: f.size, type: f.type || '未知' }))
  files.value = [...files.value, ...arr]
}
function clear() { files.value = [] }

// === 文本拖拽演示 ===
const tags = ref(['Vue', 'React', 'Svelte', 'Solid', 'Angular'])
const target = ref<string[]>([])
function onTagDragStart(e: DragEvent, tag: string) {
  e.dataTransfer?.setData('text/plain', tag)
}
function onTargetDrop(e: DragEvent) {
  e.preventDefault()
  const tag = e.dataTransfer?.getData('text/plain')
  if (tag && !target.value.includes(tag)) target.value.push(tag)
}

const code = `// 文件拖入
function onDrop(e: DragEvent) {
  e.preventDefault()
  const arr = Array.from(e.dataTransfer!.files)
  // 处理文件
}

// 文本拖拽
function onDragStart(e, tag) {
  e.dataTransfer.setData('text/plain', tag)
}
function onDrop(e) {
  const tag = e.dataTransfer.getData('text/plain')
}`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">原生 HTML5 拖放</h2>
    <CodePreview
      title="Native Drag & Drop API"
      description="基于 HTML5 DataTransfer 实现：文件拖入 + 文本数据拖拽，无需任何第三方库"
      :code="code"
    >
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <!-- 文件拖入 -->
        <NCard title="📁 拖入文件上传" size="small">
          <div
            class="border-2 border-dashed rounded-lg p-8 text-center transition cursor-pointer"
            :class="isOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'"
            @dragover="onDragOver"
            @dragleave="onDragLeave"
            @drop="onDrop"
          >
            <div class="text-4xl mb-2">{{ isOver ? '📥' : '📎' }}</div>
            <p class="text-sm text-gray-600">
              {{ isOver ? '松开鼠标完成上传' : '将文件拖到此处' }}
            </p>
          </div>
          <div class="mt-3 flex items-center justify-between">
            <span class="text-xs text-gray-500">已上传 {{ files.length }} 个文件</span>
            <NButton size="tiny" @click="clear">清空</NButton>
          </div>
          <NList v-if="files.length" class="mt-3" hoverable>
            <NListItem v-for="(f, i) in files" :key="i">
              <div class="flex items-center justify-between w-full">
                <span class="text-sm truncate">{{ f.name }}</span>
                <span class="text-xs text-gray-400">{{ fmt(f.size) }}</span>
              </div>
            </NListItem>
          </NList>
        </NCard>

        <!-- 文本拖拽 -->
        <NCard title="🏷️ 拖拽标签" size="small">
          <div class="text-xs text-gray-500 mb-2">从左侧拖标签到右侧框：</div>
          <div class="flex gap-3">
            <div class="flex-1 p-3 bg-gray-50 rounded-lg space-y-2 min-h-[120px]">
              <NTag
                v-for="t in tags"
                :key="t"
                draggable="true"
                class="cursor-grab"
                @dragstart="onTagDragStart($event, t)"
              >{{ t }}</NTag>
            </div>
            <div
              class="flex-1 p-3 border-2 border-dashed border-gray-300 rounded-lg min-h-[120px] space-y-2"
              @dragover.prevent
              @drop="onTargetDrop"
            >
              <div v-if="!target.length" class="text-xs text-gray-400 text-center mt-8">
                拖到这里
              </div>
              <NTag v-for="t in target" :key="t" type="success">{{ t }}</NTag>
            </div>
          </div>
        </NCard>
      </div>
    </CodePreview>
  </div>
</template>
