<script setup lang="ts">
/**
 * FileCard 文件卡片 Demo
 * 只读型文件卡片：用于展示已上传/引用的文件元数据 + 操作（不含上传逻辑）
 * 与 Attachments（上传）的区别：聚焦展示与交互（预览/下载/删除/详情）
 */
import { ref, computed } from 'vue'
import {
  NCard, NSpace, NButton, NButtonGroup, NTag, NEmpty, NSelect, useMessage, NPopconfirm,
} from 'naive-ui'
import dayjs from 'dayjs'

interface FileMeta {
  id: string
  name: string
  size: number
  type: string
  ext: string
  owner: string
  time: number
}

const message = useMessage()

const list = ref<FileMeta[]>([
  { id: 'f1', name: '产品需求文档.docx', size: 245760, type: 'doc', ext: 'docx', owner: 'Alice', time: Date.now() - 1000 * 60 * 30 },
  { id: 'f2', name: '架构图.png', size: 1820000, type: 'image', ext: 'png', owner: 'Bob', time: Date.now() - 1000 * 60 * 60 * 2 },
  { id: 'f3', name: 'data.csv', size: 51200, type: 'sheet', ext: 'csv', owner: 'Cathy', time: Date.now() - 1000 * 60 * 60 * 24 },
  { id: 'f4', name: 'main.ts', size: 3072, type: 'code', ext: 'ts', owner: '我', time: Date.now() - 1000 * 60 * 5 },
  { id: 'f5', name: 'ChatGPT 对话记录.pdf', size: 845000, type: 'pdf', ext: 'pdf', owner: 'AI 助手', time: Date.now() - 1000 * 60 * 60 * 24 * 3 },
  { id: 'f6', name: 'logo.svg', size: 8192, type: 'image', ext: 'svg', owner: 'Bob', time: Date.now() - 1000 * 60 * 60 * 24 * 7 },
])

const view = ref<'grid' | 'list'>('grid')
const sort = ref<'time' | 'name' | 'size'>('time')
const filter = ref<'all' | 'image' | 'doc' | 'code' | 'sheet' | 'pdf'>('all')

const sortOptions = [
  { label: '按时间', value: 'time' },
  { label: '按名称', value: 'name' },
  { label: '按大小', value: 'size' },
]

const filterOptions = [
  { label: '全部', value: 'all' },
  { label: '图片', value: 'image' },
  { label: '文档', value: 'doc' },
  { label: '代码', value: 'code' },
  { label: '表格', value: 'sheet' },
  { label: 'PDF', value: 'pdf' },
]

const filtered = computed(() => {
  let arr = list.value
  if (filter.value !== 'all') arr = arr.filter((f) => f.type === filter.value)
  arr = [...arr].sort((a, b) => {
    if (sort.value === 'time') return b.time - a.time
    if (sort.value === 'name') return a.name.localeCompare(b.name)
    return b.size - a.size
  })
  return arr
})

function formatSize(bytes: number) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / 1024 / 1024).toFixed(1) + ' MB'
}

function iconOf(type: string) {
  return { image: '🖼', doc: '📘', code: '⚙️', sheet: '📗', pdf: '📕' }[type] || '📄'
}

function colorOf(type: string) {
  return ({
    image: '#2080f0',
    doc: '#18a058',
    code: '#7c3aed',
    sheet: '#16a34a',
    pdf: '#d03050',
  } as Record<string, string>)[type] || '#94a3b8'
}

