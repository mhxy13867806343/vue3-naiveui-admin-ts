<script setup lang="ts">
import { ref } from 'vue'
import { NButton, NInput, NAlert, useMessage } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const message = useMessage()
const textToCopy = ref('Hello, 这是一段可以复制的文本！')
const copiedText = ref('')

async function handleCopy() {
  try {
    await navigator.clipboard.writeText(textToCopy.value)
    message.success('复制成功！')
  } catch {
    // fallback for older browsers
    const textarea = document.createElement('textarea')
    textarea.value = textToCopy.value
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
    message.success('复制成功（fallback）！')
  }
}

async function handlePaste() {
  try {
    copiedText.value = await navigator.clipboard.readText()
    message.success('粘贴成功！')
  } catch {
    message.warning('无法读取剪贴板，请手动粘贴 (Ctrl+V)')
  }
}

const code = `import { ref } from 'vue'

const textToCopy = ref('Hello, 这是一段可以复制的文本！')
const copiedText = ref('')

// 复制文本到剪贴板
async function handleCopy() {
  try {
    await navigator.clipboard.writeText(textToCopy.value)
    console.log('复制成功')
  } catch {
    // fallback for older browsers
    const textarea = document.createElement('textarea')
    textarea.value = textToCopy.value
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
  }
}

// 从剪贴板读取文本
async function handlePaste() {
  try {
    copiedText.value = await navigator.clipboard.readText()
  } catch {
    console.warn('无法读取剪贴板')
  }
}`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">剪贴板</h2>
    <CodePreview title="剪贴板操作" description="使用 navigator.clipboard API 实现复制和粘贴功能" :code="code">
      <NAlert type="info" title="说明" class="mb-4">
        使用 navigator.clipboard API 实现复制和粘贴功能。
      </NAlert>

      <div class="mb-4">
        <h3 class="text-base font-medium mb-2">复制文本</h3>
        <div class="flex gap-2">
          <NInput v-model:value="textToCopy" placeholder="输入要复制的文本" class="flex-1" />
          <NButton type="primary" @click="handleCopy">复制</NButton>
        </div>
      </div>

      <div>
        <h3 class="text-base font-medium mb-2">粘贴文本</h3>
        <div class="flex gap-2">
          <NInput :value="copiedText" placeholder="点击粘贴按钮读取剪贴板" readonly class="flex-1" />
          <NButton type="info" @click="handlePaste">粘贴</NButton>
        </div>
      </div>
    </CodePreview>
  </div>
</template>
