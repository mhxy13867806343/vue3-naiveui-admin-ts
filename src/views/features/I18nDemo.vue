<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { NButton, NAlert, NCard, NSpace } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const { t, locale } = useI18n()

const currentLang = computed(() => (locale.value === 'zh-CN' ? '中文' : 'English'))

function switchLanguage(lang: string) {
  locale.value = lang
}

const code = `import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const currentLang = computed(() =>
  locale.value === 'zh-CN' ? '中文' : 'English'
)

function switchLanguage(lang: string) {
  locale.value = lang
}

// 在模板中使用 t() 函数进行翻译:
// {{ t('menu.dashboard') }}
// {{ t('common.confirm') }}
// {{ t('common.cancel') }}

// 切换语言:
// <button @click="switchLanguage('zh-CN')">中文</button>
// <button @click="switchLanguage('en-US')">English</button>`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">{{ t('menu.i18nDemo') }}</h2>
    <CodePreview title="vue-i18n 国际化" description="使用 vue-i18n 实现国际化，切换语言后页面文本自动更新" :code="code">
      <NAlert type="info" title="说明" class="mb-4">
        使用 vue-i18n 实现国际化。切换语言后，页面上所有使用 t() 函数的文本都会自动更新。
      </NAlert>

      <NCard title="语言切换" class="mb-4">
        <p class="mb-3">当前语言：<strong>{{ currentLang }}</strong> ({{ locale }})</p>
        <NSpace>
          <NButton :type="locale === 'zh-CN' ? 'primary' : 'default'" @click="switchLanguage('zh-CN')">
            🇨🇳 中文
          </NButton>
          <NButton :type="locale === 'en-US' ? 'primary' : 'default'" @click="switchLanguage('en-US')">
            🇺🇸 English
          </NButton>
        </NSpace>
      </NCard>

      <NCard title="翻译示例">
        <div class="space-y-2 text-sm">
          <p><strong>menu.dashboard:</strong> {{ t('menu.dashboard') }}</p>
          <p><strong>menu.system:</strong> {{ t('menu.system') }}</p>
          <p><strong>menu.content:</strong> {{ t('menu.content') }}</p>
          <p><strong>common.confirm:</strong> {{ t('common.confirm') }}</p>
          <p><strong>common.cancel:</strong> {{ t('common.cancel') }}</p>
          <p><strong>common.save:</strong> {{ t('common.save') }}</p>
          <p><strong>common.delete:</strong> {{ t('common.delete') }}</p>
          <p><strong>common.search:</strong> {{ t('common.search') }}</p>
        </div>
      </NCard>
    </CodePreview>
  </div>
</template>
