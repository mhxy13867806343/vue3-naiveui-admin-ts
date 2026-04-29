<script setup lang="ts">
/**
 * 排序可视化页面
 * 支持冒泡排序、快速排序、归并排序、插入排序
 * 使用 Canvas API 渲染柱状图，requestAnimationFrame 驱动动画
 */
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { NCard, NSpace, NButton, NSelect, NSlider } from 'naive-ui'
import { bubbleSort, quickSort, mergeSort, insertionSort } from './sortAlgorithms'
import type { SortStep, SortAlgorithm } from '@/types'

const { t } = useI18n()

// --- Constants ---
const CANVAS_HEIGHT = 400
const BAR_COLOR_DEFAULT = '#4a90d9'
const BAR_COLOR_COMPARING = '#ff9800'
const BAR_COLOR_SWAPPING = '#f44336'

// --- Control panel state ---
const selectedAlgorithm = ref<SortAlgorithm>('bubble')
const arraySize = ref(50)
const speed = ref(50)

// --- Array and animation state ---
const dataArray = ref<number[]>([])
const isSorting = ref(false)
const currentComparing = ref<[number, number] | null>(null)
const currentSwapping = ref<[number, number] | null>(null)

// --- Canvas ref ---
const canvasRef = ref<HTMLCanvasElement | null>(null)

// --- Animation state ---
let animationFrameId: number | null = null
let currentGenerator: Generator<SortStep, number[]> | null = null

// --- Algorithm options ---
const algorithmOptions = computed(() => [
  { label: t('rules.bubbleSort'), value: 'bubble' },
  { label: t('rules.quickSort'), value: 'quick' },
  { label: t('rules.mergeSort'), value: 'merge' },
  { label: t('rules.insertionSort'), value: 'insertion' },
])

// --- Canvas width adapts to array size ---
const canvasWidth = computed(() => {
  // Each bar gets at least 3px wide + 1px gap, minimum 400px
  return Math.max(400, arraySize.value * 4)
})

// --- Steps per frame based on speed ---
function getStepsPerFrame(): number {
  // speed 1 → 1 step, speed 50 → 5 steps, speed 100 → 20 steps
  return Math.max(1, Math.floor(speed.value / 5))
}

// --- Generate random array ---
function generateRandomArray() {
  const size = arraySize.value
  const arr: number[] = []
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * CANVAS_HEIGHT) + 1)
  }
  dataArray.value = arr
  currentComparing.value = null
  currentSwapping.value = null
}

// --- Drawing functions ---
function getContext(): CanvasRenderingContext2D | null {
  return canvasRef.value?.getContext('2d') ?? null
}

function drawBars() {
  const ctx = getContext()
  if (!ctx || !canvasRef.value) return

  const width = canvasRef.value.width
  const height = canvasRef.value.height
  const arr = dataArray.value
  const n = arr.length
  if (n === 0) return

  ctx.clearRect(0, 0, width, height)

  const barWidth = width / n
  const maxVal = CANVAS_HEIGHT

  for (let i = 0; i < n; i++) {
    const barHeight = (arr[i] / maxVal) * height
    const x = i * barWidth
    const y = height - barHeight

    // Determine bar color
    if (
      currentSwapping.value &&
      (i === currentSwapping.value[0] || i === currentSwapping.value[1])
    ) {
      ctx.fillStyle = BAR_COLOR_SWAPPING
    } else if (
      currentComparing.value &&
      (i === currentComparing.value[0] || i === currentComparing.value[1])
    ) {
      ctx.fillStyle = BAR_COLOR_COMPARING
    } else {
      ctx.fillStyle = BAR_COLOR_DEFAULT
    }

    // Draw bar with a small gap
    const gap = Math.min(1, barWidth * 0.1)
    ctx.fillRect(x + gap / 2, y, Math.max(1, barWidth - gap), barHeight)
  }
}

