<script setup lang="ts">
import { NGrid, NGridItem, NCard, NIcon } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const emojiIcons = [
  { emoji: '📊', name: 'Dashboard' },
  { emoji: '👥', name: 'Users' },
  { emoji: '📝', name: 'Content' },
  { emoji: '📈', name: 'Charts' },
  { emoji: '🧩', name: 'Components' },
  { emoji: '🔧', name: 'Features' },
  { emoji: '🔐', name: 'Permission' },
  { emoji: '📄', name: 'About' },
  { emoji: '🚀', name: 'Deploy' },
  { emoji: '⚙️', name: 'Settings' },
  { emoji: '💻', name: 'Code' },
  { emoji: '📋', name: 'Clipboard' },
  { emoji: '🖨️', name: 'Print' },
  { emoji: '🌐', name: 'I18n' },
  { emoji: '✅', name: 'Success' },
  { emoji: '❌', name: 'Error' },
  { emoji: '⚠️', name: 'Warning' },
  { emoji: '💡', name: 'Tip' },
  { emoji: '🔍', name: 'Search' },
  { emoji: '➕', name: 'Add' },
  { emoji: '✏️', name: 'Edit' },
  { emoji: '🗑️', name: 'Delete' },
  { emoji: '📦', name: 'Package' },
  { emoji: '💰', name: 'Money' },
  { emoji: '👤', name: 'User' },
  { emoji: '🏢', name: 'Company' },
  { emoji: '💼', name: 'Business' },
  { emoji: '👔', name: 'HR' },
  { emoji: '🎨', name: 'Design' },
  { emoji: '📱', name: 'Mobile' },
]

const emojiCode = `// 在本项目中，我们使用 Emoji 作为图标
// 配合 Naive UI 的 NIcon 组件使用

// 方式一：直接在模板中使用
<NIcon size="24">
  <span>📊</span>
</NIcon>

// 方式二：在 render 函数中使用（如菜单）
import { h } from 'vue'
import { NIcon } from 'naive-ui'

h(NIcon, null, { default: () => h('span', '📊') })`

const niconCode = `import { NIcon } from 'naive-ui'

// NIcon 组件属性
// size: 图标大小 (number | string)
// color: 图标颜色 (string)
// depth: 图标深度 (1 | 2 | 3 | 4 | 5)

<NIcon size="24" color="#18a058">
  <span>🚀</span>
</NIcon>

// 也可以使用第三方图标库如 @vicons/ionicons5
// import { HomeOutline } from '@vicons/ionicons5'
// <NIcon><HomeOutline /></NIcon>`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">图标展示 Icons</h2>

    <CodePreview title="项目 Emoji 图标" description="项目中使用的 Emoji 图标集合，点击可复制" :code="emojiCode">
      <NGrid :cols="6" :x-gap="12" :y-gap="12">
        <NGridItem v-for="icon in emojiIcons" :key="icon.name">
          <NCard size="small" hoverable style="text-align: center; cursor: pointer">
            <div style="font-size: 28px; margin-bottom: 4px">{{ icon.emoji }}</div>
            <div style="font-size: 12px; color: #999">{{ icon.name }}</div>
          </NCard>
        </NGridItem>
      </NGrid>
    </CodePreview>

    <CodePreview title="NIcon 组件用法" description="Naive UI 的 NIcon 组件支持自定义大小和颜色" :code="niconCode">
      <div style="display: flex; gap: 24px; align-items: center">
        <div style="text-align: center">
          <NIcon size="20"><span>📊</span></NIcon>
          <div style="font-size: 12px; color: #999; margin-top: 4px">20px</div>
        </div>
        <div style="text-align: center">
          <NIcon size="28"><span>📊</span></NIcon>
          <div style="font-size: 12px; color: #999; margin-top: 4px">28px</div>
        </div>
        <div style="text-align: center">
          <NIcon size="36"><span>📊</span></NIcon>
          <div style="font-size: 12px; color: #999; margin-top: 4px">36px</div>
        </div>
        <div style="text-align: center">
          <NIcon size="48"><span>📊</span></NIcon>
          <div style="font-size: 12px; color: #999; margin-top: 4px">48px</div>
        </div>
      </div>
    </CodePreview>
  </div>
</template>
