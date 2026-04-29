<script setup lang="ts">
/**
 * 迷宫生成与求解可视化页面
 * 支持递归回溯法和 Prim 算法生成迷宫，BFS/DFS 求解迷宫
 * 使用 Canvas API 渲染，requestAnimationFrame 驱动动画
 */
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  NCard,
  NSpace,
  NButton,
  NSelect,
  NSlider,
  NInputNumber,
} from 'naive-ui'
import { generateMazeRecursiveBacktrack, generateMazePrim } from './mazeAlgorithms'
import { solveBFS, solveDFS } from './mazeSolvers'
import type { MazeGrid, MazeStep, MazeAlgorithm, SolveAlgorithm, CellType } from '@/types'

const { t } = useI18n()

// --- Constants ---
const CELL_SIZE = 12
const COLORS: Record<CellType, string> = {
  wall: '#1a1a2e',
  passage: '#e0e0e0',
  start: '#4caf50',
  end: '#f44336',
  path: '#2196f3',
  visited: '#bbdefb',
}

// --- Control panel state ---
const selectedAlgorithm = ref<MazeAlgorithm>('recursive-backtrack')
const selectedSolver = ref<SolveAlgorithm>('bfs')
const rows = ref(21)
const cols = ref(21)
const speed = ref(50)

// --- Maze state ---
const maze = ref<MazeGrid | null>(null)
const isGenerating = ref(false)
const isSolving = ref(false)
const mazeGenerated = ref(false)

// --- Canvas ref ---
const canvasRef = ref<HTMLCanvasElement | null>(null)

// --- Animation state ---
let animationFrameId: number | null = null
let currentGenerator: Generator<MazeStep, MazeGrid | MazeStep[]> | null = null

// --- Algorithm options ---
const algorithmOptions = computed(() => [
  { label: t('rules.recursiveBacktrack'), value: 'recursive-backtrack' },
  { label: t('rules.prim'), value: 'prim' },
])

const solverOptions = computed(() => [
  { label: t('rules.bfs'), value: 'bfs' },
  { label: t('rules.dfs'), value: 'dfs' },
])

// --- Ensure odd numbers for rows/cols ---
function ensureOdd(n: number): number {
  return n % 2 === 0 ? n + 1 : n
}

// --- Slider marks for odd numbers ---
const rowColMarks: Record<number, string> = { 5: '5', 11: '11', 21: '21', 31: '31', 41: '41', 51: '51' }

// --- Canvas dimensions ---
const canvasWidth = computed(() => ensureOdd(cols.value) * CELL_SIZE)
const canvasHeight = computed(() => ensureOdd(rows.value) * CELL_SIZE)

// --- Steps per frame based on speed ---
function getStepsPerFrame(): number {
  // speed 1 → 1 step, speed 50 → 5 steps, speed 100 → 15 steps
  return Math.max(1, Math.floor(speed.value / 7))
}

// --- Drawing functions ---
function getContext(): CanvasRenderingContext2D | null {
  return canvasRef.value?.getContext('2d') ?? null
}

function drawCell(ctx: CanvasRenderingContext2D, row: number, col: number, type: CellType) {
  ctx.fillStyle = COLORS[type]
  ctx.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE)
}

function drawFullMaze(ctx: CanvasRenderingContext2D, grid: MazeGrid) {
  for (let r = 0; r < grid.rows; r++) {
    for (let c = 0; c < grid.cols; c++) {
      drawCell(ctx, r, c, grid.cells[r][c])
    }
  }
}

function clearCanvas() {
  const ctx = getContext()
  if (!ctx || !canvasRef.value) return
  ctx.fillStyle = COLORS.wall
  ctx.fillRect(0, 0, canvasRef.value.width, canvasRef.value.height)
}