function preview(f: FileMeta) {
  message.info(`预览：${f.name}`)
}
function download(f: FileMeta) {
  message.success(`下载：${f.name}（模拟）`)
}
function remove(id: string) {
  list.value = list.value.filter((f) => f.id !== id)
  message.success('已删除')
}
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">FileCard 文件卡片</h2>
    <NCard>
      <NSpace class="mb-4" align="center">
        <NSelect v-model:value="filter" :options="filterOptions" style="width: 120px" size="small" />
        <NSelect v-model:value="sort" :options="sortOptions" style="width: 120px" size="small" />
        <NButtonGroup>
          <NButton size="small" :type="view === 'grid' ? 'primary' : 'default'" @click="view = 'grid'">◦ 网格</NButton>
          <NButton size="small" :type="view === 'list' ? 'primary' : 'default'" @click="view = 'list'">☰ 列表</NButton>
        </NButtonGroup>
        <NTag :bordered="false" type="info">{{ filtered.length }} 个文件</NTag>
      </NSpace>

      <NEmpty v-if="!filtered.length" description="无匹配文件" />

      <!-- 网格视图 -->
      <div v-else-if="view === 'grid'" class="grid-view">
        <div
          v-for="f in filtered" :key="f.id"
          class="card"
        >
          <div class="card-icon" :style="{ background: colorOf(f.type) + '20', color: colorOf(f.type) }">
            <span class="emoji">{{ iconOf(f.type) }}</span>
            <NTag size="small" round :color="{ color: colorOf(f.type), textColor: '#fff', borderColor: 'transparent' }" class="ext-tag">
              {{ f.ext.toUpperCase() }}
            </NTag>
          </div>
          <div class="card-name" :title="f.name">{{ f.name }}</div>
          <div class="card-meta">
            <span>{{ formatSize(f.size) }}</span>
            <span>·</span>
            <span>{{ dayjs(f.time).format('MM-DD HH:mm') }}</span>
          </div>
          <div class="card-owner">{{ f.owner }}</div>
          <NSpace size="small" class="card-actions">
            <NButton size="tiny" quaternary @click="preview(f)">👁</NButton>
            <NButton size="tiny" quaternary @click="download(f)">⬇</NButton>
            <NPopconfirm @positive-click="remove(f.id)">
              <template #trigger>
                <NButton size="tiny" quaternary type="error">✕</NButton>
              </template>
              确定删除？
            </NPopconfirm>
          </NSpace>
        </div>
      </div>

      <!-- 列表视图 -->
      <div v-else class="list-view">
        <div v-for="f in filtered" :key="f.id" class="list-row">
          <div class="row-icon" :style="{ background: colorOf(f.type) + '20', color: colorOf(f.type) }">
            {{ iconOf(f.type) }}
          </div>
          <div class="row-info">
            <div class="row-name">{{ f.name }}</div>
            <div class="row-meta">
              {{ formatSize(f.size) }} · {{ f.owner }} · {{ dayjs(f.time).format('YYYY-MM-DD HH:mm') }}
            </div>
          </div>
          <NTag size="small" :bordered="false">{{ f.ext.toUpperCase() }}</NTag>
          <NSpace size="small">
            <NButton size="small" quaternary @click="preview(f)">预览</NButton>
            <NButton size="small" quaternary @click="download(f)">下载</NButton>
            <NPopconfirm @positive-click="remove(f.id)">
              <template #trigger>
                <NButton size="small" quaternary type="error">删除</NButton>
              </template>
              确定删除？
            </NPopconfirm>
          </NSpace>
        </div>
      </div>
    </NCard>
  </div>
</template>

<style scoped>
.grid-view {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 12px;
}
.card {
  position: relative;
  padding: 14px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: #fff;
  text-align: center;
  transition: all 0.15s;
}
.card:hover {
  border-color: #18a058;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}
.card-icon {
  position: relative;
  height: 70px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}
.card-icon .emoji { font-size: 36px; }
.ext-tag {
  position: absolute;
  bottom: 6px;
  right: 6px;
  font-size: 10px !important;
  font-weight: 600;
}
.card-name {
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.card-meta {
  display: flex;
  gap: 4px;
  justify-content: center;
  font-size: 11px;
  color: #9ca3af;
  margin-top: 4px;
}
.card-owner {
  font-size: 11px;
  color: #6b7280;
  margin-top: 2px;
}
.card-actions { justify-content: center; margin-top: 8px; }

.list-view { display: flex; flex-direction: column; gap: 6px; }
.list-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
}
.list-row:hover { background: #f9fafb; }
.row-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  flex-shrink: 0;
}
.row-info { flex: 1; min-width: 0; }
.row-name {
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.row-meta { font-size: 11px; color: #9ca3af; margin-top: 2px; }
</style>
