<script setup lang="ts">
/**
 * Thinking 思维链 Demo
 * 展示 DeepSeek-R1 / o1 风格的"思考过程"折叠区 + 最终答案
 */
import { ref, onBeforeUnmount } from 'vue'
import { NCard, NButton, NCollapseTransition, NSpace, NTag, NAvatar } from 'naive-ui'

interface Run {
  thinking: string
  answer: string
  thinkingDone: boolean
  answerDone: boolean
  elapsed: number
}

const fullThinking = `用户问的是"3 个鸡蛋煮 5 分钟，6 个鸡蛋煮多少分钟"。
这是一个常见的逻辑陷阱题。
关键点：煮鸡蛋的时间取决于水温从冷到熟的过程，与鸡蛋数量无关（只要锅够大）。
所以正确答案应该仍是 5 分钟。
让我再确认一下…对，没错。`

const fullAnswer = `仍然是 **5 分钟**。

煮鸡蛋的时间取决于热传导的物理过程，与鸡蛋数量无关（前提是锅足够大、水量充足）。一次煮 1 个还是 6 个，只要水温达到要求，5 分钟即可。`

const run = ref<Run>({ thinking: '', answer: '', thinkingDone: false, answerDone: false, elapsed: 0 })
const expanded = ref(true)
const running = ref(false)
let timer: number | null = null
let startedAt = 0

function start() {
  if (running.value) return
  running.value = true
  expanded.value = true
  run.value = { thinking: '', answer: '', thinkingDone: false, answerDone: false, elapsed: 0 }
  startedAt = Date.now()
  let i = 0
  timer = window.setInterval(() => {
    run.value.elapsed = ((Date.now() - startedAt) / 1000)
    if (i < fullThinking.length) {
      run.value.thinking += fullThinking[i]
      i++
    } else if (!run.value.thinkingDone) {
      run.value.thinkingDone = true
      i = 0
    } else if (i < fullAnswer.length) {
      run.value.answer += fullAnswer[i]
      i++
    } else {
      run.value.answerDone = true
      stop()
    }
  }, 25)
}

function stop() {
  if (timer) clearInterval(timer)
  timer = null
  running.value = false
}

onBeforeUnmount(stop)
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Thinking 思维链</h2>
    <NCard>
      <NSpace class="mb-4">
        <NButton type="primary" :disabled="running" @click="start">🧠 开始推理</NButton>
        <NTag v-if="run.elapsed" :bordered="false" type="info">已耗时 {{ run.elapsed.toFixed(1) }}s</NTag>
        <NTag v-if="run.answerDone" :bordered="false" type="success">完成</NTag>
      </NSpace>

      <div v-if="run.thinking || run.answer" class="msg-row">
        <NAvatar round size="small" color="#18a058">🤖</NAvatar>
        <div class="msg-content">
          <!-- 思考过程 -->
          <div class="thinking-box">
            <div class="thinking-header" @click="expanded = !expanded">
              <span class="text-sm">
                {{ run.thinkingDone ? '✅ 已完成思考' : '🧠 正在思考...' }}
                <span v-if="run.elapsed" class="text-gray-500"> · {{ run.elapsed.toFixed(1) }}s</span>
              </span>
              <span class="arrow">{{ expanded ? '▾' : '▸' }}</span>
            </div>
            <NCollapseTransition :show="expanded">
              <div class="thinking-content">{{ run.thinking }}<span v-if="!run.thinkingDone" class="cursor">▍</span></div>
            </NCollapseTransition>
          </div>

          <!-- 最终回答 -->
          <div v-if="run.thinkingDone" class="answer">
            <div style="white-space: pre-wrap">{{ run.answer }}<span v-if="!run.answerDone" class="cursor">▍</span></div>
          </div>
        </div>
      </div>
    </NCard>
  </div>
</template>

<style scoped>
.msg-row {
  display: flex;
  gap: 10px;
  align-items: flex-start;
}
.msg-content {
  flex: 1;
}
.thinking-box {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fafafa;
  margin-bottom: 14px;
  overflow: hidden;
}
.thinking-header {
  padding: 10px 14px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
  background: #f3f4f6;
}
.thinking-header:hover {
  background: #e5e7eb;
}
.arrow {
  color: #6b7280;
  font-size: 12px;
}
.thinking-content {
  padding: 12px 14px;
  color: #6b7280;
  font-size: 13px;
  line-height: 1.7;
  white-space: pre-wrap;
}
.answer {
  padding: 14px 16px;
  background: #f0f9ff;
  border-radius: 8px;
  line-height: 1.7;
  color: #1f2937;
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
