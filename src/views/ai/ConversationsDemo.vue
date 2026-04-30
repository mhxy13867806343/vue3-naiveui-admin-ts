<script setup lang="ts">
/**
 * Conversations 会话列表 Demo
 * 历史会话管理：新建 / 选中 / 重命名 / 删除 / 搜索 / 分组
 */
import { ref, computed } from 'vue'
import { NCard, NButton, NInput, NEmpty, NDropdown, NTag, NModal, useDialog, useMessage } from 'naive-ui'
import dayjs from 'dayjs'

interface Conv {
  id: string
  title: string
  preview: string
  updatedAt: number
  pinned?: boolean
}

const dialog = useDialog()
const message = useMessage()

const search = ref('')
const activeId = ref('c-2')

// 重命名对话框状态
const renameVisible = ref(false)
const renameValue = ref('')
const renameTarget = ref<Conv | null>(null)

const list = ref<Conv[]>([
  { id: 'c-1', title: 'Vue 3 项目搭建', preview: '帮我搭一个 Vue 3 + Vite + TS 项目', updatedAt: Date.now() - 1000 * 60 * 10 },
  { id: 'c-2', title: 'TypeScript 泛型答疑', preview: '解释一下泛型约束 extends', updatedAt: Date.now() - 1000 * 60 * 60 * 2 },
  { id: 'c-3', title: '周报模板', preview: '帮我写一份本周工作总结', updatedAt: Date.now() - 1000 * 60 * 60 * 24, pinned: true },
  { id: 'c-4', title: 'SQL 查询优化', preview: '这个查询为什么慢', updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 3 },
  { id: 'c-5', title: '英语邮件润色', preview: 'polish this email please', updatedAt: Date.now() - 1000 * 60 * 60 * 24 * 8 },
])

function bucketOf(ts: number) {
  const diff = Date.now() - ts
  if (diff < 1000 * 60 * 60 * 24) return '今天'
  if (diff < 1000 * 60 * 60 * 24 * 2) return '昨天'
  if (diff < 1000 * 60 * 60 * 24 * 7) return '7 天内'
  return '更早'
}

const grouped = computed(() => {
  const q = search.value.trim().toLowerCase()
  const filtered = list.value
    .filter((c) => !q || c.title.toLowerCase().includes(q) || c.preview.toLowerCase().includes(q))
    .sort((a, b) => Number(!!b.pinned) - Number(!!a.pinned) || b.updatedAt - a.updatedAt)
  const groups: { name: string; items: Conv[] }[] = []
  for (const c of filtered) {
    const g = c.pinned ? '📌 置顶' : bucketOf(c.updatedAt)
    let group = groups.find((x) => x.name === g)
    if (!group) {
      group = { name: g, items: [] }
      groups.push(group)
    }
    group.items.push(c)
  }
  return groups
})

const active = computed(() => list.value.find((c) => c.id === activeId.value) || null)

function newConv() {
  const id = 'c-' + Date.now()
  list.value.unshift({
    id,
    title: '新会话',
    preview: '（空）',
    updatedAt: Date.now(),
  })
  activeId.value = id
  message.success('已创建新会话')
}

function rename(c: Conv) {
  renameTarget.value = c
  renameValue.value = c.title
  renameVisible.value = true
}

function confirmRename() {
  const t = renameValue.value.trim()
  if (!t) {
    message.warning('标题不能为空')
    return
  }
  if (renameTarget.value) {
    renameTarget.value.title = t
    renameTarget.value.updatedAt = Date.now()
    message.success('重命名成功')
  }
  renameVisible.value = false
  renameTarget.value = null
}

function togglePin(c: Conv) {
  c.pinned = !c.pinned
}

function remove(c: Conv) {
  dialog.warning({
    title: '删除会话',
    content: `确定删除"${c.title}"？此操作不可撤销。`,
    positiveText: '删除',
    negativeText: '取消',
    onPositiveClick: () => {
      list.value = list.value.filter((x) => x.id !== c.id)
      if (activeId.value === c.id) activeId.value = list.value[0]?.id || ''
      message.success('已删除')
    },
  })
}

function actions(c: Conv) {
  return [
    { label: c.pinned ? '取消置顶' : '置顶', key: 'pin', icon: () => '📌' },
    { label: '重命名', key: 'rename', icon: () => '✏️' },
    { type: 'divider', key: 'd1' },
    { label: '删除', key: 'remove', icon: () => '🗑' },
  ]
}