// --- Animation loop ---
function animate() {
  if (!currentGenerator) return

  const ctx = getContext()
  if (!ctx) {
    stopAnimation()
    return
  }

  const stepsPerFrame = getStepsPerFrame()

  for (let i = 0; i < stepsPerFrame; i++) {
    const result = currentGenerator.next()

    if (result.done) {
      // Generator finished
      if (isGenerating.value) {
        // Generation complete — result.value is the final MazeGrid
        const finalMaze = result.value as MazeGrid
        maze.value = finalMaze
        mazeGenerated.value = true
        isGenerating.value = false
        // Redraw the full maze to ensure consistency
        drawFullMaze(ctx, finalMaze)
      } else if (isSolving.value) {
        // Solving complete — result.value is the path MazeStep[]
        const pathSteps = result.value as MazeStep[]
        for (const step of pathSteps) {
          drawCell(ctx, step.row, step.col, step.type)
          // Also update the maze cells for visual consistency
          if (maze.value) {
            const cellType = maze.value.cells[step.row][step.col]
            // Don't overwrite start/end markers
            if (cellType !== 'start' && cellType !== 'end') {
              maze.value.cells[step.row][step.col] = step.type
            }
          }
        }
        // Redraw start and end on top of path
        if (maze.value) {
          for (let r = 0; r < maze.value.rows; r++) {
            for (let c = 0; c < maze.value.cols; c++) {
              if (maze.value.cells[r][c] === 'start' || maze.value.cells[r][c] === 'end') {
                drawCell(ctx, r, c, maze.value.cells[r][c])
              }
            }
          }
        }
        isSolving.value = false
      }
      currentGenerator = null
      animationFrameId = null
      return
    }

    // Intermediate step — draw it
    const step = result.value as MazeStep
    drawCell(ctx, step.row, step.col, step.type)
  }

  animationFrameId = requestAnimationFrame(animate)
}

function stopAnimation() {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
  currentGenerator = null
  isGenerating.value = false
  isSolving.value = false
}

// --- Actions ---
async function handleGenerate() {
  stopAnimation()
  mazeGenerated.value = false
  maze.value = null

  // Wait for canvas to resize
  await nextTick()

  clearCanvas()

  const r = ensureOdd(rows.value)
  const c = ensureOdd(cols.value)

  if (selectedAlgorithm.value === 'recursive-backtrack') {
    currentGenerator = generateMazeRecursiveBacktrack(r, c)
  } else {
    currentGenerator = generateMazePrim(r, c)
  }

  isGenerating.value = true
  animationFrameId = requestAnimationFrame(animate)
}

/**
 * 随机生成：随机算法 + 随机奇数尺寸 + 随机速度，一键变化
 */
function randomOdd(min: number, max: number): number {
  const v = Math.floor(Math.random() * (max - min + 1)) + min
  return ensureOdd(v)
}

async function handleRandomGenerate() {
  if (isGenerating.value || isSolving.value) return
  // 随机算法
  selectedAlgorithm.value = Math.random() < 0.5 ? 'recursive-backtrack' : 'prim'
  // 随机奇数尺寸（11~41，保证可观感）
  rows.value = randomOdd(11, 41)
  cols.value = randomOdd(11, 41)
  // 随机速度（30~80）
  speed.value = Math.floor(Math.random() * 51) + 30
  await handleGenerate()
}

function handleSolve() {
  if (!maze.value || !mazeGenerated.value) return
  stopAnimation()
  isSolving.value = false

  // Redraw the maze to clear any previous solve visualization
  const ctx = getContext()
  if (!ctx) return

  // Reset visited/path cells back to passage before solving
  for (let r = 0; r < maze.value.rows; r++) {
    for (let c = 0; c < maze.value.cols; c++) {
      if (maze.value.cells[r][c] === 'visited' || maze.value.cells[r][c] === 'path') {
        maze.value.cells[r][c] = 'passage'
      }
    }
  }
  drawFullMaze(ctx, maze.value)

  if (selectedSolver.value === 'bfs') {
    currentGenerator = solveBFS(maze.value)
  } else {
    currentGenerator = solveDFS(maze.value)
  }

  isSolving.value = true
  animationFrameId = requestAnimationFrame(animate)
}

function handleReset() {
  stopAnimation()
  maze.value = null
  mazeGenerated.value = false
  clearCanvas()
}

