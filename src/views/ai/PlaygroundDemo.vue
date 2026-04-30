<script setup lang="ts">
/**
 * Playground 综合对话 Demo
 * 完整模拟 ChatGPT / Claude 的对话体验：
 * - 左侧：会话列表（新建 / 切换 / 删除）
 * - 中间：消息流（用户气泡 + AI Markdown 气泡 + 流式光标 + 思维链折叠）
 * - 底部：Sender（多模态输入 + 附件 + 风格切换 + 快捷气泡 + Stop）
 */
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue'
import {
  NCard, NButton, NInput, NAvatar, NEmpty, NTag, NSpace, NUpload, NTooltip,
  NCollapseTransition, useMessage, type UploadFileInfo,
} from 'naive-ui'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

// ---------- Markdown 渲染器 ----------
const md: MarkdownIt = new MarkdownIt({
  html: false, linkify: true, breaks: true,
  highlight(str: string, lang: string): string {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code>${hljs.highlight(str, { language: lang, ignoreIllegals: true }).value}</code></pre>`
      } catch { /* noop */ }
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`
  },
})

const message = useMessage()

// ---------- 类型 ----------
interface Msg {
  id: number
  role: 'user' | 'assistant'
  content: string
  thinking?: string
  thinkingExpanded?: boolean
  attachments?: { name: string; url?: string; type: string }[]
  time: string
  done?: boolean
}

interface Session {
  id: string
  title: string
  messages: Msg[]
}

// ---------- 状态 ----------
const sessions = ref<Session[]>([
  {
    id: 's-1',
    title: '欢迎使用 Playground',
    messages: [
      {
        id: 1,
        role: 'assistant',
        content: '👋 你好！我是 AI 助手。你可以试试：\n\n- 输入 `/` 查看快捷命令\n- 上传图片或文件\n- 切换不同**回答风格**\n- 让我**展示思维链**',
        time: new Date().toLocaleTimeString(),
        done: true,
      },
    ],
  },
])
const activeId = ref('s-1')
const active = computed(() => sessions.value.find((s) => s.id === activeId.value)!)

const input = ref('')
const files = ref<UploadFileInfo[]>([])
const tone = ref<'default' | 'concise' | 'professional' | 'creative'>('default')
const showThinking = ref(true)
const generating = ref(false)
const aborted = ref(false)
let timer: number | null = null

const tones = [
  { value: 'default', label: '默认' },
  { value: 'concise', label: '简洁' },
  { value: 'professional', label: '专业' },
  { value: 'creative', label: '创意' },
] as const

const quickPrompts = [
  '用 Vue 3 + TS 写一个倒计时 Hook',
  '解释什么是事件循环',
  '推荐一个轻量状态管理方案',
  '帮我润色一封英文邮件',
]

const slashCommands = [
  { cmd: '/translate', desc: '翻译选中文本' },
  { cmd: '/summarize', desc: '总结当前对话' },
  { cmd: '/explain', desc: '解释概念或代码' },
  { cmd: '/code', desc: '生成代码示例' },
  { cmd: '/clear', desc: '清空当前会话' },
]

const showSlash = computed(() => input.value.startsWith('/'))
const filteredSlash = computed(() => {
  const q = input.value.slice(1).toLowerCase()
  return slashCommands.filter((c) => c.cmd.slice(1).startsWith(q))
})

const scrollRef = ref<HTMLDivElement | null>(null)
function scrollBottom() {
  nextTick(() => {
    if (scrollRef.value) scrollRef.value.scrollTop = scrollRef.value.scrollHeight
  })
}

// ---------- 会话操作 ----------
function newSession() {
  const id = 's-' + Date.now()
  sessions.value.unshift({
    id,
    title: '新会话',
    messages: [],
  })
  activeId.value = id
}

function deleteSession(id: string) {
  sessions.value = sessions.value.filter((s) => s.id !== id)
  if (activeId.value === id) {
    activeId.value = sessions.value[0]?.id || ''
    if (!activeId.value) newSession()
  }
}

function renderMd(text: string) {
  return md.render(text || '')
}

