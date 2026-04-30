<script setup lang="ts">
/**
 * Attachments 附件上传 Demo
 * 拖拽 / 点击上传，图片缩略图预览，模拟上传进度
 */
import { ref } from 'vue'
import { NCard, NUpload, NUploadDragger, NIcon, NEmpty, NProgress, NButton, useMessage } from 'naive-ui'

interface AttachItem {
  id: string
  name: string
  size: number
  type: string
  url?: string // 图片预览
  progress: number
  status: 'uploading' | 'done' | 'error'
}

const message = useMessage()
const items = ref<AttachItem[]>([])

function formatSize(bytes: number) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / 1024 / 1024).toFixed(1) + ' MB'
}

function fileIcon(type: string, name: string) {
  if (type.startsWith('image/')) return '🖼'
  if (type.startsWith('video/')) return '🎬'
  if (type.startsWith('audio/')) return '🎵'
  if (/\.(zip|rar|7z|tar|gz)$/i.test(name)) return '📦'
  if (/\.(pdf)$/i.test(name)) return '📕'
  if (/\.(doc|docx)$/i.test(name)) return '📘'
  if (/\.(xls|xlsx|csv)$/i.test(name)) return '📗'
  if (/\.(md|txt|log)$/i.test(name)) return '📝'
  if (/\.(js|ts|vue|tsx|jsx|json|html|css)$/i.test(name)) return '⚙️'
  return '📄'
}

function handleAdd({ file }: { file: { file: File | null } }) {
  const f = file.file
  if (!f) return false
  const id = Date.now() + '-' + f.name
  const item: AttachItem = {
    id,
    name: f.name,
    size: f.size,
    type: f.type,
    progress: 0,
    status: 'uploading',
    url: f.type.startsWith('image/') ? URL.createObjectURL(f) : undefined,
  }
  items.value.push(item)
  // 模拟上传进度
  const timer = setInterval(() => {
    const target = items.value.find((i) => i.id === id)
    if (!target) return clearInterval(timer)
    target.progress += Math.floor(Math.random() * 25) + 5
    if (target.progress >= 100) {
      target.progress = 100
      target.status = 'done'
      clearInterval(timer)
    }
  }, 200)
  return false // 阻止 NUpload 默认上传
}

function remove(id: string) {
  const target = items.value.find((i) => i.id === id)
  if (target?.url) URL.revokeObjectURL(target.url)
  items.value = items.value.filter((i) => i.id !== id)
}

function clearAll() {
  items.value.forEach((i) => i.url && URL.revokeObjectURL(i.url))
  items.value = []
  message.success('已清空')
}
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Attachments 附件上传</h2>
    <NCard>
      <NUpload
        multiple
        :show-file-list="false"
        :default-upload="false"
        :on-before-upload="handleAdd as any"
      >
        <NUploadDragger>
          <div style="margin-bottom: 12px"><NIcon size="48">📥</NIcon></div>
          <div style="font-size: 16px">点击或拖拽文件到此区域</div>
          <div style="font-size: 12px; color: #999; margin-top: 6px">
            支持图片 / 文档 / 代码 等多种类型，多文件批量上传
          </div>
        </NUploadDragger>
      </NUpload>

      <div class="flex justify-between items-center mt-4 mb-2">
        <span class="text-sm text-gray-500">已添加 {{ items.length }} 个附件</span>
        <NButton v-if="items.length" size="small" quaternary @click="clearAll">🗑 清空</NButton>
      </div>

      <NEmpty v-if="!items.length" description="还没有附件" />
      <div v-else class="files-grid">
        <div v-for="it in items" :key="it.id" class="file-item">
          <div class="file-icon">
            <img v-if="it.url" :src="it.url" alt="preview" />
            <span v-else class="emoji">{{ fileIcon(it.type, it.name) }}</span>
          </div>
          <div class="file-info">
            <div class="file-name" :title="it.name">{{ it.name }}</div>
            <div class="file-meta">{{ formatSize(it.size) }} · {{ it.type || '未知类型' }}</div>
            <NProgress
              v-if="it.status === 'uploading'"
              type="line"
              :percentage="it.progress"
              :height="6"
              :show-indicator="false"
            />
            <div v-else-if="it.status === 'done'" class="file-status success">✅ 上传完成</div>
          </div>
          <NButton size="tiny" quaternary @click="remove(it.id)">✕</NButton>
        </div>
      </div>
    </NCard>
  </div>
</template>

<style scoped>
.files-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 12px;
}
.file-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
}
.file-icon {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 6px;
  background: #f3f4f6;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.file-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.file-icon .emoji {
  font-size: 24px;
}
.file-info {
  flex: 1;
  min-width: 0;
}
.file-name {
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.file-meta {
  font-size: 11px;
  color: #9ca3af;
  margin: 2px 0 4px;
}
.file-status.success {
  font-size: 11px;
  color: #18a058;
}
</style>