// --- Ensure odd values when sliders change ---
function handleRowsUpdate(val: number | null) {
  if (val !== null) {
    rows.value = ensureOdd(Math.max(5, Math.min(51, val)))
  }
}

function handleColsUpdate(val: number | null) {
  if (val !== null) {
    cols.value = ensureOdd(Math.max(5, Math.min(51, val)))
  }
}

// --- Watch canvas size changes to redraw ---
watch([rows, cols], () => {
  if (!isGenerating.value && !isSolving.value) {
    nextTick(() => {
      if (maze.value) {
        const ctx = getContext()
        if (ctx) drawFullMaze(ctx, maze.value)
      } else {
        clearCanvas()
      }
    })
  }
})

// --- Lifecycle ---
onMounted(() => {
  nextTick(() => {
    clearCanvas()
    // 进入页面后自动随机生成一个迷宫，避免初始全黑
    handleRandomGenerate()
  })
})

onUnmounted(() => {
  stopAnimation()
})
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">{{ t('rules.maze') }}</h2>

    <NCard>
      <NSpace vertical :size="16">
        <!-- Control Panel -->
        <NSpace wrap :size="16" align="center">
          <!-- Generation Algorithm -->
          <NSpace align="center" :size="8">
            <span>{{ t('rules.algorithm') }}:</span>
            <NSelect
              v-model:value="selectedAlgorithm"
              :options="algorithmOptions"
              :disabled="isGenerating || isSolving"
              style="width: 200px"
            />
          </NSpace>

          <!-- Solve Algorithm -->
          <NSpace align="center" :size="8">
            <span>{{ t('rules.dfs') }}/{{ t('rules.bfs') }}:</span>
            <NSelect
              v-model:value="selectedSolver"
              :options="solverOptions"
              :disabled="isGenerating || isSolving"
              style="width: 160px"
            />
          </NSpace>
        </NSpace>

        <!-- Size and Speed Controls -->
        <NSpace wrap :size="16" align="center">
          <!-- Rows -->
          <NSpace align="center" :size="8">
            <span>{{ t('rules.rows') }}:</span>
            <NSlider
              :value="rows"
              :min="5"
              :max="51"
              :step="2"
              :marks="rowColMarks"
              :disabled="isGenerating || isSolving"
              style="width: 160px"
              @update:value="handleRowsUpdate"
            />
            <NInputNumber
              :value="rows"
              :min="5"
              :max="51"
              :step="2"
              :disabled="isGenerating || isSolving"
              size="small"
              style="width: 80px"
              @update:value="handleRowsUpdate"
            />
          </NSpace>

          <!-- Cols -->
          <NSpace align="center" :size="8">
            <span>{{ t('rules.cols') }}:</span>
            <NSlider
              :value="cols"
              :min="5"
              :max="51"
              :step="2"
              :marks="rowColMarks"
              :disabled="isGenerating || isSolving"
              style="width: 160px"
              @update:value="handleColsUpdate"
            />
            <NInputNumber
              :value="cols"
              :min="5"
              :max="51"
              :step="2"
              :disabled="isGenerating || isSolving"
              size="small"
              style="width: 80px"
              @update:value="handleColsUpdate"
            />
          </NSpace>

          <!-- Speed -->
          <NSpace align="center" :size="8">
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
            :disabled="isGenerating || isSolving"
            @click="handleGenerate"
          >
            {{ t('rules.generate') }}
          </NButton>
          <NButton
            type="warning"
            :disabled="isGenerating || isSolving"
            @click="handleRandomGenerate"
          >
            🎲 随机生成
          </NButton>
          <NButton
            type="info"
            :disabled="!mazeGenerated || isGenerating || isSolving"
            @click="handleSolve"
          >
            {{ t('rules.solve') }}
          </NButton>
          <NButton
            :disabled="isGenerating || isSolving"
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
            :height="canvasHeight"
            style="display: block"
          />
        </div>
      </NSpace>
    </NCard>
  </div>
</template>
