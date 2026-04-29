<script setup lang="ts">
import { NButton, NSpace, useMessage } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const message = useMessage()

const code = `import { useMessage } from 'naive-ui'

const message = useMessage()

message.info('这是一条信息')
message.success('操作成功')
message.warning('警告信息')
message.error('错误信息')
message.loading('加载中...')`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Message 消息</h2>

    <CodePreview title="基础用法" description="全局消息提示，支持 info、success、warning、error、loading 五种类型" :code="code">
      <NSpace>
        <NButton @click="message.info('这是一条信息提示')">Info</NButton>
        <NButton type="success" @click="message.success('操作成功！')">Success</NButton>
        <NButton type="warning" @click="message.warning('这是一条警告')">Warning</NButton>
        <NButton type="error" @click="message.error('出错了！')">Error</NButton>
        <NButton secondary @click="message.loading('加载中...', { duration: 2000 })">Loading</NButton>
      </NSpace>
    </CodePreview>

    <CodePreview title="持续时间" description="可以自定义消息的持续时间" :code="`message.success('成功', { duration: 5000 })\nmessage.info('不会自动关闭', { duration: 0, closable: true })`">
      <NSpace>
        <NButton @click="message.success('5秒后关闭', { duration: 5000 })">5秒</NButton>
        <NButton @click="message.info('手动关闭', { duration: 0, closable: true })">手动关闭</NButton>
      </NSpace>
    </CodePreview>
  </div>
</template>
