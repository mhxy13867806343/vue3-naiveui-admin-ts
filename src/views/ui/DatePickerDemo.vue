<script setup lang="ts">
import { ref } from 'vue'
import { NDatePicker, NSpace } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const dateValue = ref<number | null>(null)
const datetimeValue = ref<number | null>(null)
const rangeValue = ref<[number, number] | null>(null)

const dateCode = `<NDatePicker v-model:value="value" type="date" />`
const datetimeCode = `<NDatePicker v-model:value="value" type="datetime" />`
const rangeCode = `<NDatePicker v-model:value="value" type="daterange" />`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">DatePicker 日期选择</h2>

    <CodePreview title="日期选择" description="基础的日期选择器" :code="dateCode">
      <NDatePicker v-model:value="dateValue" type="date" style="width: 250px" />
    </CodePreview>

    <CodePreview title="日期时间" description="选择日期和时间" :code="datetimeCode">
      <NDatePicker v-model:value="datetimeValue" type="datetime" style="width: 300px" />
    </CodePreview>

    <CodePreview title="日期范围" description="选择日期范围" :code="rangeCode">
      <NDatePicker v-model:value="rangeValue" type="daterange" style="width: 350px" />
    </CodePreview>
  </div>
</template>
