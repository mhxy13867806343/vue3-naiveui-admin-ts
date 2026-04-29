<script setup lang="ts">
/**
 * 代码编辑器 (CodeMirror 6)
 * 多语言切换 + 主题
 */
import { ref, shallowRef } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { html } from '@codemirror/lang-html'
import { json } from '@codemirror/lang-json'
import { oneDark } from '@codemirror/theme-one-dark'
import { NRadioGroup, NRadioButton, NSpace } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const language = ref<'js' | 'html' | 'json'>('js')
const samples: Record<string, string> = {
  js: `// JavaScript 示例
function fib(n) {
  if (n < 2) return n
  return fib(n - 1) + fib(n - 2)
}

const result = Array.from({ length: 10 }, (_, i) => fib(i))
console.log(result)`,
  html: `<!DOCTYPE html>
<html>
<head><title>Demo</title></head>
<body>
  <h1>Hello</h1>
  <p class="text">这是一个段落</p>
</body>
</html>`,
  json: `{
  "name": "vue3-naiveui-admin",
  "version": "0.1.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  }
}`,
}

const codeText = ref(samples.js)
const extensions = shallowRef([javascript(), oneDark])

function onLanguageChange(lang: string) {
  language.value = lang as 'js' | 'html' | 'json'
  codeText.value = samples[lang]
  extensions.value = [
    lang === 'js' ? javascript() : lang === 'html' ? html() : json(),
    oneDark,
  ]
}

const code = `import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'

<Codemirror
  v-model="codeText"
  :extensions="[javascript(), oneDark]"
  :style="{ height: '400px' }"
/>`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">代码编辑器</h2>
    <CodePreview
      title="CodeMirror 6"
      description="轻量级代码编辑器，支持多语言高亮、主题切换、自动缩进"
      :code="code"
    >
      <NSpace class="mb-3">
        <NRadioGroup :value="language" @update:value="onLanguageChange">
          <NRadioButton value="js">JavaScript</NRadioButton>
          <NRadioButton value="html">HTML</NRadioButton>
          <NRadioButton value="json">JSON</NRadioButton>
        </NRadioGroup>
      </NSpace>
      <Codemirror
        v-model="codeText"
        :extensions="extensions"
        :style="{ height: '400px', fontSize: '13px' }"
        :indent-with-tab="true"
        :tab-size="2"
      />
    </CodePreview>
  </div>
</template>