function onAction(key: string, c: Conv) {
  if (key === 'pin') togglePin(c)
  else if (key === 'rename') rename(c)
  else if (key === 'remove') remove(c)
}
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Conversations 会话列表</h2>
    <div class="conv-layout">
      <!-- 左侧列表 -->
      <NCard size="small" class="conv-side" :content-style="{ padding: '8px' }">
        <div class="px-2 pb-2">
          <NButton block type="primary" @click="newConv">+ 新建会话</NButton>
        </div>
        <div class="px-2 pb-2">
          <NInput v-model:value="search" placeholder="🔍 搜索会话..." clearable size="small" />
        </div>
        <div class="conv-list">
          <NEmpty v-if="!grouped.length" description="无匹配会话" />
          <div v-for="g in grouped" :key="g.name">
            <div class="group-title">{{ g.name }}</div>
            <div
              v-for="c in g.items"
              :key="c.id"
              :class="['conv-item', { active: c.id === activeId }]"
              @click="activeId = c.id"
            >
              <div class="conv-main-info">
                <div class="conv-title">
                  <span v-if="c.pinned">📌</span>
                  <span class="truncate">{{ c.title }}</span>
                </div>
                <div class="conv-preview truncate">{{ c.preview }}</div>
              </div>
              <NDropdown
                trigger="click"
                :options="actions(c)"
                @select="(k: string) => onAction(k, c)"
              >
                <NButton size="tiny" quaternary class="conv-more" @click.stop>⋯</NButton>
              </NDropdown>
            </div>
          </div>
        </div>
      </NCard>

      <!-- 右侧详情 -->
      <NCard size="small" class="conv-main">
        <template v-if="active">
          <h3 class="text-lg font-semibold mb-2">{{ active.title }}</h3>
          <NTag size="small" :bordered="false">
            最后更新：{{ dayjs(active.updatedAt).format('YYYY-MM-DD HH:mm') }}
          </NTag>
          <p class="mt-4 text-gray-600">{{ active.preview }}</p>
          <div class="actions mt-6">
            <NButton size="small" @click="rename(active)">✏️ 重命名</NButton>
            <NButton size="small" @click="togglePin(active)">📌 {{ active.pinned ? '取消置顶' : '置顶' }}</NButton>
            <NButton size="small" type="error" tertiary @click="remove(active)">🗑 删除</NButton>
          </div>
        </template>
        <NEmpty v-else description="请选择一个会话" />
      </NCard>
    </div>

    <!-- 重命名对话框 -->
    <NModal
      v-model:show="renameVisible"
      preset="card"
      title="重命名会话"
      style="max-width: 420px"
      :mask-closable="false"
    >
      <NInput
        v-model:value="renameValue"
        placeholder="请输入新标题"
        maxlength="40"
        show-count
        clearable
        @keydown.enter="confirmRename"
      />
      <template #footer>
        <div class="flex justify-end gap-2">
          <NButton @click="renameVisible = false">取消</NButton>
          <NButton type="primary" @click="confirmRename">确认</NButton>
        </div>
      </template>
    </NModal>
  </div>
</template>

<style scoped>
.conv-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 12px;
  min-height: 520px;
}
.conv-list {
  max-height: 480px;
  overflow-y: auto;
  padding: 0 4px;
}
.group-title {
  font-size: 11px;
  color: #9ca3af;
  padding: 8px 8px 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.conv-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 10px;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 2px;
}
.conv-main-info {
  flex: 1;
  min-width: 0;
}
.conv-more {
  opacity: 0;
  transition: opacity 0.15s;
}
.conv-item:hover .conv-more,
.conv-item.active .conv-more {
  opacity: 1;
}
.conv-item:hover {
  background: #f3f4f6;
}
.conv-item.active {
  background: rgba(24, 160, 88, 0.1);
}
.conv-title {
  font-size: 13px;
  font-weight: 500;
  display: flex;
  gap: 4px;
  align-items: center;
}
.conv-preview {
  font-size: 11px;
  color: #9ca3af;
  margin-top: 2px;
}
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.actions {
  display: flex;
  gap: 8px;
}
@media (max-width: 768px) {
  .conv-layout {
    grid-template-columns: 1fr;
  }
}
</style>
