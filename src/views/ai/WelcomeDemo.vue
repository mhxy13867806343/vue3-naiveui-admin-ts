<script setup lang="ts">
/**
 * Welcome 欢迎页 Demo
 * 仿 ChatGPT / Claude / 通义千问的初始欢迎屏：欢迎语 + 能力卡片 + 示例提问
 */
import { ref } from 'vue'
import { NCard, NSpace, NTag, useMessage } from 'naive-ui'

const message = useMessage()

const capabilities = [
  { icon: '💡', title: '创意写作', desc: '帮你写文章 / 文案 / 故事' },
  { icon: '🧮', title: '数据分析', desc: '解读数据，生成图表与结论' },
  { icon: '🌐', title: '多语翻译', desc: '40+ 语言互译，保留语气' },
  { icon: '⚙️', title: '编程助手', desc: '代码生成 / 重构 / 解释' },
]

const examples = [
  { tag: '编程', text: '用 Vue 3 + TS 写一个倒计时 Hook' },
  { tag: '写作', text: '帮我写一封项目延期的客户致歉邮件' },
  { tag: '学习', text: '一句话解释什么是事件循环' },
  { tag: '生活', text: '推荐 5 道适合周末的家常菜' },
  { tag: '分析', text: '总结《长安的荔枝》的核心冲突' },
  { tag: '翻译', text: '把这段中文翻成地道英文：…' },
]

const username = ref('开发者')

function pick(text: string) {
  message.info(`已选择：${text}`)
}
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Welcome 欢迎页</h2>

    <div class="welcome-hero">
      <div class="hero-emoji">🤖</div>
      <h1 class="hero-title">
        你好，<span class="hero-name">{{ username }}</span>
      </h1>
      <p class="hero-sub">我是 AI 助手，今天想做点什么？</p>
    </div>

    <NCard title="✨ 我能做什么" size="small" class="mt-4">
      <div class="caps-grid">
        <div v-for="(c, i) in capabilities" :key="i" class="cap-item">
          <div class="cap-icon">{{ c.icon }}</div>
          <div>
            <div class="cap-title">{{ c.title }}</div>
            <div class="cap-desc">{{ c.desc }}</div>
          </div>
        </div>
      </div>
    </NCard>

    <NCard title="🎯 试试这些" size="small" class="mt-4">
      <NSpace vertical>
        <div v-for="(e, i) in examples" :key="i" class="ex-item" @click="pick(e.text)">
          <NTag size="small" :bordered="false" type="info">{{ e.tag }}</NTag>
          <span class="ex-text">{{ e.text }}</span>
          <span class="ex-arrow">→</span>
        </div>
      </NSpace>
    </NCard>
  </div>
</template>

<style scoped>
.welcome-hero {
  text-align: center;
  padding: 36px 16px 28px;
  background: linear-gradient(135deg, #ecfdf5 0%, #eff6ff 100%);
  border-radius: 16px;
}
.hero-emoji {
  font-size: 56px;
  margin-bottom: 12px;
}
.hero-title {
  font-size: 28px;
  font-weight: 600;
  margin: 0;
  color: #1f2937;
}
.hero-name {
  background: linear-gradient(90deg, #18a058, #2080f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero-sub {
  color: #6b7280;
  margin-top: 8px;
}
.caps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
}
.cap-item {
  display: flex;
  gap: 12px;
  padding: 14px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: #fff;
  transition: all 0.2s;
}
.cap-item:hover {
  border-color: #18a058;
  box-shadow: 0 4px 12px rgba(24, 160, 88, 0.08);
}
.cap-icon {
  font-size: 28px;
  flex-shrink: 0;
}
.cap-title {
  font-weight: 600;
  font-size: 14px;
}
.cap-desc {
  font-size: 12px;
  color: #6b7280;
  margin-top: 2px;
}
.ex-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s;
}
.ex-item:hover {
  background: #f9fafb;
  border-color: #18a058;
}
.ex-item:hover .ex-arrow {
  transform: translateX(4px);
  color: #18a058;
}
.ex-text {
  flex: 1;
  font-size: 13px;
  color: #374151;
}
.ex-arrow {
  color: #9ca3af;
  transition: all 0.15s;
}
</style>
