<script setup lang="ts">
/**
 * Typewriter 打字机动效 Demo
 * 聚焦字符级动画：光标样式、抖动、回退（删除重打）、循环、节奏
 * 与 Streaming 的区别：Streaming 强调"接收数据并展示"，Typewriter 强调"动画美感"
 */
import { ref, watch, onBeforeUnmount } from 'vue'
import {
  NCard, NButton, NSpace, NSlider, NSelect, NSwitch, NTag, NDivider,
} from 'naive-ui'

// ---------- 配置 ----------
const texts = ref<string[]>([
  'Hello, I am a Typewriter.',
  '我可以一个字一个字地打出来。',
  '支持光标样式 + 节奏 + 删除回退 + 循环。',
  'Press Start to play 🎬',
])

const speed = ref(80)
const cursorStyle = ref<'block' | 'line' | 'underline' | 'none'>('block')
const rhythm = ref<'steady' | 'human'>('human') // 人类节奏：随机抖动
const loop = ref(true)
const erase = ref(true) // 是否回退
const fontSize = ref(28)

// ---------- 状态 ----------
const display = ref('')
const cursorVisible = ref(true)
const running = ref(false)
let timer: number | null = null
let currentIdx = 0
let phase: 'typing' | 'pausing' | 'erasing' = 'typing'
let charPos = 0

function clearTimer() {
  if (timer) clearTimeout(timer)
  timer = null
}

function nextDelay() {
  if (rhythm.value === 'steady') return speed.value
  // 人类节奏：±40% 抖动，遇到标点稍长
  const last = display.value.slice(-1)
  const punct = /[.,!?;:。！？，；：]/.test(last)
  const base = punct ? speed.value * 3 : speed.value
  return base * (0.6 + Math.random() * 0.8)
}

function tick() {
  const cur = texts.value[currentIdx]
  if (!cur) return stop()

  if (phase === 'typing') {
    if (charPos < cur.length) {
      display.value = cur.slice(0, charPos + 1)
      charPos++
      timer = window.setTimeout(tick, nextDelay())
    } else {
      phase = 'pausing'
      timer = window.setTimeout(tick, 1200)
    }
  } else if (phase === 'pausing') {
    // 决定下一步
    if (erase.value && (loop.value || currentIdx < texts.value.length - 1)) {
      phase = 'erasing'
    } else if (!erase.value && currentIdx < texts.value.length - 1) {
      phase = 'typing'
      currentIdx++
      charPos = 0
      display.value += '\n'
    } else if (loop.value) {
      phase = erase.value ? 'erasing' : 'typing'
      if (!erase.value) {
        currentIdx = 0
        charPos = 0
        display.value = ''
      }
    } else {
      stop()
      return
    }
    timer = window.setTimeout(tick, 30)
  } else if (phase === 'erasing') {
    if (charPos > 0) {
      charPos--
      display.value = cur.slice(0, charPos)
      timer = window.setTimeout(tick, speed.value / 2)
    } else {
      currentIdx = (currentIdx + 1) % texts.value.length
      phase = 'typing'
      timer = window.setTimeout(tick, 200)
    }
  }
}

function start() {
  if (running.value) return
  running.value = true
  display.value = ''
  currentIdx = 0
  charPos = 0
  phase = 'typing'
  tick()
}

function stop() {
  clearTimer()
  running.value = false
}

function reset() {
  stop()
  display.value = ''
}

// 光标闪烁
let blinkTimer: number | null = null
function startBlink() {
  blinkTimer = window.setInterval(() => {
    cursorVisible.value = !cursorVisible.value
  }, 530)
}
startBlink()

watch(cursorStyle, () => {
  cursorVisible.value = true
})

onBeforeUnmount(() => {
  stop()
  if (blinkTimer) clearInterval(blinkTimer)
})

const cursorChar = () => ({
  block: '█',
  line: '▍',
  underline: '_',
  none: '',
}[cursorStyle.value])

function addPhrase() {
  texts.value.push('新加入的文本片段 #' + (texts.value.length + 1))
}
function removePhrase(i: number) {
  texts.value.splice(i, 1)
}
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Typewriter 打字机动效</h2>

    <NCard>
      <!-- 显示区 -->
      <div class="stage" :style="{ fontSize: fontSize + 'px' }">
        <span>{{ display }}</span>
        <span v-if="cursorStyle !== 'none'" :class="['cursor', cursorStyle, { hidden: !cursorVisible }]">
          {{ cursorChar() }}
        </span>
      </div>

      <NDivider />

      <!-- 控制 -->
      <NSpace align="center" :wrap="true">
        <NButton type="primary" :disabled="running" @click="start">▶ 开始</NButton>
        <NButton :disabled="!running" @click="stop">⏸ 暂停</NButton>
        <NButton quaternary @click="reset">🔄 重置</NButton>
        <NDivider vertical />
        <span>速度</span>
        <div style="width: 140px">
          <NSlider v-model:value="speed" :min="10" :max="300" :step="10" />
        </div>
        <NTag :bordered="false" type="info">{{ speed }} ms</NTag>
        <NDivider vertical />
        <span>字号</span>
        <div style="width: 100px">
          <NSlider v-model:value="fontSize" :min="14" :max="48" :step="2" />
        </div>
        <NDivider vertical />
        <span>光标</span>
        <NSelect
          v-model:value="cursorStyle"
          :options="[
            { label: '方块 █', value: 'block' },
            { label: '竖线 ▍', value: 'line' },
            { label: '下划线 _', value: 'underline' },
            { label: '无', value: 'none' },
          ]"
          style="width: 130px"
          size="small"
        />
        <span>节奏</span>
        <NSelect
          v-model:value="rhythm"
          :options="[
            { label: '稳定', value: 'steady' },
            { label: '人类节奏', value: 'human' },
          ]"
          style="width: 110px"
          size="small"
        />
        <span>循环</span>
        <NSwitch v-model:value="loop" />
        <span>回退</span>
        <NSwitch v-model:value="erase" />
      </NSpace>

      <NDivider>文本队列</NDivider>
      <NSpace>
        <NTag
          v-for="(t, i) in texts" :key="i"
          closable :bordered="false"
          @close="removePhrase(i)"
        >{{ t }}</NTag>
        <NButton size="small" dashed @click="addPhrase">+ 添加</NButton>
      </NSpace>
    </NCard>
  </div>
</template>

<style scoped>
.stage {
  min-height: 140px;
  padding: 32px 24px;
  background: linear-gradient(135deg, #1e1e2e 0%, #11111b 100%);
  color: #cdd6f4;
  border-radius: 12px;
  font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;
}
.cursor {
  display: inline-block;
  margin-left: 2px;
  color: #18a058;
  transition: opacity 0.1s;
}
.cursor.hidden { opacity: 0; }
.cursor.block { color: #cdd6f4; }
.cursor.line { color: #18a058; transform: scaleY(1.1); }
.cursor.underline {
  color: #18a058;
  margin-left: 0;
  transform: translateY(-2px);
}
</style>