// ---------- 模拟回复（含思维链 + Markdown + 流式） ----------
const mockBank: { thinking: string; answer: string }[] = [
  {
    thinking: '用户在询问 Vue 3 倒计时 Hook 的实现。\n关键点：使用 ref + setInterval，记得在 onUnmounted 清理。\n返回 reactive 的剩余秒数和控制方法。',
    answer: `下面是一个简单的 Vue 3 倒计时 Hook：

\`\`\`ts
import { ref, onUnmounted } from 'vue'

export function useCountdown(seconds: number) {
  const remaining = ref(seconds)
  let timer: number | null = null

  function start() {
    stop()
    timer = window.setInterval(() => {
      if (remaining.value <= 0) return stop()
      remaining.value--
    }, 1000)
  }
  function stop() {
    if (timer) clearInterval(timer)
    timer = null
  }
  function reset(s = seconds) {
    stop()
    remaining.value = s
  }

  onUnmounted(stop)
  return { remaining, start, stop, reset }
}
\`\`\`

调用方式：

\`\`\`ts
const { remaining, start } = useCountdown(60)
start()
\`\`\``,
  },
  {
    thinking: '事件循环（Event Loop）是 JS 的并发模型。\n核心：调用栈 + 任务队列（宏任务 + 微任务）。\n微任务优先于宏任务。',
    answer: `**事件循环（Event Loop）** 是 JavaScript 处理异步的机制。

简化流程：

1. 同步代码进入**调用栈**执行
2. 异步任务被分发到**宏任务队列**（setTimeout、I/O）或**微任务队列**（Promise.then、queueMicrotask）
3. 调用栈空时，先清空所有微任务，再取出 1 个宏任务
4. 渲染后回到步骤 3

| 类型 | 示例 |
| --- | --- |
| 宏任务 | setTimeout / setInterval / I/O |
| 微任务 | Promise.then / MutationObserver |

> 微任务永远跑在同一轮事件循环的末尾，宏任务下一轮才执行。`,
  },
  {
    thinking: '用户想要轻量状态管理。\nPinia 是官方推荐，但 Composition API + provide/inject 也够用。\n小项目可以用 reactive + ref 直接共享。',
    answer: `推荐 3 个方案，按复杂度递增：

- **\`reactive\` + 模块导出**：3 行代码，适合极小项目
- **\`provide / inject\`**：跨层级，无需第三方
- **Pinia**：官方推荐，devtools / SSR / TS 全支持

\`\`\`ts
// 极简方案
import { reactive } from 'vue'
export const store = reactive({ count: 0, user: null })
\`\`\`

如果你已经在用 Vue 3 + TS，直接 **Pinia** 即可。`,
  },
]

function pickReply(prompt: string) {
  const p = prompt.toLowerCase()
  if (p.includes('hook') || p.includes('倒计时')) return mockBank[0]
  if (p.includes('事件循环') || p.includes('event')) return mockBank[1]
  if (p.includes('状态管理') || p.includes('pinia')) return mockBank[2]
  return mockBank[Math.floor(Math.random() * mockBank.length)]
}

