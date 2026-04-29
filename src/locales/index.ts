/**
 * i18n 国际化实例配置
 * 使用 Composition API 模式，默认语言 zh-CN，从 localStorage 恢复用户语言偏好
 */
import { createI18n } from 'vue-i18n'
import zhCN from './zh-CN'
import enUS from './en-US'

const LOCALE_KEY = 'locale'

const savedLocale = localStorage.getItem(LOCALE_KEY) || 'zh-CN'

const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS,
  },
})

/**
 * 切换语言并持久化到 localStorage
 */
export function setLocale(locale: 'zh-CN' | 'en-US') {
  ;(i18n.global.locale as unknown as { value: string }).value = locale
  localStorage.setItem(LOCALE_KEY, locale)
  document.documentElement.setAttribute('lang', locale === 'zh-CN' ? 'zh-CN' : 'en')
}

export default i18n
