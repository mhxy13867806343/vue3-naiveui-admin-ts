<script setup lang="ts">
/**
 * useChatRequest Hook Demo
 * 自定义 Hook：模拟 AI 聊天请求（含 SSE 流式 / 中断 / 错误重试）
 * 与真实 LLM 接口的接入点：把 mockSSE 替换为 fetch + ReadableStream
 */
import { ref, onBeforeUnmount } from 'vue'
import { NButton, NInput, NSpace, NTag, NAlert } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

// ---------- Hook 实现 ----------
type ReqStatus = 'idle' | 'loading' | 'streaming' | 'success' | 'error' | 'aborted'

interface UseChatRequestOptions {
  onMessage?: (chunk: string) => void
  onDone?: (full: string) => void
  onError?: (err: Error) => void
}

function useChatRequest(opts: UseChatRequestOptions = {}) {
  const status = ref<ReqStatus>('idle')
  const response = ref('')
  const error = ref<Error | null>(null)
  const elapsed = ref(0)
  let controller: AbortController | null = null
  let timer: number | null = null
  let elapsedTimer: number | null = null

  // 模拟 SSE：每 X ms 推送一个 chunk
  function mockSSE(prompt: string, signal: AbortSignal): Promise<void> {
    return new Promise((resolve, reject) => {
      // 模拟 5% 失败率
      if (Math.random() < 0.05) {
        return reject(new Error('网络错误：连接被服务器拒绝 (mock)'))
      }
      const fullReply = `针对你的问题"${prompt.slice(0, 30)}"，AI 助手认为可以从以下角度展开：\n1. 明确目标与边界条件\n2. 拆分为可独立验证的子任务\n3. 选择合适的工具或库\n4. 编写最小可运行示例并迭代\n这是一段 mock 流式回复，用来演示 useChatRequest 的接入方式。`
      let i = 0
      timer = window.setInterval(() => {
        if (signal.aborted) {
          clearInterval(timer!)
          return reject(new DOMException('Aborted', 'AbortError'))
        }
        if (i >= fullReply.length) {
          clearInterval(timer!)
          timer = null
          return resolve()
        }
        // 一次推 1-3 个字
        const step = Math.min(Math.floor(Math.random() * 3) + 1, fullReply.length - i)
        const chunk = fullReply.slice(i, i + step)
        opts.onMessage?.(chunk)
        response.value += chunk
        i += step
      }, 40)
    })
  }

  async function send(prompt: string) {
    if (!prompt.trim()) return
    abort()
    response.value = ''
    error.value = null
    elapsed.value = 0
    status.value = 'loading'
    controller = new AbortController()

    const startedAt = Date.now()
    elapsedTimer = window.setInterval(() => {
      elapsed.value = (Date.now() - startedAt) / 1000
    }, 100)

    try {
      // 模拟首字延迟
      await new Promise((r) => setTimeout(r, 300))
      if (controller.signal.aborted) throw new DOMException('Aborted', 'AbortError')
      status.value = 'streaming'
      await mockSSE(prompt, controller.signal)
      status.value = 'success'
      opts.onDone?.(response.value)
    } catch (e) {
      const err = e as Error
      if (err.name === 'AbortError') {
        status.value = 'aborted'
      } else {
        error.value = err
        status.value = 'error'
        opts.onError?.(err)
      }
    } finally {
      if (elapsedTimer) clearInterval(elapsedTimer)
      elapsedTimer = null
    }
  }

  function abort() {
    controller?.abort()
    if (timer) clearInterval(timer)
    timer = null
  }

  function reset() {
    abort()
    response.value = ''
    error.value = null
    status.value = 'idle'
    elapsed.value = 0
  }

  return { status, response, error, elapsed, send, abort, reset }
}

// ---------- Demo ----------
const prompt = ref('帮我设计一个登录页')
const log = ref<string[]>([])

const chat = useChatRequest({
  onMessage: () => { /* per-chunk hook */ },
  onDone: (full) => log.value.push(`[done] ${full.length} chars`),
  onError: (e) => log.value.push(`[error] ${e.message}`),
})

function send() {
  log.value.push(`[send] ${prompt.value}`)
  chat.send(prompt.value)
}

function retry() {
  send()
}

