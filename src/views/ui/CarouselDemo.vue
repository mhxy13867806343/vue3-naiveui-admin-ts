<script setup lang="ts">
import { NCarousel } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const colors = ['#18a058', '#2080f0', '#f0a020', '#d03050']

const basicCode = `<NCarousel>
  <div v-for="i in 4" :key="i" style="height: 200px; background: #18a058; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 24px">
    Slide {{ i }}
  </div>
</NCarousel>`

const autoplayCode = `<NCarousel autoplay :interval="3000" dot-type="line">`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Carousel 走马灯</h2>

    <CodePreview title="基础用法" description="基础的走马灯组件" :code="basicCode">
      <NCarousel style="height: 200px; border-radius: 8px; overflow: hidden">
        <div v-for="(color, i) in colors" :key="i" :style="{ height: '200px', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '24px' }">
          Slide {{ i + 1 }}
        </div>
      </NCarousel>
    </CodePreview>

    <CodePreview title="自动播放" description="设置 autoplay 属性启用自动播放" :code="autoplayCode">
      <NCarousel autoplay :interval="3000" dot-type="line" style="height: 200px; border-radius: 8px; overflow: hidden">
        <div v-for="(color, i) in colors" :key="i" :style="{ height: '200px', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '24px' }">
          Auto Slide {{ i + 1 }}
        </div>
      </NCarousel>
    </CodePreview>
  </div>
</template>
