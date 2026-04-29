<script setup lang="ts">
/**
 * useWindowSize Hook 演示页面
 */
import { computed } from 'vue'
import { NAlert, NSpace, NTag, NProgress } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'
import { useWindowSize } from '@/composables/useWindowSize'

const { width, height } = useWindowSize()

const breakpoint = computed(() => {
  if (width.value < 640) return { label: 'xs (<640px)', type: 'error' as const }
  if (width.value < 768) return { label: 'sm (640-767px)', type: 'warning' as const }
  if (width.value < 1024) return { label: 'md (768-1023px)', type: 'info' as const }
  if (width.value < 1280) return { label: 'lg (1024-1279px)', type: 'success' as const }
  return { label: 'xl (≥1280px)', type: 'success' as const }
})

const aspectRatio = computed(() => (width.value / height.value).toFixed(2))

const code = `import { useWindowSize } from '@/composables/useWindowSize'

const { width, height } = useWindowSize()

// width.value - 窗口宽度（实时响应）
// height.value - 窗口高度（实时响应）

// 自动监听 resize 事件，组件卸载时自动清理`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">useWindowSize</h2>
    <CodePreview
      title="响应式窗口尺寸"
      description="useWindowSize 实时获取窗口宽高，自动监听 resize 事件"
      :code="code"
    >
      <NAlert type="info" title="说明" class="mb-4">
        调整浏览器窗口大小，观察数值实时变化。
      </NAlert>

      <NSpace vertical :size="16">
        <NSpace align="center" :size="16">
          <NTag type="info" size="large">宽度: {{ width }}px</NTag>
          <NTag type="success" size="large">高度: {{ height }}px</NTag>
          <NTag type="warning" size="large">宽高比: {{ aspectRatio }}</NTag>
        </NSpace>

        <NSpace align="center">
          <span class="text-sm">当前断点：</span>
          <NTag :type="breakpoint.type" size="large">
            {{ breakpoint.label }}
          </NTag>
        </NSpace>

        <div>
          <div class="text-sm mb-1">宽度占比 (相对 1920px)：</div>
          <NProgress
            type="line"
            :percentage="Math.min(100, Math.round(width / 1920 * 100))"
            :indicator-placement="'inside'"
          />
        </div>
      </NSpace>
    </CodePreview>
  </div>
</template>
