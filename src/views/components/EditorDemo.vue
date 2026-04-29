<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import '@wangeditor/editor/dist/css/style.css'
import { createEditor, createToolbar, type IDomEditor } from '@wangeditor/editor'
import CodePreview from '@/components/common/CodePreview.vue'

const editorContainer = ref<HTMLElement>()
const toolbarContainer = ref<HTMLElement>()
const valueHtml = ref('<p>Hello World! 这是一个 <strong>富文本编辑器</strong> 示例。</p><p>支持<em>斜体</em>、<u>下划线</u>、<span style="color: rgb(255, 0, 0);">彩色文字</span>等格式。</p>')

let editor: IDomEditor | null = null

onMounted(() => {
  if (!editorContainer.value || !toolbarContainer.value) return

  editor = createEditor({
    selector: editorContainer.value,
    html: valueHtml.value,
    config: {
      placeholder: '请输入内容...',
      onChange(ed: IDomEditor) {
        valueHtml.value = ed.getHtml()
      },
    },
  })

  createToolbar({
    editor,
    selector: toolbarContainer.value,
    config: {},
  })
})

onBeforeUnmount(() => {
  if (editor) {
    editor.destroy()
    editor = null
  }
})

const code = `import { ref, onMounted, onBeforeUnmount } from 'vue'
import '@wangeditor/editor/dist/css/style.css'
import { createEditor, createToolbar, type IDomEditor } from '@wangeditor/editor'

const editorContainer = ref<HTMLElement>()
const toolbarContainer = ref<HTMLElement>()
const valueHtml = ref('<p>Hello World!</p>')

let editor: IDomEditor | null = null

onMounted(() => {
  if (!editorContainer.value || !toolbarContainer.value) return

  editor = createEditor({
    selector: editorContainer.value,
    html: valueHtml.value,
    config: {
      placeholder: '请输入内容...',
      onChange(ed: IDomEditor) {
        valueHtml.value = ed.getHtml()
      },
    },
  })

  createToolbar({
    editor,
    selector: toolbarContainer.value,
    config: {},
  })
})

onBeforeUnmount(() => {
  if (editor) {
    editor.destroy()
    editor = null
  }
})

// Template:
// <div style="border: 1px solid #ccc">
//   <div ref="toolbarContainer" style="border-bottom: 1px solid #ccc"></div>
//   <div ref="editorContainer" style="height: 400px; overflow-y: hidden"></div>
// </div>`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">富文本编辑器</h2>
    <CodePreview title="wangEditor 富文本编辑器" description="基于 wangEditor 的富文本编辑器，支持丰富的文本格式化功能" :code="code">
      <div class="overflow-hidden rounded" style="border: 1px solid #ccc">
        <div ref="toolbarContainer" style="border-bottom: 1px solid #ccc"></div>
        <div ref="editorContainer" style="height: 400px; overflow-y: hidden"></div>
      </div>
      <div class="mt-4 bg-gray-50 p-3 rounded text-sm break-all" style="max-height: 200px; overflow-y: auto">
        <strong>HTML 输出：</strong>{{ valueHtml }}
      </div>
    </CodePreview>
  </div>
</template>
