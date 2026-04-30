<script setup lang="ts">
/**
 * JSZip 打包下载
 */
import { ref } from 'vue'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { NInput, NButton, NList, NListItem, NCard, NIcon } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

interface FileEntry { name: string; content: string }

const files = ref<FileEntry[]>([
  { name: 'readme.txt', content: '这是一个 ZIP 打包示例。\n包含多个文本文件。' },
  { name: 'data.json', content: JSON.stringify({ hello: 'world', list: [1, 2, 3] }, null, 2) },
  { name: 'index.html', content: '<!DOCTYPE html>\n<html><body><h1>Hi</h1></body></html>' },
])

const newName = ref('')
const newContent = ref('')

function addFile() {
  if (!newName.value.trim()) return
  files.value.push({ name: newName.value, content: newContent.value })
  newName.value = ''
  newContent.value = ''
}
function removeFile(i: number) { files.value.splice(i, 1) }

async function downloadZip() {
  const zip = new JSZip()
  for (const f of files.value) zip.file(f.name, f.content)
  const blob = await zip.generateAsync({ type: 'blob' })
  saveAs(blob, 'archive.zip')
}

const code = `import JSZip from 'jszip'
import { saveAs } from 'file-saver'

const zip = new JSZip()
zip.file('readme.txt', '内容...')
zip.file('data.json', JSON.stringify(obj))

const blob = await zip.generateAsync({ type: 'blob' })
saveAs(blob, 'archive.zip')`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">JSZip 打包下载</h2>
    <CodePreview title="jszip + file-saver" description="纯前端创建 ZIP 压缩包并触发浏览器下载" :code="code">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <NCard size="small" title="📁 当前文件列表">
          <NList hoverable bordered>
            <NListItem v-for="(f, i) in files" :key="i">
              <div class="flex items-center justify-between w-full">
                <div>
                  <div class="font-mono text-sm">{{ f.name }}</div>
                  <div class="text-xs text-gray-400">{{ f.content.length }} 字节</div>
                </div>
                <NButton size="tiny" type="error" @click="removeFile(i)">
                  <NIcon><span>🗑</span></NIcon>
                </NButton>
              </div>
            </NListItem>
          </NList>
          <NButton type="primary" block class="mt-4" :disabled="!files.length" @click="downloadZip">
            📦 打包下载 ({{ files.length }} 个文件)
          </NButton>
        </NCard>
        <NCard size="small" title="➕ 新增文件">
          <div class="space-y-3">
            <NInput v-model:value="newName" placeholder="文件名 (如 hello.txt)" />
            <NInput v-model:value="newContent" type="textarea" :rows="6" placeholder="文件内容..." />
            <NButton block :disabled="!newName.trim()" @click="addFile">添加</NButton>
          </div>
        </NCard>
      </div>
    </CodePreview>
  </div>
</template>
