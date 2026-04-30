<script setup lang="ts">
/**
 * useThrottleFn Hook 演示页面
 */
import { ref } from 'vue'
import { NButton, NAlert, NSpace, NTag } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'
import { useThrottleFn } from '@/composables/useThrottleFn'

const clickCount = ref(0)
const execCount = ref(0)
const logs = ref<string[]>([])

const { throttledFn, isPending, cancel } = useThrottleFn(() => {
  execCount.value++
  logs.value.unshift(`[${new Date().toLocaleTimeString()}] 第 ${execCount.value} 次执行`)
  if (logs.value.length > 8) logs.value.pop()
}, 1000)

function handleClick() {
  clickCount.value++
  throttledFn()
}

function handleReset() {
  clickCount.value = 0
  execCount.value = 0
  logs.value = []
  cancel()
}

const code = `import { useThrottleFn } from '@/composables/useThrottleFn'

const { throttledFn, isPending, cancel } = useThrottleFn(() => {
  console.log('执行！')
}, 1000)

// throttledFn(...args) - 节流后的函数
// isPending.value - 是否有待执行的调用
// cancel() - 取消待执行的调用

// 无论调用多频繁，每 1000ms 最多执行一次`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">useThrottleFn</h2>
    <CodePreview
      title="节流函数"
      description="useThrottleFn 对函数进行节流处理，无论调用多频繁，每个时间窗口内最多执行一次"
      :code="code"
    >
      <NAlert type="info" title="说明" class="mb-4">
        快速点击按钮，函数每 1000ms 最多执行一次。对比点击次数和实际执行次数。
      </NAlert>

      <NSpace vertical :size="16">
        <NSpace align="center">
          <NButton type="primary" @click="handleClick">
            快速点击我！
          </NButton>
          <NButton @click="handleReset">重置</NButton>
          <NButton :disabled="!isPending" @click="cancel">取消待执行</NButton>
        </NSpace>

        <NSpace align="center">
          <NTag>点击次数: {{ clickCount }}</NTag>
          <NTag type="success">实际执行: {{ execCount }}</NTag>
          <NTag :type="isPending ? 'warning' : 'default'">
            isPending: {{ isPending }}
          </NTag>
        </NSpace>

        <div v-if="logs.length" class="bg-gray-100 rounded p-3">
          <div class="text-sm font-medium mb-1">执行日志：</div>
          <div v-for="(log, i) in logs" :key="i" class="text-xs text-gray-600">
            {{ log }}
          </div>
        </div>
      </NSpace>
    </CodePreview>
  </div>
</template>
