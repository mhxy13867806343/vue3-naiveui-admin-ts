<script setup lang="ts">
/**
 * Mock.js - 模拟数据
 */
import { ref, h } from 'vue'
import Mock from 'mockjs'
import { NDataTable, NButton, NCard, NSpace, NInputNumber, NTag } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

interface User {
  id: string
  name: string
  email: string
  phone: string
  city: string
  age: number
  avatar: string
  date: string
}

const count = ref(10)
const users = ref<User[]>([])

function generate() {
  const data = Mock.mock({
    [`list|${count.value}`]: [{
      id: '@guid',
      name: '@cname',
      'age|18-60': 20,
      email: '@email',
      phone: /^1[34578]\d{9}$/,
      city: '@city',
      avatar: '@image("40x40", "@color", "#FFF", "@first")',
      date: '@date("yyyy-MM-dd")',
    }],
  })
  users.value = data.list
}
generate()

const columns: DataTableColumns<User> = [
  { title: '头像', key: 'avatar', width: 60, render: (r) => h('img', { src: r.avatar, class: 'w-8 h-8 rounded-full' }) },
  { title: '姓名', key: 'name', width: 100 },
  { title: '年龄', key: 'age', width: 80 },
  { title: '邮箱', key: 'email' },
  { title: '手机', key: 'phone', width: 130 },
  { title: '城市', key: 'city', width: 120, render: (r) => h(NTag, { type: 'info', size: 'small' }, () => r.city) },
  { title: '入职日期', key: 'date', width: 120 },
]

const code = `import Mock from 'mockjs'

const data = Mock.mock({
  'list|10': [{
    id: '@guid',
    name: '@cname',
    'age|18-60': 20,
    email: '@email',
    city: '@city',
    date: '@date("yyyy-MM-dd")',
  }]
})`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Mock.js 模拟数据</h2>
    <CodePreview title="mockjs" description="按规则生成随机模拟数据，前后端分离开发利器" :code="code">
      <NCard size="small" class="mb-4">
        <NSpace align="center">
          <span>生成数量：</span>
          <NInputNumber v-model:value="count" :min="1" :max="100" />
          <NButton type="primary" @click="generate">🎲 生成模拟数据</NButton>
          <span class="text-sm text-gray-500">当前 {{ users.length }} 条</span>
        </NSpace>
      </NCard>
      <NDataTable :columns="columns" :data="users" :bordered="true" :pagination="{ pageSize: 10 }" :scroll-x="900" />
    </CodePreview>
  </div>
</template>