const code = `function useChatRequest(opts = {}) {
  const status = ref<'idle'|'loading'|'streaming'|'success'|'error'|'aborted'>('idle')
  const response = ref('')
  const error = ref<Error | null>(null)
  let controller: AbortController | null = null

  async function send(prompt: string) {
    abort()
    response.value = ''
    status.value = 'loading'
    controller = new AbortController()
    try {
      // 真实 LLM 接入：替换为 fetch
      // const res = await fetch('/api/chat', {
      //   method: 'POST', body: JSON.stringify({ prompt }),
      //   signal: controller.signal,
      // })
      // const reader = res.body!.getReader()
      // ...

      status.value = 'streaming'
      // 处理流式 chunk → response.value += chunk → opts.onMessage?.(chunk)
      status.value = 'success'
    } catch (e) {
      if ((e as Error).name === 'AbortError') status.value = 'aborted'
      else { error.value = e as Error; status.value = 'error' }
    }
  }
  function abort() { controller?.abort() }

  return { status, response, error, send, abort }
}`

onBeforeUnmount(chat.reset)
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">useChatRequest — AI 请求 Hook</h2>

    <CodePreview
      title="Hook 用法"
      description="封装 AI 聊天请求的完整生命周期：loading / streaming / success / error / aborted；含 AbortController 中断 + 5% mock 失败率（演示错误状态）"
      :code="code"
    >
      <NInput
        v-model:value="prompt"
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4 }"
        placeholder="输入你的问题..."
        :disabled="chat.status.value === 'loading' || chat.status.value === 'streaming'"
      />

      <NSpace class="mt-3" align="center">
        <NButton
          type="primary"
          :loading="chat.status.value === 'loading'"
          :disabled="chat.status.value === 'streaming'"
          @click="send"
        >✈ 发送</NButton>
        <NButton
          v-if="chat.status.value === 'loading' || chat.status.value === 'streaming'"
          type="error" @click="chat.abort"
        >⏹ 中断</NButton>
        <NButton
          v-if="chat.status.value === 'error'"
          @click="retry"
        >🔄 重试</NButton>
        <NButton quaternary @click="chat.reset">清空</NButton>
        <NTag
          :bordered="false"
          :type="chat.status.value === 'success' ? 'success' : chat.status.value === 'error' ? 'error' : chat.status.value === 'aborted' ? 'warning' : 'info'"
        >状态：{{ chat.status.value }}</NTag>
        <NTag :bordered="false">耗时：{{ chat.elapsed.value.toFixed(1) }}s</NTag>
        <NTag :bordered="false">{{ chat.response.value.length }} 字</NTag>
      </NSpace>

      <!-- 错误提示 -->
      <NAlert
        v-if="chat.status.value === 'error'"
        type="error" :title="chat.error.value?.message"
        class="mt-3"
        closable
      >
        请检查网络或重试。已为你保留输入。
      </NAlert>

      <!-- 响应 -->
      <div class="response">
        <div v-if="!chat.response.value && chat.status.value === 'idle'" class="text-gray-400 text-sm">
          点击"发送"查看 AI 回复
        </div>
        <div v-else>
          {{ chat.response.value }}<span v-if="chat.status.value === 'streaming'" class="cursor">▍</span>
        </div>
      </div>

      <!-- 调试日志 -->
      <details class="mt-3" :open="log.length > 0">
        <summary class="text-sm text-gray-500 cursor-pointer">📋 事件日志 ({{ log.length }})</summary>
        <pre class="logs">{{ log.join('\n') || '(无)' }}</pre>
      </details>
    </CodePreview>
  </div>
</template>

<style scoped>
.response {
  margin-top: 12px;
  min-height: 120px;
  padding: 14px 16px;
  background: #f9fafb;
  border-radius: 8px;
  line-height: 1.7;
  white-space: pre-wrap;
  word-break: break-word;
}
.cursor {
  display: inline-block;
  margin-left: 2px;
  animation: blink 1s steps(2) infinite;
}
@keyframes blink { to { opacity: 0; } }
.logs {
  margin-top: 6px;
  padding: 10px;
  background: #1e1e2e;
  color: #cdd6f4;
  border-radius: 6px;
  font-family: 'SF Mono', Consolas, monospace;
  font-size: 12px;
  max-height: 200px;
  overflow-y: auto;
}
</style>
