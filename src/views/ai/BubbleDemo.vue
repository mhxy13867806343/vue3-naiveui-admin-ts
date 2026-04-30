<script setup lang="ts">
/**
 * Bubble 消息气泡 Demo
 * 使用 markdown-it + highlight.js 渲染 AI 的 Markdown 回复（含代码高亮）
 */
import { ref, computed } from 'vue'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import { NCard, NAvatar, NSpace, NButton, NSwitch } from 'naive-ui'

const md: MarkdownIt = new MarkdownIt({
  html: false,
  linkify: true,
  breaks: true,
  highlight(str: string, lang: string): string {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code>${hljs.highlight(str, { language: lang, ignoreIllegals: true }).value}</code></pre>`
      } catch { /* noop */ }
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`
  },
})

const samples: { title: string; content: string }[] = [
  {
    title: '基础 Markdown',
    content: `**加粗** *斜体* ~~删除线~~ \`inline code\`\n\n- 列表项 1\n- 列表项 2\n- 列表项 3\n\n> 引用文本：保持优雅。\n\n[访问 Naive UI](https://www.naiveui.com)`,
  },
  {
    title: '代码高亮 (TypeScript)',
    content: '使用 TypeScript 实现一个防抖函数：\n\n```ts\nexport function debounce<T extends (...args: any[]) => void>(\n  fn: T,\n  wait = 300,\n) {\n  let timer: number | null = null\n  return (...args: Parameters<T>) => {\n    if (timer) clearTimeout(timer)\n    timer = window.setTimeout(() => fn(...args), wait)\n  }\n}\n```',
  },
  {
    title: '表格 + 公式',
    content: '| 模型 | 上下文 | 速度 |\n| --- | --- | --- |\n| GPT-4o | 128K | 快 |\n| Claude 3.5 | 200K | 中 |\n| DeepSeek | 64K | 极快 |\n\n复杂度：`O(n log n)`',
  },
]

const dark = ref(false)
const current = ref(0)
const html = computed(() => md.render(samples[current.value].content))
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Bubble 消息气泡 (Markdown)</h2>
    <NCard>
      <NSpace class="mb-4" align="center">
        <NButton
          v-for="(s, i) in samples"
          :key="i"
          size="small"
          :type="i === current ? 'primary' : 'default'"
          @click="current = i"
        >
          {{ s.title }}
        </NButton>
        <span style="margin-left: 16px">深色气泡</span>
        <NSwitch v-model:value="dark" />
      </NSpace>

      <div class="bubble-row">
        <NAvatar round size="small" color="#18a058">🤖</NAvatar>
        <div :class="['bubble', { dark }]" v-html="html" />
      </div>
    </NCard>
  </div>
</template>

<style scoped>
.bubble-row {
  display: flex;
  gap: 10px;
  align-items: flex-start;
}
.bubble {
  max-width: 80%;
  padding: 14px 18px;
  border-radius: 12px;
  background: #f0f2f5;
  color: #1f2937;
  line-height: 1.7;
}
.bubble.dark {
  background: #1f2937;
  color: #e5e7eb;
}
:deep(pre.hljs) {
  background: #282c34;
  color: #abb2bf;
  border-radius: 8px;
  padding: 12px 14px;
  overflow-x: auto;
  margin: 10px 0;
  font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
  font-size: 13px;
}
:deep(code) {
  font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
}
:deep(p code), :deep(li code) {
  background: rgba(0, 0, 0, 0.06);
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 0.9em;
}
.bubble.dark :deep(p code), .bubble.dark :deep(li code) {
  background: rgba(255, 255, 255, 0.1);
}
:deep(table) {
  border-collapse: collapse;
  margin: 10px 0;
}
:deep(th), :deep(td) {
  border: 1px solid #d0d7de;
  padding: 6px 12px;
}
:deep(blockquote) {
  border-left: 3px solid #d0d7de;
  padding-left: 12px;
  color: #6b7280;
  margin: 10px 0;
}
</style>
