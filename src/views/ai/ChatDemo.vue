<script setup lang="ts">
/**
 * Chat 聊天对话 Demo
 * 模拟一个简易的 AI 对话框：用户/助手气泡、输入发送、模拟流式回复
 */
import { ref, nextTick, onMounted } from 'vue'
import { NCard, NAvatar, NInput, NButton, NSpace, NSpin, NEmpty } from 'naive-ui'

interface ChatMessage {
  id: number
  role: 'user' | 'assistant'
  content: string
  time: string
}

const messages = ref<ChatMessage[]>([
  {
    id: 1,
    role: 'assistant',
    content: '你好！我是 AI 助手，有什么可以帮你的吗？',
    time: new Date().toLocaleTimeString(),
  },
])
const input = ref('')
const loading = ref(false)
const scrollRef = ref<HTMLDivElement | null>(null)

const mockReplies = [
  '这是一个非常好的问题，让我来帮你分析一下。',
  '根据我的理解，可以从以下几个方面入手：\n1. 明确目标\n2. 拆解任务\n3. 逐步实现',
  '收到！我会尽力帮你解决这个问题。',
  '好的，请问还有其他需要了解的吗？',
]

function scrollToBottom() {
  nextTick(() => {
    if (scrollRef.value) scrollRef.value.scrollTop = scrollRef.value.scrollHeight
  })
}

async function send() {
  const text = input.value.trim()
  if (!text || loading.value) return
  messages.value.push({
    id: Date.now(),
    role: 'user',
    content: text,
    time: new Date().toLocaleTimeString(),
  })
  input.value = ''
  scrollToBottom()
  loading.value = true

  // 模拟流式输出
  const reply = mockReplies[Math.floor(Math.random() * mockReplies.length)]
  const aiMsg: ChatMessage = {
    id: Date.now() + 1,
    role: 'assistant',
    content: '',
    time: new Date().toLocaleTimeString(),
  }
  messages.value.push(aiMsg)
  let i = 0
  await new Promise<void>((resolve) => {
    const timer = setInterval(() => {
      if (i >= reply.length) {
        clearInterval(timer)
        resolve()
        return
      }
      aiMsg.content += reply[i]
      i++
      scrollToBottom()
    }, 30)
  })
  loading.value = false
}

function clearAll() {
  messages.value = []
}

onMounted(() => scrollToBottom())
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Chat 聊天对话</h2>
    <NCard>
      <template #header-extra>
        <NButton size="small" quaternary @click="clearAll">🗑 清空</NButton>
      </template>
      <div ref="scrollRef" class="chat-scroll">
        <NEmpty v-if="messages.length === 0" description="暂无对话，开始聊天吧" />
        <div v-for="m in messages" :key="m.id" :class="['msg-row', m.role]">
          <NAvatar v-if="m.role === 'assistant'" round size="small" color="#18a058">🤖</NAvatar>
          <div class="msg-bubble">
            <div class="msg-content">{{ m.content }}<span v-if="loading && m.id === messages[messages.length - 1].id && m.role === 'assistant'" class="cursor">▍</span></div>
            <div class="msg-time">{{ m.time }}</div>
          </div>
          <NAvatar v-if="m.role === 'user'" round size="small" color="#2080f0">我</NAvatar>
        </div>
      </div>
      <NSpace class="mt-4" :wrap="false">
        <NInput
          v-model:value="input"
          type="textarea"
          :autosize="{ minRows: 1, maxRows: 4 }"
          placeholder="输入消息，Enter 发送"
          :disabled="loading"
          @keydown.enter.prevent="send"
        />
        <NButton type="primary" :loading="loading" :disabled="!input.trim()" @click="send">
          <template v-if="loading"><NSpin size="small" /></template>
          <template v-else>发送</template>
        </NButton>
      </NSpace>
    </NCard>
  </div>
</template>

<style scoped>
.chat-scroll {
  height: 480px;
  overflow-y: auto;
  padding: 8px 4px;
  background: var(--card-color, #fafafa);
  border-radius: 8px;
}
.msg-row {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
  align-items: flex-start;
}
.msg-row.user {
  flex-direction: row-reverse;
}
.msg-bubble {
  max-width: 70%;
}
.msg-content {
  padding: 10px 14px;
  border-radius: 12px;
  background: #f0f2f5;
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 1.6;
}
.msg-row.user .msg-content {
  background: #d6e4ff;
  color: #1f2937;
}
.msg-time {
  font-size: 11px;
  color: #999;
  margin-top: 4px;
  text-align: right;
}
.msg-row.user .msg-time {
  text-align: left;
}
.cursor {
  display: inline-block;
  margin-left: 2px;
  animation: blink 1s steps(2) infinite;
}
@keyframes blink {
  to { opacity: 0; }
}
</style>
