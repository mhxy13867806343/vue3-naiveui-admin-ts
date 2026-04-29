<script setup lang="ts">
/**
 * Papa Parse - CSV 解析
 */
import { ref } from 'vue'
import Papa from 'papaparse'
import { NInput, NDataTable, NSpace, NButton, NTabs, NTabPane } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const csvText = ref(`name,age,city,score
Alice,28,Beijing,92
Bob,32,Shanghai,85
Charlie,25,Guangzhou,78
David,40,Shenzhen,95
Eve,30,Hangzhou,88`)

const rows = ref<Record<string, string>[]>([])
const columns = ref<DataTableColumns<Record<string, string>>>([])
const json = ref('')

function parse() {
  const result = Papa.parse<Record<string, string>>(csvText.value, {
    header: true,
    skipEmptyLines: true,
  })
  rows.value = result.data
  if (result.meta.fields) {
    columns.value = result.meta.fields.map((f) => ({ title: f, key: f }))
  }
  json.value = JSON.stringify(result.data, null, 2)
}

function unparse() {
  const csv = Papa.unparse(rows.value)
  csvText.value = csv
}

parse()

const code = `import Papa from 'papaparse'

// 解析 CSV → JSON
const result = Papa.parse(csvText, {
  header: true,
  skipEmptyLines: true,
})
console.log(result.data)

// JSON → CSV
const csv = Papa.unparse([{ a: 1, b: 2 }, { a: 3, b: 4 }])`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Papa Parse CSV 解析</h2>
    <CodePreview title="papaparse" description="高性能 CSV 解析与生成，支持流式处理与大文件" :code="code">
      <NTabs type="line">
        <NTabPane name="parse" tab="CSV → JSON">
          <NSpace vertical :size="12">
            <NInput v-model:value="csvText" type="textarea" :rows="8" placeholder="粘贴 CSV 内容..." />
            <NSpace>
              <NButton type="primary" @click="parse">▶ 解析</NButton>
              <NButton @click="unparse">↩ 表格转回 CSV</NButton>
            </NSpace>
            <NDataTable :columns="columns" :data="rows" :bordered="true" size="small" />
          </NSpace>
        </NTabPane>
        <NTabPane name="json" tab="JSON 输出">
          <pre class="text-xs bg-gray-50 p-3 rounded overflow-auto max-h-[400px]">{{ json }}</pre>
        </NTabPane>
      </NTabs>
    </CodePreview>
  </div>
</template>
