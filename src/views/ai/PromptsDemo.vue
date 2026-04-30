<script setup lang="ts">
/**
 * Prompts 提示词模板 Demo
 * 提示词模板列表 + 变量替换实时预览
 */
import { ref, computed } from 'vue'
import { NCard, NList, NListItem, NThing, NTag, NSpace, NInput, NButton, useMessage } from 'naive-ui'

interface PromptTpl {
  id: string
  title: string
  desc: string
  template: string
  vars: Record<string, string>
  category: string
}

const message = useMessage()

const templates = ref<PromptTpl[]>([
  {
    id: 'translator',
    title: '🌐 翻译助手',
    desc: '将文本翻译为指定语言',
    template: '请将下面的{{from}}文本翻译为{{to}}，保留原意与语气：\n\n{{text}}',
    vars: { from: '中文', to: '英文', text: '今天天气真好。' },
    category: '语言',
  },
  {
    id: 'reviewer',
    title: '🔍 代码审查',
    desc: '审查代码并给出改进建议',
    template: '你是资深的{{lang}}工程师，请 review 下面的代码，找出潜在 bug 与可优化点：\n\n```{{lang}}\n{{code}}\n```',
    vars: { lang: 'TypeScript', code: 'const sum = (a, b) => a + b' },
    category: '编程',
  },
  {
    id: 'summarize',
    title: '📝 文档摘要',
    desc: '将长文压缩为要点',
    template: '请用不超过 {{n}} 句话总结以下内容，突出关键点：\n\n{{content}}',
    vars: { n: '3', content: 'Vue 3 引入 Composition API...（此处省略长文）' },
    category: '写作',
  },
  {
    id: 'sql',
    title: '🗃 SQL 生成',
    desc: '自然语言转 SQL',
    template: '数据表：{{schema}}\n请根据需求生成 SQL：{{question}}',
    vars: { schema: 'users(id, name, age, created_at)', question: '查询近 30 天注册的用户数' },
    category: '编程',
  },
])

const currentId = ref('translator')
const current = computed(() => templates.value.find((t) => t.id === currentId.value)!)

const rendered = computed(() => {
  let txt = current.value.template
  for (const [k, v] of Object.entries(current.value.vars)) {
    txt = txt.split(`{{${k}}}`).join(v || `{{${k}}}`)
  }
  return txt
})

function copy() {
  navigator.clipboard.writeText(rendered.value).then(() => message.success('已复制最终提示词'))
}
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Prompts 提示词模板</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <NCard title="📚 模板库" size="small" class="md:col-span-1">
        <NList hoverable clickable>
          <NListItem
            v-for="t in templates"
            :key="t.id"
            :class="{ active: t.id === currentId }"
            @click="currentId = t.id"
          >
            <NThing :title="t.title" :description="t.desc">
              <template #header-extra>
                <NTag size="small" :bordered="false">{{ t.category }}</NTag>
              </template>
            </NThing>
          </NListItem>
        </NList>
      </NCard>

      <NCard title="🧩 变量填充" size="small" class="md:col-span-1">
        <NSpace vertical>
          <div v-for="(_, key) in current.vars" :key="key">
            <div class="text-sm mb-1 font-medium">{{ key }}</div>
            <NInput
              v-model:value="current.vars[key]"
              type="textarea"
              :autosize="{ minRows: 1, maxRows: 4 }"
              :placeholder="`填写 ${key}`"
            />
          </div>
        </NSpace>
      </NCard>

      <NCard size="small" class="md:col-span-1">
        <template #header>📤 渲染结果</template>
        <template #header-extra>
          <NButton size="small" @click="copy">📋 复制</NButton>
        </template>
        <pre class="rendered">{{ rendered }}</pre>
      </NCard>
    </div>
  </div>
</template>

<style scoped>
.active {
  background: rgba(24, 160, 88, 0.08);
}
.rendered {
  white-space: pre-wrap;
  word-break: break-word;
  background: #f6f8fa;
  padding: 12px;
  border-radius: 6px;
  font-size: 13px;
  line-height: 1.7;
  min-height: 200px;
}
</style>
