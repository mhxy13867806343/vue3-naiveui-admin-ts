<script setup lang="ts">
/**
 * useLoading Hook 演示页面
 */
import { ref } from 'vue'
import { NButton, NAlert, NSpin, NSpace } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'
import { useLoading } from '@/composables/useLoading'

const { loading, run } = useLoading()
const result = ref('')

function simulateRequest() {
  run(async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    result.value = '请求完成！数据加载于 ' + new Date().toLocaleTimeString()
  })
}

const code = `import { useLoading } from '@/composables/useLoading'

const { loading, run } = useLoading()
const result = ref('')

function simulateRequest() {
  run(async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    result.value = '请求完成！'
  })
}

// loading.value 会在 run 执行期间自动变为 true，结束后变为 false`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">useLoading</h2>
    <CodePreview
      title="加载状态管理"
      description="useLoading 提供 loading 响应式状态和 run 异步执行方法，自动管理加载状态"
      :code="code"
    >
      <NAlert type="info" title="说明" class="mb-4">
        点击按钮模拟一个 2 秒的异步请求，loading 状态会自动管理。
      </NAlert>

      <NSpace vertical>
        <NSpace align="center">
          <NButton type="primary" :loading="loading" @click="simulateRequest">
            {{ loading ? '加载中...' : '发起请求' }}
          </NButton>
          <NSpin v-if="loading" size="small" />
          <span v-if="loading" class="text-gray-500">请求处理中...</span>
        </NSpace>

        <NAlert v-if="result" type="success" :title="result" class="mt-2" />
      </NSpace>
    </CodePreview>
  </div>
</template>
