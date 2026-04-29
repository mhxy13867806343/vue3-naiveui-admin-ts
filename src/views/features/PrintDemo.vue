<script setup lang="ts">
import { ref } from 'vue'
import { NButton, NAlert, NTable } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const printRef = ref<HTMLElement>()

function handlePrint() {
  const content = printRef.value
  if (!content) return

  const printWindow = window.open('', '_blank')
  if (!printWindow) return

  printWindow.document.write(`
    <html>
      <head>
        <title>打印预览</title>
        <style>
          body { font-family: sans-serif; padding: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 16px; }
          th, td { border: 1px solid #ddd; padding: 8px 12px; text-align: left; }
          th { background-color: #f5f5f5; }
          h3 { margin-bottom: 8px; }
        </style>
      </head>
      <body>${content.innerHTML}</body>
    </html>
  `)
  printWindow.document.close()
  printWindow.print()
  printWindow.close()
}

const code = `import { ref } from 'vue'

const printRef = ref<HTMLElement>()

function handlePrint() {
  const content = printRef.value
  if (!content) return

  const printWindow = window.open('', '_blank')
  if (!printWindow) return

  printWindow.document.write(\`
    <html>
      <head>
        <title>打印预览</title>
        <style>
          body { font-family: sans-serif; padding: 20px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #ddd; padding: 8px 12px; }
          th { background-color: #f5f5f5; }
        </style>
      </head>
      <body>\${content.innerHTML}</body>
    </html>
  \`)
  printWindow.document.close()
  printWindow.print()
  printWindow.close()
}

// Template:
// <div ref="printRef">
//   <!-- 需要打印的内容 -->
// </div>
// <button @click="handlePrint">打印</button>`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">打印</h2>
    <CodePreview title="打印功能" description="通过 window.open 创建打印窗口，实现页面局部内容打印" :code="code">
      <NAlert type="info" title="说明" class="mb-4">
        点击打印按钮将打开打印预览窗口，可以打印下方表格内容。
      </NAlert>

      <NButton type="primary" class="mb-4" @click="handlePrint">🖨️ 打印下方内容</NButton>

      <div ref="printRef">
        <h3 class="text-base font-medium">员工信息表</h3>
        <NTable :bordered="true" :single-line="false">
          <thead>
            <tr>
              <th>姓名</th>
              <th>部门</th>
              <th>职位</th>
              <th>入职日期</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>张三</td><td>技术部</td><td>前端工程师</td><td>2022-03-15</td></tr>
            <tr><td>李四</td><td>产品部</td><td>产品经理</td><td>2021-07-20</td></tr>
            <tr><td>王五</td><td>设计部</td><td>UI设计师</td><td>2023-01-10</td></tr>
            <tr><td>赵六</td><td>技术部</td><td>后端工程师</td><td>2022-09-05</td></tr>
            <tr><td>孙七</td><td>市场部</td><td>市场专员</td><td>2023-06-18</td></tr>
          </tbody>
        </NTable>
      </div>
    </CodePreview>
  </div>
</template>
