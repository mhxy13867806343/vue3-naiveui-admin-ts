<script setup lang="ts">
/**
 * Markdown 编辑器 (md-editor-v3)
 * 左写右预览 + 工具栏
 */
import { ref } from 'vue'
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import CodePreview from '@/components/common/CodePreview.vue'

const text = ref(`# Hello Markdown

这是一个 **Markdown 编辑器** 示例，支持：

- 列表 / 任务清单
- \`行内代码\` 和代码块
- [链接](https://github.com)
- 表格、引用、图片

## 代码块

\`\`\`ts
function hello(name: string) {
  return \`Hello, \${name}!\`
}
\`\`\`

## 表格

| 框架 | 语言 | 评分 |
| --- | --- | --- |
| Vue | TS | ⭐⭐⭐⭐⭐ |
| React | JSX | ⭐⭐⭐⭐ |

> 引用块：好用！
`)

const code = `import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

const text = ref('# Hello')

<MdEditor v-model="text" :preview="true" />`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Markdown 编辑器</h2>
    <CodePreview
      title="md-editor-v3"
      description="基于 md-editor-v3 的 Markdown 编辑器，左写右预览，支持快捷键、表格、代码高亮"
      :code="code"
    >
      <MdEditor v-model="text" style="height: 500px" />
    </CodePreview>
  </div>
</template>
