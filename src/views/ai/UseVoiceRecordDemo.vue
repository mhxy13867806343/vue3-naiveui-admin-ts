<script setup lang="ts">
/**
 * useVoiceRecord Hook Demo
 * 自定义 Hook：浏览器麦克风录音（基于 MediaRecorder API）
 * 输出：录音状态、时长、Blob URL（可直接 <audio> 播放）
 * 失败时（无麦克风/拒绝授权）回退到模拟模式
 */
import { ref, onBeforeUnmount } from 'vue'
import {
  NButton, NSpace, NTag, NEmpty, useMessage,
} from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

// ---------- Hook 实现 ----------
type RecordStatus = 'idle' | 'recording' | 'paused' | 'stopped' | 'error'

function useVoiceRecord() {
  const status = ref<RecordStatus>('idle')
  const duration = ref(0) // 秒
  const audioUrl = ref<string | null>(null)
  const errorMsg = ref('')

  let recorder: MediaRecorder | null = null
  let chunks: Blob[] = []
  let stream: MediaStream | null = null
  let timer: number | null = null
  let mockMode = false

  async function start() {
    reset()
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      // 回退：模拟录音
      mockMode = true
      status.value = 'recording'
      tickDuration()
      return
    }
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      recorder = new MediaRecorder(stream)
      chunks = []
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data)
      }
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' })
        audioUrl.value = URL.createObjectURL(blob)
        stream?.getTracks().forEach((t) => t.stop())
      }
      recorder.start()
      status.value = 'recording'
      tickDuration()
    } catch (e) {
      // 用户拒绝/无设备 → 回退模拟
      mockMode = true
      status.value = 'recording'
      errorMsg.value = (e as Error).message
      tickDuration()
    }
  }

  function tickDuration() {
    if (timer) clearInterval(timer)
    timer = window.setInterval(() => {
      duration.value += 0.1
    }, 100)
  }

  function pause() {
    if (status.value !== 'recording') return
    if (!mockMode && recorder?.state === 'recording') recorder.pause()
    if (timer) clearInterval(timer)
    status.value = 'paused'
  }

  function resume() {
    if (status.value !== 'paused') return
    if (!mockMode && recorder?.state === 'paused') recorder.resume()
    tickDuration()
    status.value = 'recording'
  }

  function stop() {
    if (timer) clearInterval(timer)
    timer = null
    if (mockMode) {
      audioUrl.value = '__mock__'
      mockMode = false
    } else if (recorder && recorder.state !== 'inactive') {
      recorder.stop()
    }
    status.value = 'stopped'
  }

  function reset() {
    if (timer) clearInterval(timer)
    if (audioUrl.value && audioUrl.value !== '__mock__') URL.revokeObjectURL(audioUrl.value)
    audioUrl.value = null
    duration.value = 0
    errorMsg.value = ''
    status.value = 'idle'
    chunks = []
    mockMode = false
  }

  return { status, duration, audioUrl, errorMsg, start, pause, resume, stop, reset }
}

// ---------- Demo ----------
const message = useMessage()
const rec = useVoiceRecord()

const code = `function useVoiceRecord() {
  const status = ref<'idle'|'recording'|'paused'|'stopped'>('idle')
  const duration = ref(0)
  const audioUrl = ref<string | null>(null)
  let recorder: MediaRecorder | null = null

  async function start() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    recorder = new MediaRecorder(stream)
    const chunks: Blob[] = []
    recorder.ondataavailable = e => chunks.push(e.data)
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'audio/webm' })
      audioUrl.value = URL.createObjectURL(blob)
      stream.getTracks().forEach(t => t.stop())
    }
    recorder.start()
    status.value = 'recording'
  }
  function stop() { recorder?.stop(); status.value = 'stopped' }
  return { status, duration, audioUrl, start, stop }
}`

function fmt(s: number) {
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}

async function handleStart() {
  await rec.start()
  if (rec.errorMsg.value) {
    message.warning('已切换到模拟模式：' + rec.errorMsg.value)
  }
}

onBeforeUnmount(rec.reset)
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">useVoiceRecord — 麦克风录音 Hook</h2>

    <CodePreview
      title="Hook 用法"
      description="基于 MediaRecorder API 的录音 Hook；浏览器无权限时回退到模拟模式（仅展示 UI 流程）"
      :code="code"
    >
      <!-- 状态 -->
      <NSpace class="mb-4" align="center">
        <NTag
          size="large" round :bordered="false"
          :type="rec.status.value === 'recording' ? 'error' : rec.status.value === 'paused' ? 'warning' : rec.status.value === 'stopped' ? 'success' : 'default'"
        >
          <span :class="['dot', rec.status.value]"></span>
          {{ rec.status.value }}
        </NTag>
        <NTag size="large" :bordered="false" type="info">⏱ {{ fmt(rec.duration.value) }}</NTag>
      </NSpace>

      <!-- 控制按钮 -->
      <NSpace>
        <NButton
          v-if="rec.status.value === 'idle' || rec.status.value === 'stopped'"
          type="primary" @click="handleStart"
        >🎤 开始录音</NButton>
        <NButton
          v-if="rec.status.value === 'recording'"
          @click="rec.pause"
        >⏸ 暂停</NButton>
        <NButton
          v-if="rec.status.value === 'paused'"
          type="primary" @click="rec.resume"
        >▶ 继续</NButton>
        <NButton
          v-if="rec.status.value === 'recording' || rec.status.value === 'paused'"
          type="error" @click="rec.stop"
        >⏹ 停止</NButton>
        <NButton
          v-if="rec.status.value === 'stopped'"
          quaternary @click="rec.reset"
        >🔄 重新录制</NButton>
      </NSpace>

      <!-- 波形动画（录音时） -->
      <div v-if="rec.status.value === 'recording'" class="wave">
        <span v-for="i in 24" :key="i" :style="{ animationDelay: (i * 60) + 'ms' }"></span>
      </div>

      <!-- 录音结果 -->
      <div v-if="rec.status.value === 'stopped'" class="result">
        <div class="text-sm text-gray-500 mb-2">📁 录音结果（{{ fmt(rec.duration.value) }}）</div>
        <audio
          v-if="rec.audioUrl.value && rec.audioUrl.value !== '__mock__'"
          :src="rec.audioUrl.value!"
          controls
          style="width: 100%"
        />
        <NEmpty
          v-else
          description="模拟模式无真实音频可播放（请在 https 环境授权麦克风）"
        />
      </div>
    </CodePreview>
  </div>
</template>

<style scoped>
.dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 6px;
  vertical-align: middle;
  background: #94a3b8;
}
.dot.recording {
  background: #d03050;
  animation: pulse 1s infinite;
}
.dot.paused { background: #f0a020; }
.dot.stopped { background: #18a058; }
@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(208, 48, 80, 0.5); }
  50% { box-shadow: 0 0 0 8px rgba(208, 48, 80, 0); }
}

.wave {
  display: flex;
  align-items: center;
  gap: 3px;
  height: 60px;
  margin-top: 16px;
  padding: 0 8px;
}
.wave span {
  display: inline-block;
  width: 3px;
  background: linear-gradient(to top, #18a058, #2080f0);
  border-radius: 2px;
  animation: wave 1s ease-in-out infinite;
}
@keyframes wave {
  0%, 100% { height: 8px; }
  50% { height: 40px; }
}

.result {
  margin-top: 16px;
  padding: 14px;
  background: #f9fafb;
  border-radius: 8px;
}
</style>
