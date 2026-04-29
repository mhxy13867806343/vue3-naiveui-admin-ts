<script setup lang="ts">
/**
 * NProgress - 顶部加载进度条
 */
import { ref, onUnmounted } from 'vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { NButton, NSpace, NCard, NSlider, NColorPicker, NSwitch, NAlert } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const speed = ref(500)
const minimum = ref(0.1)
const showSpinner = ref(true)
const color = ref('#3b82f6')

function applyConfig() {
  NProgress.configure({
    speed: speed.value,
    minimum: minimum.value,
    showSpinner: showSpinner.value,
    trickleSpeed: 200,
  })
  // 修改颜色
  const style = document.getElementById('nprogress-custom') || document.createElement('style')
  style.id = 'nprogress-custom'
  style.innerHTML = `#nprogress .bar { background: ${color.value} !important } #nprogress .spinner-icon { border-top-color: ${color.value} !important; border-left-color: ${color.value} !important }`
  if (!style.parentNode) document.head.appendChild(style)
}

function start() { applyConfig(); NProgress.start() }
function done() { NProgress.done() }
function inc() { applyConfig(); NProgress.inc() }
function set(v: number) { applyConfig(); NProgress.set(v) }
async function simulateLoading() {
  applyConfig()
  NProgress.start()
  for (let i = 0; i < 5; i++) {
    await new Promise((r) => setTimeout(r, 300))
    NProgress.inc()
  }
  NProgress.done()
}

onUnmounted(() => NProgress.done())

const code = `import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false, speed: 500 })

// 路由守卫使用
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})
router.afterEach(() => NProgress.done())`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">NProgress 顶部进度条</h2>
    <CodePreview title="nprogress" description="经典的顶部加载条，常用于路由切换、AJAX 请求过程提示" :code="code">
      <NAlert type="info" class="mb-4">点击按钮观察页面顶部的进度条变化。</NAlert>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <NCard size="small" title="⚙ 配置参数">
          <div class="space-y-3">
            <div>
              <div class="text-sm mb-1">速度：{{ speed }}ms</div>
              <NSlider v-model:value="speed" :min="100" :max="2000" :step="100" />
            </div>
            <div>
              <div class="text-sm mb-1">最小值：{{ minimum }}</div>
              <NSlider v-model:value="minimum" :min="0.05" :max="0.5" :step="0.05" />
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm">显示 Spinner</span>
              <NSwitch v-model:value="showSpinner" />
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm">颜色</span>
              <NColorPicker v-model:value="color" :show-alpha="false" style="width: 140px" />
            </div>
          </div>
        </NCard>
        <NCard size="small" title="🎮 控制">
          <NSpace vertical>
            <NButton type="primary" block @click="start">▶ start()</NButton>
            <NButton block @click="inc">+ inc() 增加随机进度</NButton>
            <NButton block @click="() => set(0.3)">set(0.3)</NButton>
            <NButton block @click="() => set(0.7)">set(0.7)</NButton>
            <NButton type="success" block @click="done">✔ done() 完成</NButton>
            <NButton type="info" block @click="simulateLoading">🚀 模拟加载</NButton>
          </NSpace>
        </NCard>
      </div>
    </CodePreview>
  </div>
</template>