// --- Animation loop ---
function animate() {
  if (!currentGenerator) return

  const stepsPerFrame = getStepsPerFrame()

  for (let i = 0; i < stepsPerFrame; i++) {
    const result = currentGenerator.next()

    if (result.done) {
      // Sorting complete — result.value is the final sorted array
      dataArray.value = result.value
      currentComparing.value = null
      currentSwapping.value = null
      isSorting.value = false
      currentGenerator = null
      animationFrameId = null
      drawBars()
      return
    }

    // Intermediate step
    const step = result.value as SortStep
    dataArray.value = step.array
    currentComparing.value = step.comparing
    currentSwapping.value = step.swapping
  }

  drawBars()
  animationFrameId = requestAnimationFrame(animate)
}

function stopAnimation() {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
  currentGenerator = null
  isSorting.value = false
}

// --- Actions ---
function handleStartSort() {
  stopAnimation()
  currentComparing.value = null
  currentSwapping.value = null

  const arr = [...dataArray.value]

  switch (selectedAlgorithm.value) {
    case 'bubble':
      currentGenerator = bubbleSort(arr)
      break
    case 'quick':
      currentGenerator = quickSort(arr)
      break
    case 'merge':
      currentGenerator = mergeSort(arr)
      break
    case 'insertion':
      currentGenerator = insertionSort(arr)
      break
  }

  isSorting.value = true
  animationFrameId = requestAnimationFrame(animate)
}

function handleRandomize() {
  stopAnimation()
  generateRandomArray()
  nextTick(() => drawBars())
}

function handleReset() {
  stopAnimation()
  currentComparing.value = null
  currentSwapping.value = null
  generateRandomArray()
  nextTick(() => drawBars())
}

// --- Watch array size changes to regenerate ---
watch(arraySize, () => {
  if (!isSorting.value) {
    generateRandomArray()
    nextTick(() => drawBars())
  }
})

// --- Lifecycle ---
onMounted(() => {
  generateRandomArray()
  nextTick(() => drawBars())
})

onUnmounted(() => {
  stopAnimation()
})
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">
      {{ t('rules.sorting') }}
    </h2>

    <NCard>
      <NSpace
        vertical
        :size="16"
      >
        <!-- Control Panel -->
        <NSpace
          wrap
          :size="16"
          align="center"
        >
          <!-- Algorithm Selection -->
          <NSpace
            align="center"
            :size="8"
          >
            <span>{{ t('rules.algorithm') }}:</span>
            <NSelect
              v-model:value="selectedAlgorithm"
              :options="algorithmOptions"
              :disabled="isSorting"
              style="width: 200px"
            />
          </NSpace>

          <!-- Array Size -->
          <NSpace
            align="center"
            :size="8"
          >
            <span>{{ t('rules.arraySize') }}:</span>
            <NSlider
              v-model:value="arraySize"
              :min="10"
              :max="200"
              :step="1"
              :disabled="isSorting"
              style="width: 160px"
            />
          </NSpace>

          <!-- Speed Control -->
          <NSpace
            align="center"
            :size="8"
          >
            <span>{{ t('rules.speed') }}:</span>
            <NSlider
              v-model:value="speed"
              :min="1"
              :max="100"
              :step="1"
              style="width: 160px"
            />
          </NSpace>
        </NSpace>

        <!-- Action Buttons -->
        <NSpace :size="12">
          <NButton
            type="primary"
            :disabled="isSorting || dataArray.length === 0"
            @click="handleStartSort"
          >
            {{ t('rules.startSort') }}
          </NButton>
          <NButton
            type="info"
            :disabled="isSorting"
            @click="handleRandomize"
          >
            {{ t('rules.randomize') }}
          </NButton>
          <NButton
            :disabled="isSorting"
            @click="handleReset"
          >
            {{ t('rules.reset') }}
          </NButton>
        </NSpace>

        <!-- Canvas -->
        <div style="overflow: auto; border: 1px solid #e0e0e0; border-radius: 4px; display: inline-block">
          <canvas
            ref="canvasRef"
            :width="canvasWidth"
            :height="CANVAS_HEIGHT"
            style="display: block"
          />
        </div>
      </NSpace>
    </NCard>
  </div>
</template>
