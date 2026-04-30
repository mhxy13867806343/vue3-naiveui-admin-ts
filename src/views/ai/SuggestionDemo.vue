<script setup lang="ts">
/**
 * Suggestion 指令建议 Demo
 * 输入 / 触发 slash command 弹出建议；@提及人员；常用快捷气泡
 */
import { ref, computed, nextTick } from 'vue'
import { NCard, NInput, NSpace, NTag, NButton, NPopover } from 'naive-ui'

const slashCommands = [
  { cmd: '/translate', desc: '翻译选中文本' },
  { cmd: '/summarize', desc: '总结当前对话' },
  { cmd: '/explain', desc: '解释概念或代码' },
  { cmd: '/code', desc: '生成代码示例' },
  { cmd: '/image', desc: '描述图片或生成图片' },
  { cmd: '/clear', desc: '清空对话' },
]

const mentions = [
  { name: '小王', role: '后端' },
  { name: 'Alice', role: '前端' },
  { name: 'Bob', role: '设计' },
  { name: 'Cathy', role: '产品' },
]

const quickPrompts = [
  '帮我写一段 Vue 3 组件代码',
  '解释 TypeScript 泛型',
  '推荐一个轻量状态管理方案',
  '生成 1 个 React 面试题',
]

const input = ref('')
const inputRef = ref<{ focus: () => void } | null>(null)
const showSlash = computed(() => input.value.startsWith('/'))
const showMention = computed(() => /(^|\s)@\S*$/.test(input.value))

const filteredSlash = computed(() => {
  const q = input.value.slice(1).toLowerCase()
  return slashCommands.filter((c) => c.cmd.slice(1).startsWith(q))
})

const filteredMention = computed(() => {
  const q = (input.value.match(/@(\S*)$/)?.[1] || '').toLowerCase()
  return mentions.filter((m) => m.name.toLowerCase().includes(q))
})

function applySlash(cmd: string) {
  input.value = cmd + ' '
  nextTick(() => inputRef.value?.focus())
}

function applyMention(name: string) {
  input.value = input.value.replace(/@\S*$/, `@${name} `)
  nextTick(() => inputRef.value?.focus())
}

function applyQuick(text: string) {
  input.value = text
  nextTick(() => inputRef.value?.focus())
}
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Suggestion 指令建议</h2>

    <NCard title="💡 快捷提示气泡" size="small" class="mb-4">
      <NSpace>
        <NButton
          v-for="(p, i) in quickPrompts"
          :key="i"
          size="small"
          dashed
          @click="applyQuick(p)"
        >
          {{ p }}
        </NButton>
      </NSpace>
    </NCard>

    <NCard title="⌨️ 输入框（支持 / 命令 与 @ 提及）" size="small">
      <div class="text-sm text-gray-500 mb-2">
        输入 <NTag size="small" :bordered="false">/</NTag> 触发命令，输入 <NTag size="small" :bordered="false">@</NTag> 触发人员提及
      </div>

      <NPopover
        :show="showSlash || showMention"
        trigger="manual"
        placement="top-start"
        raw
        :show-arrow="false"
      >
        <template #trigger>
          <NInput
            ref="inputRef"
            v-model:value="input"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 5 }"
            placeholder="试试输入 / 或 @ ..."
          />
        </template>

        <div class="suggestion-pop">
          <template v-if="showSlash">
            <div class="suggestion-title">命令建议</div>
            <div
              v-for="c in filteredSlash"
              :key="c.cmd"
              class="suggestion-item"
              @mousedown.prevent="applySlash(c.cmd)"
            >
              <span class="cmd">{{ c.cmd }}</span>
              <span class="desc">{{ c.desc }}</span>
            </div>
            <div v-if="filteredSlash.length === 0" class="empty">无匹配命令</div>
          </template>
          <template v-else-if="showMention">
            <div class="suggestion-title">提及成员</div>
            <div
              v-for="m in filteredMention"
              :key="m.name"
              class="suggestion-item"
              @mousedown.prevent="applyMention(m.name)"
            >
              <span class="cmd">@{{ m.name }}</span>
              <span class="desc">{{ m.role }}</span>
            </div>
            <div v-if="filteredMention.length === 0" class="empty">无匹配成员</div>
          </template>
        </div>
      </NPopover>
    </NCard>
  </div>
</template>

<style scoped>
.suggestion-pop {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
  padding: 6px;
  min-width: 260px;
  max-height: 240px;
  overflow-y: auto;
}
.suggestion-title {
  font-size: 12px;
  color: #9ca3af;
  padding: 4px 10px 6px;
}
.suggestion-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 8px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
}
.suggestion-item:hover {
  background: #f3f4f6;
}
.cmd {
  color: #18a058;
  font-family: 'SF Mono', Consolas, monospace;
}
.desc {
  color: #6b7280;
  font-size: 12px;
}
.empty {
  padding: 12px;
  color: #9ca3af;
  font-size: 13px;
  text-align: center;
}
</style>
