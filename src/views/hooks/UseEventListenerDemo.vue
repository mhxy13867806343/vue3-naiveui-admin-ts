<script setup lang="ts">
/**
 * useEventListener Hook 演示页面
 */
import { ref } from 'vue'
import { NAlert, NSpace, NTag } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'
import { useEventListener } from '@/composables/useEventListener'

const mouseX = ref(0)
const mouseY = ref(0)
const keyPressed = ref('')
const scrollY = ref(0)

useEventListener(window, 'mousemove', (e: Event) => {
  const me = e as MouseEvent
  mouseX.value = me.clientX
  mouseY.value = me.clientY
})

useEventListener(window, 'keydown', (e: Event) => {
  const ke = e as KeyboardEvent
  keyPressed.value = ke.key
})

useEventListener(window, 'scroll', () => {
  scrollY.value = Math.round(window.scrollY)
})

const code = `import { useEventListener } from '@/composables/useEventListener'

// 监听鼠标移动
useEventListener(window, 'mousemove', (e: Event) => {
  const me = e as MouseEvent
  mouseX.value = me.clientX
  mouseY.value = me.clientY
})

// 监听键盘按下
useEventListener(window, 'keydown', (e: Event) => {
  const ke = e as KeyboardEvent
  keyPressed.value = ke.key
})

// 监听滚动
useEventListener(window, 'scroll', () => {
  scrollY.value = Math.round(window.scrollY)
})

// 组件卸载时自动移除所有事件监听`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">useEventListener</h2>
    <CodePreview
      title="自动清理事件监听"
      description="useEventListener 在 onMounted 时绑定事件，onUnmounted 时自动移除，避免内存泄漏"
      :code="code"
    >
      <NAlert type="info" title="说明" class="mb-4">
        移动鼠标、按下键盘或滚动页面，观察事件数据实时更新。离开页面时事件监听自动清理。
      </NAlert>

      <NSpace vertical :size="16">
        <div>
          <h3 class="text-base font-medium mb-2">🖱️ 鼠标位置</h3>
          <NSpace>
            <NTag type="info">X: {{ mouseX }}</NTag>
            <NTag type="info">Y: {{ mouseY }}</NTag>
          </NSpace>
        </div>

        <div>
          <h3 class="text-base font-medium mb-2">⌨️ 最近按键</h3>
          <NTag :type="keyPressed ? 'success' : 'default'" size="large">
            {{ keyPressed || '按下任意键...' }}
          </NTag>
        </div>

        <div>
          <h3 class="text-base font-medium mb-2">📜 滚动位置</h3>
          <NTag type="warning">scrollY: {{ scrollY }}px</NTag>
        </div>
      </NSpace>
    </CodePreview>
  </div>
</template>
