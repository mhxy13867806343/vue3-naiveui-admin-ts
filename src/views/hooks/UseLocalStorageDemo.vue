<script setup lang="ts">
/**
 * useLocalStorage Hook 演示页面
 */
import { NButton, NAlert, NSpace, NInput, NTag } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'
import { useLocalStorage } from '@/composables/useLocalStorage'

const { data: username, remove: removeUsername } = useLocalStorage('demo-username', '')
const { data: settings, remove: removeSettings } = useLocalStorage('demo-settings', {
  theme: 'light',
  fontSize: 14,
})

const code = `import { useLocalStorage } from '@/composables/useLocalStorage'

// 简单值
const { data: username, remove: removeUsername } = useLocalStorage('demo-username', '')

// 对象值（深度监听）
const { data: settings, remove: removeSettings } = useLocalStorage('demo-settings', {
  theme: 'light',
  fontSize: 14,
})

// data 是响应式 ref，修改后自动同步到 localStorage
// remove() 清除 localStorage 并重置为默认值`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">useLocalStorage</h2>
    <CodePreview
      title="响应式 localStorage"
      description="useLocalStorage 将 localStorage 与 Vue 响应式状态绑定，修改自动同步"
      :code="code"
    >
      <NAlert type="info" title="说明" class="mb-4">
        修改输入框内容后刷新页面，数据会从 localStorage 恢复。点击"清除"移除存储。
      </NAlert>

      <NSpace vertical :size="16">
        <div>
          <h3 class="text-base font-medium mb-2">字符串存储</h3>
          <NSpace align="center">
            <NInput v-model:value="username" placeholder="输入用户名" style="width: 240px" />
            <NButton @click="removeUsername">清除</NButton>
            <NTag type="info">localStorage: {{ username || '(空)' }}</NTag>
          </NSpace>
        </div>

        <div>
          <h3 class="text-base font-medium mb-2">对象存储</h3>
          <NSpace align="center" :wrap="true">
            <NInput v-model:value="settings.theme" placeholder="主题" style="width: 120px" />
            <NInput
              :value="String(settings.fontSize)"
              placeholder="字号"
              style="width: 100px"
              @update:value="(v: string) => settings.fontSize = Number(v) || 14"
            />
            <NButton @click="removeSettings">清除</NButton>
          </NSpace>
          <NSpace class="mt-2">
            <NTag type="success">theme: {{ settings.theme }}</NTag>
            <NTag type="warning">fontSize: {{ settings.fontSize }}</NTag>
          </NSpace>
        </div>
      </NSpace>
    </CodePreview>
  </div>
</template>
