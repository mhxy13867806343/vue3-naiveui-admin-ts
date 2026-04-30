<script setup lang="ts">
/**
 * BubbleList 消息列表 Demo
 * 多角色消息列表（user / assistant / system），支持时间分组、头像、状态、操作菜单
 * 与单条 Bubble 的区别：聚焦"列表渲染 + 多角色 + 历史记录"
 */
import { ref } from 'vue'
import { NCard, NAvatar, NTag, NButton, NSpace, NDivider, useMessage } from 'naive-ui'
import dayjs from 'dayjs'

interface BubbleItem {
  id: number
  role: 'user' | 'assistant' | 'system'
  content: string
  time: number
  status?: 'sending' | 'sent' | 'failed'
  reactions?: { thumbs: number; love: number }
}

const message = useMessage()

const list = ref<BubbleItem[]>([
  { id: 1, role: 'system', content: '🛡 本对话由 GPT-4o 提供，输出可能存在误差。', time: Date.now() - 1000 * 60 * 60 * 24 },
  { id: 2, role: 'user', content: '什么是 Vue 3 的响应式原理？', time: Date.now() - 1000 * 60 * 60 * 23, status: 'sent' },
  { id: 3, role: 'assistant', content: 'Vue 3 使用 Proxy 实现响应式：通过拦截对象的读 / 写操作，自动追踪依赖、触发更新。相比 Vue 2 的 Object.defineProperty，能监听新增 / 删除属性、数组索引修改。', time: Date.now() - 1000 * 60 * 60 * 23, reactions: { thumbs: 12, love: 3 } },
  { id: 4, role: 'user', content: '能给个简单示例吗？', time: Date.now() - 1000 * 60 * 30, status: 'sent' },
  { id: 5, role: 'assistant', content: '可以的，比如：\nconst obj = reactive({ count: 0 })\n— 当你修改 obj.count，依赖它的视图会自动更新。', time: Date.now() - 1000 * 60 * 28, reactions: { thumbs: 5, love: 1 } },
  { id: 6, role: 'user', content: '谢谢！', time: Date.now() - 1000 * 30, status: 'failed' },
])

function bucketLabel(ts: number) {
  const day = dayjs(ts).startOf('day')
  const today = dayjs().startOf('day')
  const diff = today.diff(day, 'day')
  if (diff === 0) return '今天'
  if (diff === 1) return '昨天'
  if (diff < 7) return `${diff} 天前`
  return day.format('YYYY-MM-DD')
}

// 按日期分组
const grouped = () => {
  const sorted = [...list.value].sort((a, b) => a.time - b.time)
  const result: { label: string; items: BubbleItem[] }[] = []
  for (const it of sorted) {
    const label = bucketLabel(it.time)
    let g = result.find((r) => r.label === label)
    if (!g) {
      g = { label, items: [] }
      result.push(g)
    }
    g.items.push(it)
  }
  return result
}

const roleConfig = {
  user: { color: '#2080f0', emoji: '我', name: '我' },
  assistant: { color: '#18a058', emoji: '🤖', name: 'AI 助手' },
  system: { color: '#f0a020', emoji: '🛡', name: '系统' },
}

function react(item: BubbleItem, key: 'thumbs' | 'love') {
  if (!item.reactions) item.reactions = { thumbs: 0, love: 0 }
  item.reactions[key]++
}

function retry(item: BubbleItem) {
  item.status = 'sending'
  setTimeout(() => {
    item.status = 'sent'
    message.success('重发成功')
  }, 800)
}

function appendOne() {
  list.value.push({
    id: Date.now(),
    role: Math.random() > 0.5 ? 'user' : 'assistant',
    content: '这是动态追加的一条消息 · ' + new Date().toLocaleTimeString(),
    time: Date.now(),
    status: 'sent',
  })
}
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">BubbleList 消息列表</h2>
    <NCard>
      <template #header-extra>
        <NSpace>
          <NTag :bordered="false" type="info">{{ list.length }} 条</NTag>
          <NButton size="small" @click="appendOne">+ 追加一条</NButton>
        </NSpace>
      </template>

      <div class="bubble-list">
        <template v-for="g in grouped()" :key="g.label">
          <NDivider class="!my-3">
            <span class="text-xs text-gray-400">{{ g.label }}</span>
          </NDivider>
          <div
            v-for="item in g.items" :key="item.id"
            :class="['row', item.role]"
          >
            <!-- 系统消息特殊样式 -->
            <div v-if="item.role === 'system'" class="system-msg">
              {{ item.content }}
            </div>
            <template v-else>
              <NAvatar
                round size="small"
                :color="roleConfig[item.role].color"
              >{{ roleConfig[item.role].emoji }}</NAvatar>
              <div class="bubble-wrap">
                <div class="role-line">
                  <span class="name">{{ roleConfig[item.role].name }}</span>
                  <span class="time">{{ dayjs(item.time).format('HH:mm') }}</span>
                </div>
                <div :class="['bubble', item.role]">
                  <div class="content">{{ item.content }}</div>
                  <div class="footer">
                    <NSpace size="small">
                      <NTag
                        v-if="item.role === 'assistant'"
                        size="small" round
                        :bordered="false"
                        class="cursor-pointer"
                        @click="react(item, 'thumbs')"
                      >👍 {{ item.reactions?.thumbs || 0 }}</NTag>
                      <NTag
                        v-if="item.role === 'assistant'"
                        size="small" round
                        :bordered="false"
                        class="cursor-pointer"
                        @click="react(item, 'love')"
                      >❤️ {{ item.reactions?.love || 0 }}</NTag>
                    </NSpace>
                    <span v-if="item.status === 'sending'" class="status sending">⏳ 发送中</span>
                    <span v-else-if="item.status === 'failed'" class="status failed" @click="retry(item)">
                      ⚠️ 失败 · 点击重试
                    </span>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </template>
      </div>
    </NCard>
  </div>
</template>

<style scoped>
.bubble-list { padding: 4px; }
.row {
  display: flex;
  gap: 10px;
  margin: 8px 0;
  align-items: flex-start;
}
.row.user { flex-direction: row-reverse; }
.system-msg {
  flex: 1;
  text-align: center;
  font-size: 12px;
  color: #9ca3af;
  padding: 4px 12px;
  background: #f9fafb;
  border-radius: 999px;
  margin: 0 auto;
}
.bubble-wrap { max-width: 70%; }
.role-line {
  display: flex;
  gap: 8px;
  align-items: baseline;
  margin-bottom: 4px;
  font-size: 12px;
}
.row.user .role-line { justify-content: flex-end; }
.name { font-weight: 500; color: #374151; }
.time { color: #9ca3af; font-size: 11px; }
.bubble {
  padding: 10px 14px;
  border-radius: 12px;
  background: #f3f4f6;
  line-height: 1.6;
}
.bubble.user { background: #d6e4ff; }
.content { white-space: pre-wrap; word-break: break-word; }
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 6px;
}
.status { font-size: 11px; }
.status.sending { color: #f0a020; }
.status.failed { color: #d03050; cursor: pointer; }
.status.failed:hover { text-decoration: underline; }
</style>
