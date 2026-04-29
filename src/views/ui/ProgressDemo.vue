<script setup lang="ts">
import { ref } from 'vue'
import { NProgress, NSpace, NButton, NGrid, NGridItem } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const percentage = ref(50)

const lineCode = `<NProgress type="line" :percentage="50" />`
const circleCode = `<NProgress type="circle" :percentage="75" />`
const customCode = `<NProgress type="line" :percentage="80" status="success" indicator-placement="inside" />`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Progress 进度条</h2>

    <CodePreview title="线形进度条" description="基础的线形进度条" :code="lineCode">
      <NSpace vertical :size="16" style="max-width: 400px">
        <NProgress type="line" :percentage="30" />
        <NProgress type="line" :percentage="50" status="info" />
        <NProgress type="line" :percentage="70" status="success" />
        <NProgress type="line" :percentage="90" status="warning" />
        <NProgress type="line" :percentage="100" status="error" />
      </NSpace>
    </CodePreview>

    <CodePreview title="环形进度条" description="环形样式的进度条" :code="circleCode">
      <NSpace :size="24">
        <NProgress type="circle" :percentage="25" />
        <NProgress type="circle" :percentage="50" status="info" />
        <NProgress type="circle" :percentage="75" status="success" />
        <NProgress type="circle" :percentage="100" status="warning" />
      </NSpace>
    </CodePreview>

    <CodePreview title="动态控制" description="通过按钮控制进度" :code="customCode">
      <NSpace vertical :size="12" style="max-width: 400px">
        <NProgress type="line" :percentage="percentage" indicator-placement="inside" />
        <NSpace>
          <NButton @click="percentage = Math.max(0, percentage - 10)">-10%</NButton>
          <NButton type="primary" @click="percentage = Math.min(100, percentage + 10)">+10%</NButton>
        </NSpace>
      </NSpace>
    </CodePreview>
  </div>
</template>
