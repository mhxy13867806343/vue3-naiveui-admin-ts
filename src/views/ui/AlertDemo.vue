<script setup lang="ts">
import { NAlert, NSpace } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const basicCode = `<NAlert type="info" title="信息提示">这是一条信息提示</NAlert>
<NAlert type="success" title="成功提示">操作已完成</NAlert>
<NAlert type="warning" title="警告提示">请注意</NAlert>
<NAlert type="error" title="错误提示">出错了</NAlert>`

const closableCode = `<NAlert type="warning" title="可关闭" closable>点击右侧关闭</NAlert>`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Alert 警告</h2>

    <CodePreview title="基础用法" description="四种类型的警告提示" :code="basicCode">
      <NSpace vertical :size="12">
        <NAlert type="info" title="信息提示">这是一条信息提示，用于展示一般性信息。</NAlert>
        <NAlert type="success" title="成功提示">操作已成功完成！</NAlert>
        <NAlert type="warning" title="警告提示">请注意，此操作可能有风险。</NAlert>
        <NAlert type="error" title="错误提示">操作失败，请检查后重试。</NAlert>
      </NSpace>
    </CodePreview>

    <CodePreview title="可关闭" description="设置 closable 属性使警告可关闭" :code="closableCode">
      <NSpace vertical :size="12">
        <NAlert type="info" title="可关闭的信息" closable>点击右侧图标关闭此提示。</NAlert>
        <NAlert type="warning" title="可关闭的警告" closable>这条警告可以被关闭。</NAlert>
      </NSpace>
    </CodePreview>

    <CodePreview title="无标题" description="不设置 title 属性时只显示内容" :code="`<NAlert type='success'>简短的成功提示</NAlert>`">
      <NSpace vertical :size="12">
        <NAlert type="success">简短的成功提示信息。</NAlert>
        <NAlert type="error">简短的错误提示信息。</NAlert>
      </NSpace>
    </CodePreview>
  </div>
</template>
