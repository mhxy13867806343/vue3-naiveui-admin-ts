<script setup lang="ts">
/**
 * 轻量富文本 (基于 contenteditable)
 * 自定义工具栏 + execCommand 实现简洁富文本
 */
import { ref, onMounted } from 'vue'
import { NButton, NSpace, NColorPicker } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const editor = ref<HTMLElement>()
const html = ref('')
const color = ref('#ef4444')

function exec(cmd: string, value?: string) {
  document.execCommand(cmd, false, value)
  if (editor.value) html.value = editor.value.innerHTML
}

function onInput() {
  if (editor.value) html.value = editor.value.innerHTML
}

function applyColor(c: string) {
  color.value = c
  exec('foreColor', c)
}

onMounted(() => {
  if (editor.value) {
    editor.value.innerHTML = '<p>这是一个 <b>轻量富文本</b> 编辑器，基于原生 <code>contenteditable</code> 实现。</p><p>选中文字后点击工具栏按钮即可应用样式。</p>'
    html.value = editor.value.innerHTML
  }
})

const code = `<div
  ref="editor"
  contenteditable="true"
  class="editor"
  @input="onInput"
></div>

function exec(cmd: string, value?: string) {
  document.execCommand(cmd, false, value)
}

// 调用：exec('bold') / exec('italic') / exec('foreColor', '#ef4444')`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">轻量富文本</h2>
    <CodePreview
      title="contenteditable 简易富文本"
      description="基于原生 contenteditable + execCommand，零依赖实现工具栏式富文本编辑"
      :code="code"
    >
      <NSpace class="mb-3">
        <NButton size="small" @click="exec('bold')"><b>B</b></NButton>
        <NButton size="small" @click="exec('italic')"><i>I</i></NButton>
        <NButton size="small" @click="exec('underline')"><u>U</u></NButton>
        <NButton size="small" @click="exec('strikeThrough')"><s>S</s></NButton>
        <NButton size="small" @click="exec('formatBlock', 'h2')">H2</NButton>
        <NButton size="small" @click="exec('formatBlock', 'h3')">H3</NButton>
        <NButton size="small" @click="exec('insertUnorderedList')">• 列表</NButton>
        <NButton size="small" @click="exec('insertOrderedList')">1. 编号</NButton>
        <NButton size="small" @click="exec('justifyLeft')">左</NButton>
        <NButton size="small" @click="exec('justifyCenter')">中</NButton>
        <NButton size="small" @click="exec('justifyRight')">右</NButton>
        <NColorPicker
          :value="color"
          size="small"
          :show-alpha="false"
          style="width: 100px"
          @update:value="applyColor"
        />
        <NButton size="small" type="warning" @click="exec('removeFormat')">清除格式</NButton>
      </NSpace>
      <div
        ref="editor"
        contenteditable="true"
        class="rich-editor border border-gray-300 rounded-lg p-4 min-h-[240px] focus:outline-none focus:ring-2 focus:ring-blue-300"
        @input="onInput"
      />
      <div class="mt-3 p-3 bg-gray-50 rounded text-xs break-all max-h-[120px] overflow-auto">
        <strong>HTML：</strong>{{ html }}
      </div>
    </CodePreview>
  </div>
</template>

<style scoped>
.rich-editor :deep(h2) { font-size: 1.5rem; font-weight: 600; margin: 8px 0; }
.rich-editor :deep(h3) { font-size: 1.2rem; font-weight: 600; margin: 6px 0; }
.rich-editor :deep(ul) { list-style: disc; padding-left: 1.5rem; }
.rich-editor :deep(ol) { list-style: decimal; padding-left: 1.5rem; }
</style>
