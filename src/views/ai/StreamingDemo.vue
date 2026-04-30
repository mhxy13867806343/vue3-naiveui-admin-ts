<script setup lang="ts">
/**
 * Streaming 流式输出 Demo
 * 模拟 SSE / 流式响应：逐字 / 逐 token 打字机效果，支持速度与中断
 */
import { ref, computed, onBeforeUnmount } from 'vue'
import { NCard, NButton, NSpace, NSlider, NSelect, NTag, NDivider } from 'naive-ui'

const fullText = `# 流式输出原理

大语言模型（LLM）通常以 token 为单位生成文本。前端通过 **Server-Sent Events (SSE)** 或 **WebSocket** 协议接收增量数据，逐步追加到界面。

## 关键点

- 每接收一个增量片段就更新视图
- 使用光标 ▍ 表达"正在输出"状态
- 支持用户主动中断（abort）
- 输出完成后切换到 markdown 渲染态

\`\`\`ts
const reader = response.body!.getReader()
while (true) {
  const { done, value } = await reader.read()
  if (done) break
  output.value += decoder.decode(value)
}
\`\`\`

> 这只是一个前端模拟，没有真正调用任何模型接口。`

const output = ref('')
const speed = ref(40) // ms / 字
const mode = ref<'char' | 'word'>('char')
const running = ref(false)
let timer: number | null = null

const progress = computed(() =>
  fullText.length === 0 ? 0 : Math.round((output.value.length / fullText.length) * 100),
)

function start() {
  if (running.value) return
  output.value = ''
  running.value = true
  let i = 0
  timer = window.setInterval(() => {
    if (i >= fullText.length) {
      stop()
      return
    }
    if (mode.value === 'char') {
      output.value += fullText[i]
      i++
    } else {
      // word 模式：取到下一个空格 / 换行
      const next = fullText.slice(i).search(/[\s\n]/)
      const step = next === -1 ? fullText.length - i : next + 1
      output.value += fullText.slice(i, i + step)
      i += step
    }
  }, speed.value)
}

function stop() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
  running.value = false
}

function reset() {
  stop()
  output.value = ''
}

onBeforeUnmount(stop)
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Streaming 流式输出</h2>
    <NCard>
      <NSpace align="center" class="mb-4" :wrap="true">
        <NButton type="primary" :disabled="running" @click="start">▶ 开始</NButton>
        <NButton :disabled="!running" @click="stop">⏸ 停止</NButton>
        <NButton quaternary @click="reset">🔄 重置</NButton>
        <NDivider vertical />
        <span>速度 (ms/帧)：</span>
        <div style="width: 160px">
          <NSlider v-model:value="speed" :min="5" :max="200" :step="5" :disabled="running" />
        </div>
        <NTag :bordered="false" type="info">{{ speed }} ms</NTag>
        <NDivider vertical />
        <span>颗粒度：</span>
        <NSelect
          v-model:value="mode"
          :options="[
            { label: '逐字 (char)', value: 'char' },
            { label: '逐词 (word)', value: 'word' },
          ]"
          :disabled="running"
          style="width: 140px"
        />
        <NTag :bordered="false" :type="running ? 'warning' : 'success'">
          {{ running ? '⏳ 生成中...' : '✅ 就绪' }}
        </NTag>
        <NTag :bordered="false">{{ progress }}%</NTag>
      </NSpace>
      <pre class="stream-output">{{ output }}<span v-if="running" class="cursor">▍</span></pre>
    </NCard>
  </div>
</template>

<style scoped>
.stream-output {
  min-height: 280px;
  padding: 16px;
  background: #1e1e2e;
  color: #cdd6f4;
  border-radius: 8px;
  font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
  font-size: 13px;
  line-height: 1.7;
  white-space: pre-wrap;
  word-break: break-word;
  overflow-x: auto;
}
.cursor {
  display: inline-block;
  margin-left: 2px;
  background: #cdd6f4;
  width: 8px;
  animation: blink 1s steps(2) infinite;
}
@keyframes blink {
  to { opacity: 0; }
}
</style>
