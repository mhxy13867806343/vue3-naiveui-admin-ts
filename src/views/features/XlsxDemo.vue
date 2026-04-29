<script setup lang="ts">
/**
 * SheetJS (xlsx) - Excel 导入导出
 */
import { ref } from 'vue'
import * as XLSX from 'xlsx'
import { NDataTable, NButton, NUpload, NSpace, NAlert, useMessage } from 'naive-ui'
import type { DataTableColumns, UploadFileInfo } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

interface Row { [k: string]: string | number }

const message = useMessage()
const data = ref<Row[]>([
  { 姓名: '张三', 部门: '研发部', 工资: 15000, 入职日期: '2022-03-01' },
  { 姓名: '李四', 部门: '产品部', 工资: 13000, 入职日期: '2023-05-12' },
  { 姓名: '王五', 部门: '设计部', 工资: 12000, 入职日期: '2021-08-20' },
  { 姓名: '赵六', 部门: '研发部', 工资: 18000, 入职日期: '2020-11-15' },
])

const columns = ref<DataTableColumns<Row>>([])
function rebuildColumns() {
  if (!data.value.length) return
  columns.value = Object.keys(data.value[0]).map((k) => ({ title: k, key: k }))
}
rebuildColumns()

function exportExcel() {
  const ws = XLSX.utils.json_to_sheet(data.value)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, '员工表')
  XLSX.writeFile(wb, 'employees.xlsx')
  message.success('导出成功')
}

function handleUpload({ file }: { file: UploadFileInfo }) {
  const f = file.file
  if (!f) return
  const reader = new FileReader()
  reader.onload = (e) => {
    const arr = new Uint8Array(e.target!.result as ArrayBuffer)
    const wb = XLSX.read(arr, { type: 'array' })
    const ws = wb.Sheets[wb.SheetNames[0]]
    data.value = XLSX.utils.sheet_to_json<Row>(ws)
    rebuildColumns()
    message.success(`已导入 ${data.value.length} 行`)
  }
  reader.readAsArrayBuffer(f)
}

const code = `import * as XLSX from 'xlsx'

// 导出
const ws = XLSX.utils.json_to_sheet(data)
const wb = XLSX.utils.book_new()
XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
XLSX.writeFile(wb, 'output.xlsx')

// 导入
const wb = XLSX.read(arrayBuffer, { type: 'array' })
const ws = wb.Sheets[wb.SheetNames[0]]
const json = XLSX.utils.sheet_to_json(ws)`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">SheetJS Excel 导入导出</h2>
    <CodePreview title="xlsx (SheetJS)" description="纯前端读写 Excel 文件，支持 .xlsx / .xls / .csv" :code="code">
      <NAlert type="info" class="mb-4">导入 Excel 时，第一行会自动作为表头字段。</NAlert>
      <NSpace class="mb-4">
        <NButton type="primary" @click="exportExcel">📤 导出 Excel</NButton>
        <NUpload :show-file-list="false" accept=".xlsx,.xls" @change="handleUpload">
          <NButton>📥 导入 Excel</NButton>
        </NUpload>
      </NSpace>
      <NDataTable :columns="columns" :data="data" :bordered="true" :pagination="{ pageSize: 10 }" />
    </CodePreview>
  </div>
</template>
