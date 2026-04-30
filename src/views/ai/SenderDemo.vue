<script setup lang="ts">
/**
 * Sender 输入框 Demo
 * 多模态输入：文本 + 附件 + 语音占位 + Tab 切换 / Shift+Enter 换行
 */
import { ref } from 'vue'
import { NCard, NInput, NButton, NSpace, NTag, NUpload, NTooltip, useMessage, type UploadFileInfo } from 'naive-ui'

const message = useMessage()
const text = ref('')
const files = ref<UploadFileInfo[]>([])
const recording = ref(false)
const sending = ref(false)
const tone = ref<'default' | 'concise' | 'professional' | 'creative'>('default')

const tones = [
  { value: 'default', label: '默认' },
  { value: 'concise', label: '简洁' },
  { value: 'professional', label: '专业' },
  { value: 'creative', label: '创意' },
]

function handleUpload({ fileList }: { fileList: UploadFileInfo[] }) {
  files.value = fileList
}

function removeFile(name: string) {
  files.value = files.value.filter((f) => f.name !== name)
}

function toggleRecord() {
  recording.value = !recording.value
  message.info(recording.value ? '🎤 录音已开始（占位）' : '⏹ 录音已停止（占位）')
}

async function send() {
  if (!text.value.trim() && files.value.length === 0) {
    message.warning('请输入内容或上传附件')
    return
  }
  sending.value = true
  await new Promise((r) => setTimeout(r, 800))
  message.success(`已发送：${text.value || '(无文本)'} · 附件 ${files.value.length} 个 · 风格 ${tone.value}`)
  text.value = ''
  files.value = []
  sending.value = false
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    send()
  }
}
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Sender 输入框</h2>
    <NCard>
      <div class="sender-box">
        <!-- 附件预览 -->
        <div v-if="files.length" class="files-preview">
          <NTag
            v-for="f in files"
            :key="f.name"
            closable
            type="info"
            :bordered="false"
            @close="removeFile(f.name)"
          >
            📎 {{ f.name }}
          </NTag>
        </div>

        <!-- 文本输入 -->
        <NInput
          v-model:value="text"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 6 }"
          placeholder="输入消息... (Enter 发送，Shift + Enter 换行)"
          :disabled="sending"
          @keydown="onKeydown"
        />

        <!-- 工具条 -->
        <NSpace class="mt-3" align="center" justify="space-between">
          <NSpace>
            <NUpload :show-file-list="false" multiple :on-change="handleUpload">
              <NTooltip>
                <template #trigger>
                  <NButton quaternary size="small">📎 附件</NButton>
                </template>
                上传图片 / 文档 / 代码文件
              </NTooltip>
            </NUpload>
            <NButton
              quaternary
              size="small"
              :type="recording ? 'error' : 'default'"
              @click="toggleRecord"
            >
              {{ recording ? '⏹ 停止' : '🎤 语音' }}
            </NButton>
            <NButton
              v-for="t in tones"
              :key="t.value"
              size="small"
              :type="tone === t.value ? 'primary' : 'default'"
              :tertiary="tone !== t.value"
              @click="tone = t.value as typeof tone"
            >
              {{ t.label }}
            </NButton>
          </NSpace>
          <NButton type="primary" :loading="sending" @click="send">
            ✈ 发送
          </NButton>
        </NSpace>
      </div>
    </NCard>
  </div>
</template>

<style scoped>
.sender-box {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 12px;
  background: #fff;
}
.files-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 10px;
}
</style>
