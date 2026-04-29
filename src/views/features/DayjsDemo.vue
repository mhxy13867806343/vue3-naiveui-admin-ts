<script setup lang="ts">
import { ref, computed } from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
import { NCard, NAlert } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

const now = ref(dayjs())

const examples = computed(() => [
  { label: '当前时间', value: now.value.format('YYYY-MM-DD HH:mm:ss') },
  { label: '格式化（中文）', value: now.value.format('YYYY年MM月DD日 dddd') },
  { label: '相对时间', value: dayjs('2024-01-01').from(now.value) },
  { label: '本月开始', value: now.value.startOf('month').format('YYYY-MM-DD') },
  { label: '本月结束', value: now.value.endOf('month').format('YYYY-MM-DD') },
  { label: '7天后', value: now.value.add(7, 'day').format('YYYY-MM-DD') },
  { label: '30天前', value: now.value.subtract(30, 'day').format('YYYY-MM-DD') },
  { label: '是否闰年', value: now.value.year() % 4 === 0 ? '是' : '否' },
  { label: '今年第几天', value: String(now.value.dayOfYear?.() ?? now.value.diff(now.value.startOf('year'), 'day') + 1) },
  { label: 'Unix 时间戳', value: String(now.value.unix()) },
  { label: 'ISO 8601', value: now.value.toISOString() },
])

const code = `import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

const now = dayjs()

// 格式化
now.format('YYYY-MM-DD HH:mm:ss')
now.format('YYYY年MM月DD日 dddd')

// 相对时间
dayjs('2024-01-01').from(now)  // "x个月前"

// 日期操作
now.startOf('month').format('YYYY-MM-DD')  // 本月开始
now.endOf('month').format('YYYY-MM-DD')    // 本月结束
now.add(7, 'day').format('YYYY-MM-DD')     // 7天后
now.subtract(30, 'day').format('YYYY-MM-DD') // 30天前

// 时间戳
now.unix()        // Unix 时间戳
now.toISOString() // ISO 8601 格式`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">dayjs 日期处理</h2>
    <CodePreview title="dayjs 日期处理" description="dayjs 是一个轻量级的日期处理库，API 与 Moment.js 兼容，体积仅 2KB" :code="code">
      <NAlert type="info" title="说明" class="mb-4">
        dayjs 是一个轻量级的日期处理库，API 与 Moment.js 兼容，体积仅 2KB。
      </NAlert>

      <NCard title="常用示例">
        <div class="space-y-3">
          <div
            v-for="item in examples"
            :key="item.label"
            class="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
          >
            <span class="text-sm text-gray-600">{{ item.label }}</span>
            <code class="text-sm bg-gray-100 px-2 py-1 rounded">{{ item.value }}</code>
          </div>
        </div>
      </NCard>
    </CodePreview>
  </div>
</template>
