<script setup lang="ts">
import { NButton, NSpace, useNotification } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const notification = useNotification()

function notify(type: 'info' | 'success' | 'warning' | 'error') {
  notification[type]({
    title: type.charAt(0).toUpperCase() + type.slice(1),
    content: `这是一条 ${type} 类型的通知消息`,
    duration: 3000,
  })
}

const code = `import { useNotification } from 'naive-ui'

const notification = useNotification()

notification.success({
  title: '成功',
  content: '操作已完成',
  duration: 3000,
})`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Notification 通知</h2>

    <CodePreview title="基础用法" description="全局通知提示，支持四种类型" :code="code">
      <NSpace>
        <NButton @click="notify('info')">Info</NButton>
        <NButton type="success" @click="notify('success')">Success</NButton>
        <NButton type="warning" @click="notify('warning')">Warning</NButton>
        <NButton type="error" @click="notify('error')">Error</NButton>
      </NSpace>
    </CodePreview>

    <CodePreview title="自定义内容" description="通知支持自定义标题、内容和描述" :code="`notification.info({\n  title: '系统通知',\n  content: '您有新的消息',\n  meta: '2024-01-15',\n})`">
      <NButton @click="notification.info({ title: '系统通知', content: '您有 3 条未读消息，请及时查看。', meta: '刚刚', duration: 5000 })">
        自定义通知
      </NButton>
    </CodePreview>
  </div>
</template>
