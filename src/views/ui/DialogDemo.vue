<script setup lang="ts">
import { NButton, NSpace, useDialog } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const dialog = useDialog()

const code = `import { useDialog } from 'naive-ui'

const dialog = useDialog()

dialog.warning({
  title: '确认',
  content: '确定要删除吗？',
  positiveText: '确定',
  negativeText: '取消',
  onPositiveClick: () => { message.success('已删除') },
})`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Dialog 对话框</h2>

    <CodePreview title="基础用法" description="使用 useDialog 创建确认对话框" :code="code">
      <NSpace>
        <NButton @click="dialog.info({ title: '提示', content: '这是一条信息', positiveText: '知道了' })">Info</NButton>
        <NButton type="success" @click="dialog.success({ title: '成功', content: '操作已完成', positiveText: '好的' })">Success</NButton>
        <NButton type="warning" @click="dialog.warning({ title: '警告', content: '确定要继续吗？', positiveText: '确定', negativeText: '取消' })">Warning</NButton>
        <NButton type="error" @click="dialog.error({ title: '错误', content: '操作失败，请重试', positiveText: '重试', negativeText: '取消' })">Error</NButton>
      </NSpace>
    </CodePreview>

    <CodePreview title="确认删除" description="常见的删除确认场景" :code="`dialog.warning({\n  title: '确认删除',\n  content: '此操作不可撤销',\n  positiveText: '删除',\n  negativeText: '取消',\n})`">
      <NButton type="error" @click="dialog.warning({ title: '确认删除', content: '确定要删除这条记录吗？此操作不可撤销。', positiveText: '删除', negativeText: '取消' })">
        删除记录
      </NButton>
    </CodePreview>
  </div>
</template>
