<script setup lang="ts">
/**
 * CodePreview - 代码预览组件
 * 展示效果 + 点击切换查看源代码
 */
import { ref } from 'vue'
import { NCard, NButton, NIcon, NCollapse, NCollapseItem } from 'naive-ui'

defineProps<{
  title?: string
  description?: string
  code: string
  language?: string
}>()

const showCode = ref(false)
const copied = ref(false)

function toggleCode() {
  showCode.value = !showCode.value
}

async function copyCode(code: string) {
  try {
    await navigator.clipboard.writeText(code)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch {
    // fallback
    const textarea = document.createElement('textarea')
    textarea.value = code
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  }
}
</script>

<template>
  <NCard :bordered="true" class="code-preview-card">
    <!-- 标题和描述 -->
    <template v-if="title" #header>
      <span class="preview-title">{{ title }}</span>
    </template>
    <template #header-extra>
      <div class="preview-actions">
        <NButton
          quaternary
          size="small"
          :type="copied ? 'success' : 'default'"
          @click="copyCode(code)"
        >
          {{ copied ? '✅ 已复制' : '📋 复制代码' }}
        </NButton>
        <NButton
          quaternary
          size="small"
          :type="showCode ? 'primary' : 'default'"
          @click="toggleCode"
        >
          {{ showCode ? '🔼 收起代码' : '🔽 查看代码' }}
        </NButton>
      </div>
    </template>

    <!-- 描述 -->
    <p v-if="description" class="preview-desc">{{ description }}</p>

    <!-- 效果展示区 -->
    <div class="preview-demo">
      <slot />
    </div>

    <!-- 代码展示区 -->
    <div v-show="showCode" class="preview-code">
      <pre><code>{{ code }}</code></pre>
    </div>
  </NCard>
</template>

<style scoped>
.code-preview-card {
  margin-bottom: 16px;
}
.preview-title {
  font-size: 15px;
  font-weight: 600;
}
.preview-actions {
  display: flex;
  gap: 4px;
}
.preview-desc {
  color: #666;
  font-size: 13px;
  margin-bottom: 16px;
}
.preview-demo {
  padding: 16px 0;
  border-bottom: 1px dashed #e8e8e8;
}
.preview-code {
  margin-top: 12px;
  background: #1e1e2e;
  border-radius: 8px;
  padding: 16px;
  overflow-x: auto;
  max-height: 500px;
  overflow-y: auto;
}
.preview-code pre {
  margin: 0;
}
.preview-code code {
  color: #cdd6f4;
  font-family: 'SF Mono', 'Fira Code', Consolas, monospace;
  font-size: 13px;
  line-height: 1.6;
  white-space: pre;
}
</style>
