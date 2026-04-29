<script setup lang="ts">
import { ref } from 'vue'
import { NColorPicker, NSpace } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const color = ref('#18a058')

const basicCode = `const color = ref('#18a058')

<NColorPicker v-model:value="color" />`

const modesCode = `<NColorPicker :modes="['hex', 'rgb', 'hsl']" />`

const swatchesCode = `<NColorPicker :swatches="['#ff0000', '#00ff00', '#0000ff']" />`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">ColorPicker 颜色选择</h2>

    <CodePreview title="基础用法" description="基础的颜色选择器" :code="basicCode">
      <NSpace align="center">
        <NColorPicker v-model:value="color" style="width: 250px" />
        <div :style="{ width: '40px', height: '40px', borderRadius: '4px', background: color }" />
        <span>{{ color }}</span>
      </NSpace>
    </CodePreview>

    <CodePreview title="颜色模式" description="支持 hex、rgb、hsl 等颜色模式" :code="modesCode">
      <NSpace vertical :size="12">
        <NColorPicker :modes="['hex', 'rgb', 'hsl']" default-value="#2080f0" style="width: 250px" />
      </NSpace>
    </CodePreview>

    <CodePreview title="预设颜色" description="通过 swatches 属性设置预设颜色" :code="swatchesCode">
      <NColorPicker
        :swatches="['#18a058', '#2080f0', '#f0a020', '#d03050', '#8a2be2', '#ff6347', '#20b2aa', '#ff69b4']"
        default-value="#18a058"
        style="width: 250px"
      />
    </CodePreview>
  </div>
</template>
