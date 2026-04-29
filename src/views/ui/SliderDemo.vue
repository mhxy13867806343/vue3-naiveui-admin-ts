<script setup lang="ts">
import { ref } from 'vue'
import { NSlider, NSpace } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const value = ref(40)
const rangeValue = ref<[number, number]>([20, 60])

const basicCode = `<NSlider v-model:value="value" />`
const rangeCode = `<NSlider v-model:value="range" range />`
const marksCode = `<NSlider :marks="{ 0: '0°C', 25: '25°C', 50: '50°C', 75: '75°C', 100: '100°C' }" />`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Slider 滑块</h2>

    <CodePreview title="基础用法" description="基础的滑块组件" :code="basicCode">
      <div style="max-width: 400px">
        <NSlider v-model:value="value" />
        <p style="margin-top: 8px; color: #666">当前值: {{ value }}</p>
      </div>
    </CodePreview>

    <CodePreview title="范围选择" description="设置 range 属性启用范围选择" :code="rangeCode">
      <div style="max-width: 400px">
        <NSlider v-model:value="rangeValue" range />
        <p style="margin-top: 8px; color: #666">范围: {{ rangeValue[0] }} - {{ rangeValue[1] }}</p>
      </div>
    </CodePreview>

    <CodePreview title="标记" description="通过 marks 属性添加刻度标记" :code="marksCode">
      <div style="max-width: 400px; padding-bottom: 24px">
        <NSlider :default-value="50" :marks="{ 0: '0°C', 25: '25°C', 50: '50°C', 75: '75°C', 100: '100°C' }" :step="25" />
      </div>
    </CodePreview>
  </div>
</template>
