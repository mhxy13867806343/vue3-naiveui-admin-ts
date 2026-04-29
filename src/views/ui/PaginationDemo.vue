<script setup lang="ts">
import { ref } from 'vue'
import { NPagination, NSpace } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const page = ref(1)
const pageSize = ref(10)

const basicCode = `<NPagination v-model:page="page" :page-count="20" />`
const sizeCode = `<NPagination :page-count="50" show-size-picker :page-sizes="[10, 20, 50]" />`
const jumperCode = `<NPagination :page-count="100" show-quick-jumper />`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Pagination 分页</h2>

    <CodePreview title="基础用法" description="基础的分页组件" :code="basicCode">
      <NPagination v-model:page="page" :page-count="20" />
      <p style="margin-top: 8px; color: #666">当前页: {{ page }}</p>
    </CodePreview>

    <CodePreview title="每页条数" description="显示每页条数选择器" :code="sizeCode">
      <NPagination v-model:page="page" v-model:page-size="pageSize" :item-count="200" show-size-picker :page-sizes="[10, 20, 30, 50]" />
    </CodePreview>

    <CodePreview title="快速跳转" description="显示快速跳转输入框" :code="jumperCode">
      <NPagination :page-count="100" show-quick-jumper />
    </CodePreview>
  </div>
</template>