async function send() {
  const text = input.value.trim()
  if (!text && files.value.length === 0) {
    message.warning('请输入内容或上传附件')
    return
  }
  if (generating.value) return

  // 处理 /clear 指令
  if (text === '/clear') {
    active.value.messages = []
    input.value = ''
    message.success('已清空当前会话')
    return
  }

  const atts = files.value.map((f) => ({
    name: f.name,
    type: f.type || '',
    url: f.file && f.file.type.startsWith('image/') ? URL.createObjectURL(f.file) : undefined,
  }))

  // 用户消息入栈
  active.value.messages.push({
    id: Date.now(),
    role: 'user',
    content: text,
    attachments: atts.length ? atts : undefined,
    time: new Date().toLocaleTimeString(),
    done: true,
  })

  // 自动以首条消息更新会话标题
  if (active.value.title === '新会话' && text) {
    active.value.title = text.slice(0, 18)
  }

  input.value = ''
  files.value = []
  scrollBottom()

  // AI 占位消息
  const reply = pickReply(text)
  const aiMsg: Msg = {
    id: Date.now() + 1,
    role: 'assistant',
    content: '',
    thinking: showThinking.value ? '' : undefined,
    thinkingExpanded: true,
    time: new Date().toLocaleTimeString(),
    done: false,
  }
  active.value.messages.push(aiMsg)
  generating.value = true
  aborted.value = false

  // 风格前缀
  const tonePrefix: Record<typeof tone.value, string> = {
    default: '',
    concise: '（简洁版）',
    professional: '（专业版）',
    creative: '（创意版）',
  }
  const fullThinking = showThinking.value ? reply.thinking : ''
  const fullAnswer = (tonePrefix[tone.value] ? tonePrefix[tone.value] + '\n\n' : '') + reply.answer

  // 流式输出：先思考，后回答
  let phase: 'thinking' | 'answer' = showThinking.value ? 'thinking' : 'answer'
  let i = 0
  await new Promise<void>((resolve) => {
    timer = window.setInterval(() => {
      if (aborted.value) {
        aiMsg.content += '\n\n_（已停止生成）_'
        aiMsg.done = true
        clearInterval(timer!)
        timer = null
        resolve()
        return
      }
      if (phase === 'thinking') {
        if (i < fullThinking.length) {
          aiMsg.thinking = (aiMsg.thinking || '') + fullThinking[i]
          i++
        } else {
          phase = 'answer'
          aiMsg.thinkingExpanded = false // 切到回答时自动折叠
          i = 0
        }
      } else {
        if (i < fullAnswer.length) {
          aiMsg.content += fullAnswer[i]
          i++
        } else {
          aiMsg.done = true
          clearInterval(timer!)
          timer = null
          resolve()
        }
      }
      scrollBottom()
    }, 18)
  })
  generating.value = false
}

function stop() {
  aborted.value = true
}

function applyQuick(text: string) {
  input.value = text
}
function applySlash(cmd: string) {
  input.value = cmd + ' '
}

function handleUpload({ fileList }: { fileList: UploadFileInfo[] }) {
  files.value = fileList
}
function removeFile(name: string) {
  files.value = files.value.filter((f) => f.name !== name)
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey && !showSlash.value) {
    e.preventDefault()
    send()
  }
}

