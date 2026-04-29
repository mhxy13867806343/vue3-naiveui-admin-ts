<script setup lang="ts">
/**
 * 二维码生成 (qrcode)
 */
import { ref, watch, onMounted, useTemplateRef } from 'vue'
import QRCode from 'qrcode'
import { NInput, NSlider, NColorPicker, NSpace, NButton } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const text = ref('https://github.com/vuejs/core')
const size = ref(240)
const fg = ref('#000000')
const bg = ref('#ffffff')
const canvasRef = useTemplateRef<HTMLCanvasElement>('canvasRef')

async function render() {
  if (!canvasRef.value) return
  await QRCode.toCanvas(canvasRef.value, text.value || ' ', {
    width: size.value,
    margin: 2,
    color: { dark: fg.value, light: bg.value },
  })
}

function download() {
  if (!canvasRef.value) return
  const a = document.createElement('a')
  a.href = canvasRef.value.toDataURL('image/png')
  a.download = 'qrcode.png'
  a.click()
}

onMounted(render)
watch([text, size, fg, bg], render)

const code = `import QRCode from 'qrcode'

await QRCode.toCanvas(canvas, text, {
  width: 240,
  margin: 2,
  color: { dark: '#000', light: '#fff' }
})`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">QRCode 二维码生成</h2>
    <CodePreview title="qrcode" description="生成二维码到 Canvas，支持自定义颜色、尺寸、纠错级别" :code="code">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <div>
            <label class="text-sm text-gray-600 block mb-1">内容</label>
            <NInput v-model:value="text" type="textarea" :rows="3" placeholder="输入要生成二维码的内容" />
          </div>
          <div>
            <label class="text-sm text-gray-600 block mb-1">尺寸：{{ size }}px</label>
            <NSlider v-model:value="size" :min="120" :max="400" :step="10" />
          </div>
          <NSpace>
            <div>
              <label class="text-xs text-gray-500 block mb-1">前景</label>
              <NColorPicker v-model:value="fg" :show-alpha="false" />
            </div>
            <div>
              <label class="text-xs text-gray-500 block mb-1">背景</label>
              <NColorPicker v-model:value="bg" :show-alpha="false" />
            </div>
          </NSpace>
          <NButton type="primary" @click="download">📥 下载 PNG</NButton>
        </div>
        <div class="flex items-center justify-center bg-gray-50 rounded-lg p-4">
          <canvas ref="canvasRef" />
        </div>
      </div>
    </CodePreview>
  </div>
</template>
