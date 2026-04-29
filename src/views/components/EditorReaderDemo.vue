<script setup lang="ts">
/**
 * 文档阅读器 (带 TOC 大纲 + 锚点跳转)
 * 渲染只读富文本/Markdown，自动抽取标题生成目录
 */
import { ref, computed } from 'vue'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import { NCard, NAnchor, NAnchorLink } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string))
}

const md: MarkdownIt = new MarkdownIt({
  highlight(str: string, lang: string) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code>${hljs.highlight(str, { language: lang, ignoreIllegals: true }).value}</code></pre>`
      } catch { /* ignore */ }
    }
    return `<pre class="hljs"><code>${escapeHtml(str)}</code></pre>`
  },
})

const source = ref(`# Vue 3 入门指南

Vue 是一套用于构建用户界面的渐进式框架。

## 安装

通过 npm 安装：

\`\`\`bash
npm install vue
\`\`\`

## 核心概念

### 响应式

\`\`\`ts
import { ref } from 'vue'
const count = ref(0)
\`\`\`

### 组件化

组件是 Vue 应用的基础构建块。

### 单文件组件

SFC (\`.vue\`) 把模板、脚本、样式封装到一个文件中。

## 进阶特性

### Composition API

更灵活的逻辑组织方式。

### 内置指令

如 \`v-if\`、\`v-for\`、\`v-model\` 等。

## 总结

Vue 3 提供了现代化的开发体验，推荐用于新项目。`)

interface Heading { id: string; text: string; level: number }

const parsed = computed(() => {
  const tokens = md.parse(source.value, {})
  const list: Heading[] = []
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i]
    if (t.type === 'heading_open') {
      const inline = tokens[i + 1]
      const text = inline?.content || ''
      const id = 'h-' + text.replace(/\s+/g, '-').toLowerCase().replace(/[^\w-]/g, '')
      t.attrSet('id', id)
      list.push({ id, text, level: Number(t.tag.replace('h', '')) })
    }
  }
  return { html: md.renderer.render(tokens, md.options, {}), headings: list }
})
const renderedHtml = computed(() => parsed.value.html)
const headings = computed(() => parsed.value.headings)

const code = `import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

const md = new MarkdownIt({ highlight: ... })
const tokens = md.parse(source.value)
// 遍历 tokens 给每个 heading 加 id，并抽取大纲生成 TOC

<div v-html="renderedHtml" />
<NAnchor>
  <NAnchorLink v-for="h in headings" :href="'#' + h.id" :title="h.text" />
</NAnchor>`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">文档阅读器（带 TOC）</h2>
    <CodePreview
      title="Markdown 渲染 + 大纲锚点"
      description="markdown-it 渲染 + highlight.js 高亮 + 自动生成 TOC 目录跳转"
      :code="code"
    >
      <div class="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-4">
        <NCard>
          <article class="markdown-body" v-html="renderedHtml" />
        </NCard>
        <NCard size="small" title="📑 目录" class="self-start sticky top-4">
          <NAnchor :show-rail="true" :bound="50">
            <NAnchorLink
              v-for="h in headings"
              :key="h.id"
              :href="'#' + h.id"
              :title="h.text"
            />
          </NAnchor>
        </NCard>
      </div>
    </CodePreview>
  </div>
</template>

<style scoped>
.markdown-body :deep(h1) { font-size: 1.8rem; font-weight: 700; margin: 1rem 0; padding-bottom: 0.5rem; border-bottom: 1px solid #eee; }
.markdown-body :deep(h2) { font-size: 1.4rem; font-weight: 600; margin: 1rem 0 0.5rem; padding-bottom: 0.4rem; border-bottom: 1px solid #f0f0f0; }
.markdown-body :deep(h3) { font-size: 1.15rem; font-weight: 600; margin: 0.8rem 0 0.4rem; }
.markdown-body :deep(p) { line-height: 1.7; margin: 0.5rem 0; }
.markdown-body :deep(code) { background: #f3f4f6; padding: 2px 6px; border-radius: 4px; font-size: 0.9em; }
.markdown-body :deep(pre.hljs) { background: #f6f8fa; padding: 12px; border-radius: 6px; overflow-x: auto; }
.markdown-body :deep(pre.hljs code) { background: transparent; padding: 0; }
</style>
