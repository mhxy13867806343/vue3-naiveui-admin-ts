<script setup lang="ts">
/**
 * 多级路由示例 - 聊天 / QQ 风格
 * 模仿 QQ 聊天：蓝紫渐变背景、白色气泡、表情、抖动消息
 */
import { ref, onMounted, nextTick } from 'vue'
import { NInput, NAvatar, useMessage } from 'naive-ui'

interface QQMsg {
  id: number
  from: 'me' | 'friend'
  text: string
  time: string
  shake?: boolean
}

const message = useMessage()

const friend = { name: '七夜', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=qq' }
const messages = ref<QQMsg[]>([
  { id: 1, from: 'friend', text: '滴~ 上线了', time: '昨天 23:14' },
  { id: 2, from: 'me', text: '老铁，王者吗？', time: '今天 09:00' },
  { id: 3, from: 'friend', text: '走走走 [doge]', time: '今天 09:01' },
  { id: 4, from: 'friend', text: '我已经在大厅了', time: '今天 09:01' },
  { id: 5, from: 'me', text: 'OK 马上来', time: '今天 09:02' },
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
    id: Date.now(), from: 'me', text: t, time: '现在',
  })
  input.value = ''
  scrollBottom()
}

function shake() {
  const last = messages.value[messages.value.length - 1]
  if (last) {
    last.shake = true
    message.warning('🔔 你抖动了对方！')
    setTimeout(() => { last.shake = false }, 600)
  }
}

const emojis = ['😀', '😂', '🤣', '😎', '🥰', '😭', '🤔', '👍', '🎉', '🔥']
function pickEmoji(e: string) {
  input.value += e
}

onMounted(scrollBottom)
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">业务示例 / 聊天 / QQ 风格</h2>

    <div class="qq-window">
      <!-- 标题栏 -->
      <div class="title-bar">
        <span class="dot red"></span>
        <span class="dot yellow"></span>
        <span class="dot green"></span>
        <span class="title">QQ - {{ friend.name }}</span>
      </div>

      <!-- 信息条 -->
      <div class="info-bar">
        <NAvatar :src="friend.avatar" round size="small" />
        <div>
          <div class="name">{{ friend.name }}</div>
          <div class="status">🟢 在线 · 王者荣耀</div>
        </div>
        <div class="actions">
          <button class="ico-btn" title="窗口抖动" @click="shake">📳</button>
          <button class="ico-btn">📞</button>
          <button class="ico-btn">📹</button>
        </div>
      </div>

      <!-- 消息区 -->
      <div ref="scrollRef" class="msg-area">
        <div v-for="m in messages" :key="m.id" :class="['msg', m.from, { shake: m.shake }]">
          <div class="time-line">{{ m.time }}</div>
          <div class="msg-row">
            <NAvatar
              :src="m.from === 'friend' ? friend.avatar : ''"
              :color="m.from === 'me' ? '#1565c0' : ''"
              round size="small"
            >{{ m.from === 'me' ? '我' : '' }}</NAvatar>
            <div class="qq-bubble">{{ m.text }}</div>
          </div>
        </div>
      </div>

      <!-- 工具栏 -->
      <div class="tool-bar">
        <span v-for="e in emojis" :key="e" class="emo" @click="pickEmoji(e)">{{ e }}</span>
      </div>

      <!-- 输入区 -->
      <div class="input-area">
        <NInput
          v-model:value="input"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="按 Enter 发送..."
          @keydown.enter.prevent="send"
        />
        <button class="send-btn" @click="send">发送</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.qq-window {
  max-width: 600px;
  margin: 0 auto;
  border-radius: 12px;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
  color: #fff;
}
.title-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: rgba(0, 0, 0, 0.2);
}
.dot { width: 12px; height: 12px; border-radius: 50%; }
.dot.red { background: #ff5f57; }
.dot.yellow { background: #ffbd2e; }
.dot.green { background: #28c941; }
.title-bar .title { margin-left: 12px; font-size: 13px; }

.info-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}
.info-bar .name { font-weight: 600; font-size: 15px; }
.info-bar .status { font-size: 11px; opacity: 0.85; margin-top: 2px; }
.info-bar .actions { margin-left: auto; display: flex; gap: 4px; }
.ico-btn {
  background: rgba(255, 255, 255, 0.15);
  border: none;
  color: #fff;
  border-radius: 6px;
  padding: 6px 10px;
  cursor: pointer;
  transition: background 0.2s;
}
.ico-btn:hover { background: rgba(255, 255, 255, 0.3); }

.msg-area {
  height: 320px;
  overflow-y: auto;
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.05);
}
.msg.shake .msg-row { animation: shake 0.5s; }
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-8px); }
  40% { transform: translateX(8px); }
  60% { transform: translateX(-6px); }
  80% { transform: translateX(6px); }
}
.time-line {
  text-align: center;
  font-size: 11px;
  opacity: 0.6;
  margin: 6px 0;
}
.msg-row {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  margin-bottom: 8px;
}
.msg.me .msg-row { flex-direction: row-reverse; }
.qq-bubble {
  background: #fff;
  color: #1f2937;
  padding: 8px 14px;
  border-radius: 14px;
  max-width: 70%;
  word-break: break-word;
  line-height: 1.5;
}
.msg.me .qq-bubble { background: #00cdff; color: #fff; }

.tool-bar {
  display: flex;
  gap: 4px;
  padding: 8px 12px;
  background: rgba(0, 0, 0, 0.15);
  flex-wrap: wrap;
}
.emo {
  font-size: 20px;
  cursor: pointer;
  transition: transform 0.15s;
}
.emo:hover { transform: scale(1.3); }

.input-area {
  display: flex;
  gap: 8px;
  padding: 12px 14px 16px;
  align-items: flex-end;
  background: rgba(255, 255, 255, 0.95);
}
.input-area :deep(.n-input) { flex: 1; }
.send-btn {
  padding: 0 20px;
  height: 36px;
  background: linear-gradient(90deg, #00cdff, #1565c0);
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}
.send-btn:hover { opacity: 0.9; }
</style>