onMounted(scrollBottom)
onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div class="playground">
    <h2 class="text-xl font-semibold mb-4">Playground 综合对话</h2>

    <NCard :content-style="{ padding: 0 }" class="pg-shell">
      <div class="pg-layout">
        <!-- 左侧会话列表 -->
        <aside class="pg-side">
          <div class="side-header">
            <NButton block type="primary" @click="newSession">+ 新会话</NButton>
          </div>
          <div class="side-list">
            <NEmpty v-if="!sessions.length" description="暂无会话" />
            <div
              v-for="s in sessions"
              :key="s.id"
              :class="['session-item', { active: s.id === activeId }]"
              @click="activeId = s.id"
            >
              <div class="session-icon">💬</div>
              <div class="session-title">{{ s.title }}</div>
              <NButton
                size="tiny" quaternary class="session-del"
                @click.stop="deleteSession(s.id)"
              >✕</NButton>
            </div>
          </div>
        </aside>

        <!-- 主对话区 -->
        <section class="pg-main">
          <!-- 消息流 -->
          <div ref="scrollRef" class="pg-messages">
            <div v-if="!active.messages.length" class="pg-welcome">
              <div class="welcome-emoji">🤖</div>
              <h3>有什么可以帮你？</h3>
              <p class="text-gray-500">选一个开始，或自由提问</p>
              <NSpace class="mt-4" justify="center">
                <NButton
                  v-for="(p, i) in quickPrompts"
                  :key="i" size="small" dashed
                  @click="applyQuick(p)"
                >{{ p }}</NButton>
              </NSpace>
            </div>

            <div
              v-for="m in active.messages" :key="m.id"
              :class="['msg-row', m.role]"
            >
              <NAvatar
                round size="small"
                :color="m.role === 'assistant' ? '#18a058' : '#2080f0'"
              >
                {{ m.role === 'assistant' ? '🤖' : '我' }}
              </NAvatar>
              <div class="msg-body">
                <!-- 附件 -->
                <div v-if="m.attachments?.length" class="msg-attachments">
                  <div v-for="a in m.attachments" :key="a.name" class="att">
                    <img v-if="a.url" :src="a.url" alt="img" />
                    <span v-else>📎 {{ a.name }}</span>
                  </div>
                </div>

                <!-- 思维链折叠区 -->
                <div v-if="m.thinking !== undefined" class="thinking-box">
                  <div
                    class="thinking-header"
                    @click="m.thinkingExpanded = !m.thinkingExpanded"
                  >
                    <span>{{ m.done || m.content ? '✅ 已完成思考' : '🧠 正在思考...' }}</span>
                    <span class="arrow">{{ m.thinkingExpanded ? '▾' : '▸' }}</span>
                  </div>
                  <NCollapseTransition :show="m.thinkingExpanded">
                    <div class="thinking-content">{{ m.thinking }}</div>
                  </NCollapseTransition>
                </div>

                <!-- 内容气泡 -->
                <div
                  v-if="m.content || m.role === 'user'"
                  :class="['msg-bubble', m.role]"
                >
                  <div
                    v-if="m.role === 'assistant'"
                    class="md-content"
                    v-html="renderMd(m.content)"
                  />
                  <div v-else class="user-text">{{ m.content }}</div>
                  <span
                    v-if="!m.done && m.role === 'assistant' && m.content"
                    class="cursor"
                  >▍</span>
                </div>
                <div class="msg-time">{{ m.time }}</div>
              </div>
            </div>
          </div>

          <!-- Sender 输入区 -->
          <div class="pg-sender">
            <!-- 附件预览 -->
            <div v-if="files.length" class="files-row">
              <NTag
                v-for="f in files" :key="f.name"
                closable type="info" :bordered="false"
                @close="removeFile(f.name)"
              >📎 {{ f.name }}</NTag>
            </div>

            <!-- Slash 建议 -->
            <div v-if="showSlash && filteredSlash.length" class="slash-pop">
              <div
                v-for="c in filteredSlash" :key="c.cmd"
                class="slash-item"
                @mousedown.prevent="applySlash(c.cmd)"
              >
                <span class="slash-cmd">{{ c.cmd }}</span>
                <span class="slash-desc">{{ c.desc }}</span>
              </div>
            </div>

            <NInput
              v-model:value="input"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 6 }"
              placeholder="输入消息... ( / 命令，Enter 发送，Shift+Enter 换行)"
              :disabled="generating"
              @keydown="onKeydown"
            />

            <NSpace class="mt-2" align="center" justify="space-between">
              <NSpace>
                <NUpload
                  :show-file-list="false"
                  multiple
                  :default-upload="false"
                  :on-change="handleUpload"
                >
                  <NTooltip>
                    <template #trigger>
                      <NButton quaternary size="small">📎 附件</NButton>
                    </template>
                    上传图片 / 文档
                  </NTooltip>
                </NUpload>
                <NButton
                  v-for="t in tones" :key="t.value"
                  size="small"
                  :type="tone === t.value ? 'primary' : 'default'"
                  :tertiary="tone !== t.value"
                  @click="tone = t.value"
                >{{ t.label }}</NButton>
                <NButton
                  size="small"
                  :type="showThinking ? 'primary' : 'default'"
                  :tertiary="!showThinking"
                  @click="showThinking = !showThinking"
                >🧠 思维链</NButton>
              </NSpace>
              <NButton
                v-if="generating"
                type="error" @click="stop"
              >⏹ 停止</NButton>
              <NButton
                v-else
                type="primary"
                :disabled="!input.trim() && !files.length"
                @click="send"
              >✈ 发送</NButton>
            </NSpace>
          </div>
        </section>
      </div>
    </NCard>
  </div>
</template>

