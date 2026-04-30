<script setup lang="ts">
/**
 * useTypingStream Hook Demo
 * 自定义 Hook：将"完整字符串"模拟为"流式增量输出"
 * 实战场景：调用 LLM 接口前的 mock，或基于 ReadableStream 解析 SSE
 */
import { ref, onBeforeUnmount } from 'vue'
import { NButton, NSpace, NTag, NSlider, NInput } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

// ---------- Hook 实现 ----------
type Status = 'idle' | 'streaming' | 'done' | 'aborted'

function useTypingStream(opts: { delay?: number } = {}) {
  const text = ref('')
  const status = ref<Status>('idle')
  const progress = ref(0)
  let timer: number | null = null
  let aborted = false

  function start(full: string, customDelay?: number) {
    stop()
    aborted = false
    text.value = ''
    status.value = 'streaming'
    progress.value = 0
    let i = 0
    const d = customDelay ?? opts.delay ?? 30
    timer = window.setInterval(() => {
      if (aborted) return
      if (i >= full.length) {
        status.value = 'done'
        progress.value = 100
        clearInterval(timer!)
        timer = null
        return
      }
      text.value += full[i]
      i++
      progress.value = Math.round((i / full.length) * 100)
    }, d)
  }

  function stop() {
    if (timer) clearInterval(timer)
    timer = null
  }

  function abort() {
    aborted = true
    stop()
    status.value = 'aborted'
  }

  function reset() {
    stop()
    text.value = ''
    status.value = 'idle'
    progress.value = 0
  }

  return { text, status, progress, start, stop, abort, reset }
}

// ---------- Demo ----------
const stream = useTypingStream({ delay: 30 })

const source = ref(`大型语言模型在生成回答时通常以 token 为单位流式返回。
前端可以通过 ReadableStream / EventSource / WebSocket 接收。
useTypingStream 把完整文本切成增量帧，模拟这种体验。
你可以把它接入真实 SSE：把每次解析到的 chunk push 到 text。`)

const speed = ref(30)

function play() {
  stream.start(source.value, speed.value)
}

const code = `function useTypingStream(opts: { delay?: number } = {}) {
  const text = ref('')
  const status = ref<'idle'|'streaming'|'done'|'aborted'>('idle')
  let timer: number | null = null
  let aborted = false

  function start(full: string, customDelay?: number) {
    stop(); aborted = false
    text.value = ''
    status.value = 'streaming'
    let i = 0
    const d = customDelay ?? opts.delay ?? 30
    timer = window.setInterval(() => {
      if (aborted) return
      if (i >= full.length) {
        status.value = 'done'
        clearInterval(timer!); timer = null
        return
      }
      text.value += full[i++]
    }, d)
  }
  function abort() { aborted = true; status.value = 'aborted' }
  function reset() { /* ... */ }

  return { text, status, start, abort, reset }
}`

onBeforeUnmount(stream.stop)
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">useTypingStream — 流式输出 Hook</h2>

    <CodePreview
      title="Hook 用法"
      description="把完整文本以指定节奏增量输出，可中断、可重置；可作为 SSE / WebSocket 的本地 mock"
      :code="code"
    >
      <NSpace align="center" class="mb-3" :wrap="true">
        <NButton type="primary" :disabled="stream.status.value === 'streaming'" @click="play">▶ 播放</NButton>
        <NButton :disabled="stream.status.value !== 'streaming'" @click="stream.abort">⏹ 中断</NButton>
        <NButton quaternary @click="stream.reset">🔄 重置</NButton>
        <span>速度</span>
        <div style="width: 140px">
          <NSlider v-model:value="speed" :min="5" :max="120" :step="5" />
        </div>
        <NTag :bordered="false" type="info">{{ speed }} ms</NTag>
        <NTag
          :bordered="false"
          :type="stream.status.value === 'streaming' ? 'warning' : stream.status.value === 'done' ? 'success' : stream.status.value === 'aborted' ? 'error' : 'default'"
        >状态：{{ stream.status.value }}</NTag>
        <NTag :bordered="false">{{ stream.progress.value }}%</NTag>
      </NSpace>

      <NInput
        v-model:value="source"
        type="textarea"
        :autosize="{ minRows: 3, maxRows: 6 }"
        placeholder="输入源文本..."
        class="mb-3"
      />

      <pre class="output">{{ stream.text.value }}<span v-if="stream.status.value === 'streaming'" class="cursor">▍</span></pre>
    </CodePreview>
  </div>
</template>

<style scoped>
.output {
  min-height: 160px;
  padding: 14px;
  background: #1e1e2e;
  color: #cdd6f4;
  border-radius: 8px;
  font-family: 'SF Mono', Consolas, monospace;
  font-size: 13px;
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
</style>
