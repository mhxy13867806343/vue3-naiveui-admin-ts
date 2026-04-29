<script setup lang="ts">
import { ref } from 'vue'
import { NSpin, NSpace, NSwitch, NCard } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const spinning = ref(true)

const basicCode = `<NSpin size="small" />
<NSpin size="medium" />
<NSpin size="large" />`

const wrapCode = `<NSpin :show="spinning">
  <NCard>内容区域</NCard>
</NSpin>`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Spin 加载</h2>

    <CodePreview title="基础用法" description="三种尺寸的加载指示器" :code="basicCode">
      <NSpace align="center" :size="24">
        <NSpin size="small" />
        <NSpin size="medium" />
        <NSpin size="large" />
      </NSpace>
    </CodePreview>

    <CodePreview title="包裹内容" description="包裹内容区域，显示加载遮罩" :code="wrapCode">
      <NSpace vertical :size="12">
        <NSwitch v-model:value="spinning">
          <template #checked>加载中</template>
          <template #unchecked>已完成</template>
        </NSwitch>
        <NSpin :show="spinning">
          <NCard title="数据面板" size="small">
            <p>这里是内容区域。当 spinning 为 true 时，会显示加载遮罩。</p>
            <p style="margin-top: 8px">切换上方开关查看效果。</p>
          </NCard>
        </NSpin>
      </NSpace>
    </CodePreview>

    <CodePreview title="自定义描述" description="通过 description 插槽自定义加载文字" :code="`<NSpin>\n  <template #description>加载中...</template>\n</NSpin>`">
      <NSpin :show="true" style="height: 100px; display: flex; align-items: center; justify-content: center">
        <template #description>数据加载中，请稍候...</template>
        <div style="height: 100px" />
      </NSpin>
    </CodePreview>
  </div>
</template>
