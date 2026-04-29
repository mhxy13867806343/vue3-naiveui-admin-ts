<script setup lang="ts">
/**
 * useClipboard Hook 演示页面
 */
import { ref } from 'vue'
import { NButton, NAlert, NSpace, NInput, NTag } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'
import { useClipboard } from '@/composables/useClipboard'

const { copied, text, copy } = useClipboard()
const inputText = ref('Hello, useClipboard!')

const code = `import { useClipboard } from '@/composables/useClipboard'

const { copied, text, copy } = useClipboard()

// copy(value) - 复制文本到剪贴板
// copied.value - 是否刚刚复制成功（2秒后自动重置）
// text.value - 最近一次复制的文本内容

await copy('Hello World')
console.log(copied.value) // true (2秒后变为 false)`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">useClipboard</h2>
    <CodePreview
      title="剪贴板 Hook"
      description="useClipboard 封装剪贴板操作，提供 copied 状态反馈和自动重置"
      :code="code"
    >
      <NAlert type="info" title="说明" class="mb-4">
        输入文本后点击复制，copied 状态会在 2 秒后自动重置。
      </NAlert>

      <NSpace vertical :size="16">
        <NSpace align="center">
          <NInput v-model:value="inputText" placeholder="输入要复制的文本" style="width: 300px" />
          <NButton type="primary" @click="copy(inputText)">
            {{ copied ? '✅ 已复制' : '📋 复制' }}
          </NButton>
        </NSpace>

        <NSpace align="center">
          <NTag :type="copied ? 'success' : 'default'">
            copied: {{ copied }}
          </NTag>
          <NTag type="info">
            最近复制: {{ text || '(无)' }}
          </NTag>
        </NSpace>
      </NSpace>
    </CodePreview>
  </div>
</template>