<style scoped>
.pg-shell {
  height: calc(100vh - 200px);
  min-height: 560px;
}
.pg-layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  height: 100%;
}
.pg-side {
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e5e7eb;
  background: #fafafa;
}
.side-header {
  padding: 12px;
  border-bottom: 1px solid #e5e7eb;
}
.side-list {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
}
.session-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  margin-bottom: 2px;
}
.session-item:hover {
  background: #f3f4f6;
}
.session-item.active {
  background: rgba(24, 160, 88, 0.1);
}
.session-icon { flex-shrink: 0; }
.session-title {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.session-del {
  opacity: 0;
}
.session-item:hover .session-del,
.session-item.active .session-del {
  opacity: 1;
}

.pg-main {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.pg-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px 24px;
}
.pg-welcome {
  text-align: center;
  margin: 60px auto;
}
.welcome-emoji {
  font-size: 56px;
  margin-bottom: 12px;
}
.pg-welcome h3 {
  font-size: 22px;
  font-weight: 600;
  margin: 0 0 4px;
}

.msg-row {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  align-items: flex-start;
}
.msg-row.user {
  flex-direction: row-reverse;
}
.msg-body {
  max-width: 80%;
  min-width: 0;
}
.msg-attachments {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 6px;
}
.att img {
  width: 72px;
  height: 72px;
  object-fit: cover;
  border-radius: 6px;
}
.att span {
  display: inline-block;
  padding: 4px 10px;
  background: #eef2ff;
  border-radius: 6px;
  font-size: 12px;
}

.msg-bubble {
  padding: 12px 16px;
  border-radius: 12px;
  background: #f3f4f6;
  line-height: 1.7;
  word-break: break-word;
}
.msg-bubble.user {
  background: #d6e4ff;
  color: #1f2937;
}
.user-text {
  white-space: pre-wrap;
}
.msg-time {
  font-size: 11px;
  color: #9ca3af;
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
@keyframes blink { to { opacity: 0; } }

.thinking-box {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fafafa;
  margin-bottom: 8px;
  overflow: hidden;
  font-size: 13px;
}
.thinking-header {
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
  background: #f3f4f6;
  color: #6b7280;
}
.thinking-header:hover { background: #e5e7eb; }
.thinking-content {
  padding: 10px 12px;
  color: #6b7280;
  white-space: pre-wrap;
  line-height: 1.7;
}

/* Sender */
.pg-sender {
  border-top: 1px solid #e5e7eb;
  padding: 12px 16px;
  background: #fff;
  position: relative;
}
.files-row {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 8px;
}
.slash-pop {
  position: absolute;
  bottom: calc(100% - 4px);
  left: 16px;
  right: 16px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
  padding: 6px;
  z-index: 10;
  max-height: 220px;
  overflow-y: auto;
}
.slash-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
}
.slash-item:hover { background: #f3f4f6; }
.slash-cmd {
  color: #18a058;
  font-family: 'SF Mono', Consolas, monospace;
}
.slash-desc {
  color: #6b7280;
  font-size: 12px;
}

/* Markdown 渲染 */
.md-content :deep(pre.hljs) {
  background: #282c34;
  color: #abb2bf;
  border-radius: 8px;
  padding: 12px 14px;
  overflow-x: auto;
  margin: 10px 0;
  font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
  font-size: 13px;
}
.md-content :deep(p code),
.md-content :deep(li code) {
  background: rgba(0, 0, 0, 0.06);
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 0.9em;
}
.md-content :deep(table) {
  border-collapse: collapse;
  margin: 10px 0;
}
.md-content :deep(th),
.md-content :deep(td) {
  border: 1px solid #d0d7de;
  padding: 6px 12px;
}
.md-content :deep(blockquote) {
  border-left: 3px solid #d0d7de;
  padding-left: 12px;
  color: #6b7280;
  margin: 10px 0;
}
.md-content :deep(p) { margin: 6px 0; }
.md-content :deep(ul), .md-content :deep(ol) {
  padding-left: 22px;
  margin: 6px 0;
}

@media (max-width: 768px) {
  .pg-layout { grid-template-columns: 1fr; }
  .pg-side { display: none; }
}
</style>
