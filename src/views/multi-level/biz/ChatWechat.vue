<script setup lang="ts">
/**
 * 多级路由示例 - 聊天 / 微信风格
 * 模仿微信聊天界面：绿色气泡、左右对齐、时间戳、文本/图片/语音消息
 */
import { ref, nextTick, onMounted } from 'vue'
import { NCard, NInput, NAvatar } from 'naive-ui'

interface Msg {
  id: number
  from: 'me' | 'her'
  type: 'text' | 'voice' | 'image'
  content: string
  duration?: number
  time: string
}

const her = { name: '张三', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhangsan' }
const messages = ref<Msg[]>([
  { id: 1, from: 'her', type: 'text', content: '在吗？', time: '09:01' },
  { id: 2, from: 'me', type: 'text', content: '在的，怎么了', time: '09:02' },
  { id: 3, from: 'her', type: 'voice', content: '', duration: 5, time: '09:03' },
  { id: 4, from: 'me', type: 'text', content: '听到啦，那我等会儿过去', time: '09:04' },
  { id: 5, from: 'her', type: 'image', content: 'https://picsum.photos/seed/wechat/300/200', time: '09:05' },
  { id: 6, from: 'her', type: 'text', content: '这是会议室定位 👆', time: '09:05' },
])

const input = ref('')
const scrollRef = ref<HTMLDivElement | null>(null)

function scrollBottom() {
  nextTick(() => {
    if (scrollRef.value) scrollRef.value.scrollTop = scrollRef.value.scrollHeight
  })
}

function send() {
  const t = input.value.trim()
  if (!t) return
  messages.value.push({
    id: Date.now(), from: 'me', type: 'text', content: t,
    time: new Date().toTimeString().slice(0, 5),
  })
  input.value = ''
  scrollBottom()
  setTimeout(() => {
    messages.value.push({
      id: Date.now() + 1, from: 'her', type: 'text', content: '收到 👌',
      time: new Date().toTimeString().slice(0, 5),
    })
    scrollBottom()
  }, 800)
}

onMounted(scrollBottom)
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">业务示例 / 聊天 / 微信风格</h2>
    <NCard :content-style="{ padding: 0 }" class="phone">
      <!-- 头部 -->
      <div class="header">
        <span class="back">‹</span>
        <span class="title">{{ her.name }}</span>
        <span class="more">⋯</span>
      </div>

      <!-- 消息流 -->
      <div ref="scrollRef" class="chat">
        <div v-for="m in messages" :key="m.id" :class="['row', m.from]">
          <NAvatar v-if="m.from === 'her'" :src="her.avatar" round size="medium" />
          <div class="bubble-wrap">
            <div :class="['bubble', m.from, m.type]">
              <span v-if="m.type === 'text'">{{ m.content }}</span>
              <span v-else-if="m.type === 'voice'" class="voice">
                <span class="wave"></span>
                {{ m.duration }}″
              </span>
              <img v-else-if="m.type === 'image'" :src="m.content" alt="img" />
            </div>
          </div>
          <NAvatar v-if="m.from === 'me'" round size="medium" color="#07c160" style="color: #fff">我</NAvatar>
        </div>
      </div>

      <!-- 输入栏 -->
      <div class="input-bar">
        <span class="icon">🎙</span>
        <NInput
          v-model:value="input"
          placeholder="输入消息..."
          class="wx-input"
          @keydown.enter="send"
        />
        <span class="icon">😊</span>
        <span class="icon" @click="send">+</span>
      </div>
    </NCard>
  </div>
</template>

<style scoped>
.phone {
  max-width: 420px;
  margin: 0 auto;
  background: #ededed;
  height: 640px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.header {
  background: #181818;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  font-size: 16px;
}
.back, .more { width: 28px; text-align: center; cursor: pointer; }
.title { font-weight: 500; }
.chat {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
  background: #ededed;
}
.row {
  display: flex;
  gap: 8px;
  margin-bottom: 14px;
  align-items: flex-start;
}
.row.me { flex-direction: row-reverse; }
.bubble-wrap { max-width: 70%; }
.bubble {
  padding: 8px 12px;
  border-radius: 4px;
  background: #fff;
  position: relative;
  word-break: break-word;
}
.bubble.me { background: #95ec69; }
.bubble::before {
  content: '';
  position: absolute;
  top: 12px;
  border: 6px solid transparent;
}
.bubble.her::before {
  left: -12px;
  border-right-color: #fff;
}
.bubble.me::before {
  right: -12px;
  border-left-color: #95ec69;
}
.bubble.voice {
  min-width: 80px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.wave {
  display: inline-block;
  width: 16px;
  height: 12px;
  background: linear-gradient(to right, #07c160 0%, #07c160 30%, transparent 30%, transparent 50%, #07c160 50%, #07c160 80%, transparent 80%);
}
.bubble.image { padding: 4px; }
.bubble.image img { display: block; max-width: 220px; border-radius: 2px; }
.input-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background: #f7f7f7;
  border-top: 1px solid #ddd;
}
.icon {
  font-size: 22px;
  width: 32px;
  text-align: center;
  cursor: pointer;
  user-select: none;
}
:deep(.wx-input) { flex: 1; }
:deep(.wx-input .n-input__input-el) { background: #fff; border-radius: 4px; }
</style>
