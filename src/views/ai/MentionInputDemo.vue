<script setup lang="ts">
/**
 * MentionInput @ 提及输入 Demo
 * 在输入框中输入 @ 触发成员搜索 / 选择，支持键盘上下选择 + Enter 确认
 * 与 EPX 的 MentionSender 区分：聚焦"输入控件 + 提及交互"，无发送按钮逻辑
 */
import { ref, computed, nextTick } from 'vue'
import {
  NCard, NInput, NAvatar, NTag, NSpace, useMessage,
} from 'naive-ui'

interface Member {
  id: string
  name: string
  avatar: string
  role: string
  online: boolean
}

const message = useMessage()

const members: Member[] = [
  { id: 'u1', name: 'Alice', avatar: '👩‍💻', role: '前端工程师', online: true },
  { id: 'u2', name: 'Bob', avatar: '👨‍🎨', role: '设计师', online: true },
  { id: 'u3', name: 'Cathy', avatar: '👩‍💼', role: '产品经理', online: false },
  { id: 'u4', name: 'David', avatar: '👨‍💻', role: '后端工程师', online: true },
  { id: 'u5', name: 'Emma', avatar: '👩‍🔬', role: '数据分析师', online: false },
  { id: 'u6', name: 'Frank', avatar: '👨‍🚀', role: '架构师', online: true },
  { id: 'u7', name: '小王', avatar: '🧑', role: '运维', online: true },
  { id: 'u8', name: '老李', avatar: '👴', role: 'CTO', online: false },
]

const text = ref('Hi 大家好，')
const inputRef = ref<{ focus: () => void } | null>(null)
const showPanel = ref(false)
const activeIdx = ref(0)
const mentionStart = ref(-1)

// 检测光标前是否在输入 @xxx
function detectMention(value: string, cursorPos: number) {
  // 从光标向前找 @，必须紧跟空格或开头
  for (let i = cursorPos - 1; i >= 0; i--) {
    const ch = value[i]
    if (ch === '@') {
      const prev = value[i - 1]
      if (i === 0 || prev === ' ' || prev === '\n') {
        return { start: i, query: value.slice(i + 1, cursorPos) }
      }
      return null
    }
    if (/\s/.test(ch)) return null
  }
  return null
}

const query = ref('')
const filtered = computed(() => {
  const q = query.value.toLowerCase()
  if (!q) return members.slice(0, 6)
  return members.filter((m) => m.name.toLowerCase().includes(q) || m.role.toLowerCase().includes(q))
})

function onInput(value: string) {
  text.value = value
  // 取当前 selection 末尾位置（textarea 不易拿，简单方案：取 value.length）
  const det = detectMention(value, value.length)
  if (det) {
    mentionStart.value = det.start
    query.value = det.query
    showPanel.value = true
    activeIdx.value = 0
  } else {
    showPanel.value = false
  }
}

function pick(m: Member) {
  if (mentionStart.value < 0) return
  const before = text.value.slice(0, mentionStart.value)
  const after = text.value.slice(mentionStart.value + 1 + query.value.length)
  // 用零宽空格 \u200B 包裹便于后续解析；这里用简单 @Name + 空格
  text.value = `${before}@${m.name} ${after}`
  showPanel.value = false
  mentionStart.value = -1
  query.value = ''
  message.success(`已提及 @${m.name}`)
  nextTick(() => inputRef.value?.focus())
}

function onKeydown(e: KeyboardEvent) {
  if (!showPanel.value) return
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    activeIdx.value = (activeIdx.value + 1) % filtered.value.length
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    activeIdx.value = (activeIdx.value - 1 + filtered.value.length) % filtered.value.length
  } else if (e.key === 'Enter') {
    e.preventDefault()
    const m = filtered.value[activeIdx.value]
    if (m) pick(m)
  } else if (e.key === 'Escape') {
    showPanel.value = false
  }
}

// 解析提及列表（用于演示）
const mentioned = computed(() => {
  const re = /@([^\s@]+)/g
  const set = new Set<string>()
  let m: RegExpExecArray | null
  while ((m = re.exec(text.value)) !== null) {
    if (members.find((x) => x.name === m![1])) set.add(m[1])
  }
  return Array.from(set)
})
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">MentionInput @ 提及输入</h2>

    <NCard size="small" title="✏️ 输入框" class="mb-4">
      <div class="text-sm text-gray-500 mb-2">
        输入 <NTag size="small" :bordered="false">@</NTag> 后跟字符以触发成员搜索；↑/↓ 选择，Enter 确认
      </div>

      <div class="mention-wrap">
        <NInput
          ref="inputRef"
          :value="text"
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 6 }"
          placeholder="试试输入 @..."
          @update:value="onInput"
          @keydown="onKeydown"
        />

        <!-- 成员面板 -->
        <div v-if="showPanel && filtered.length" class="m-panel">
          <div class="m-panel-title">
            匹配 {{ filtered.length }} 个成员
            <span class="text-xs text-gray-400">（"{{ query || '空' }}"）</span>
          </div>
          <div
            v-for="(m, i) in filtered" :key="m.id"
            :class="['m-item', { active: i === activeIdx }]"
            @mouseenter="activeIdx = i"
            @mousedown.prevent="pick(m)"
          >
            <NAvatar round size="small" color="#f3f4f6" style="color: inherit">{{ m.avatar }}</NAvatar>
            <div class="m-info">
              <div class="m-name">
                {{ m.name }}
                <span :class="['dot', m.online ? 'online' : 'offline']"></span>
              </div>
              <div class="m-role">{{ m.role }}</div>
            </div>
            <span class="hint">↵</span>
          </div>
        </div>
      </div>
    </NCard>

    <NCard size="small" title="📋 已提及">
      <NSpace v-if="mentioned.length">
        <NTag
          v-for="name in mentioned" :key="name"
          type="info" round :bordered="false"
        >@{{ name }}</NTag>
      </NSpace>
      <span v-else class="text-gray-400 text-sm">还没有提及任何成员</span>
    </NCard>
  </div>
</template>

<style scoped>
.mention-wrap {
  position: relative;
}
.m-panel {
  position: absolute;
  bottom: calc(100% + 4px);
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  padding: 6px;
  max-height: 280px;
  overflow-y: auto;
  z-index: 10;
}
.m-panel-title {
  font-size: 12px;
  color: #9ca3af;
  padding: 4px 10px 6px;
}
.m-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.1s;
}
.m-item.active,
.m-item:hover {
  background: #f3f4f6;
}
.m-info { flex: 1; min-width: 0; }
.m-name {
  font-size: 13px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
}
.m-role {
  font-size: 11px;
  color: #9ca3af;
}
.hint {
  font-size: 11px;
  color: #9ca3af;
  font-family: 'SF Mono', Consolas, monospace;
  background: #f3f4f6;
  padding: 1px 6px;
  border-radius: 4px;
}
.dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
}
.dot.online { background: #18a058; }
.dot.offline { background: #d1d5db; }
</style>
