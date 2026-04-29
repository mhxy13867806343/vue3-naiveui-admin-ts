<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import CodePreview from '@/components/common/CodePreview.vue'

const { t } = useI18n()

const code = `import { NIcon } from 'naive-ui'
import { HomeOutline, SettingsOutline, PersonOutline } from '@vicons/ionicons5'

// 使用 Naive UI 的 NIcon 组件包裹图标
// Template:
// <NIcon size="24">
//   <HomeOutline />
// </NIcon>
//
// 也可以使用 class 控制大小和颜色:
// <NIcon size="24" color="#18a058">
//   <SettingsOutline />
// </NIcon>`
</script>

<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">{{ t('menu.iconsDemo') }}</h2>
    <CodePreview title="图标使用示例" description="使用 @vicons/ionicons5 图标库配合 Naive UI 的 NIcon 组件" :code="code">
      <p class="text-gray-500">页面开发中...</p>
    </CodePreview>
  </div>
</template>
