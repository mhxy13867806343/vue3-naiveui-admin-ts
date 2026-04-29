/**
 * useClipboard - 剪贴板 Hook
 * 复制文本到剪贴板，提供 copied 状态反馈
 */
import { ref } from 'vue'

export function useClipboard() {
  const copied = ref(false)
  const text = ref('')

  async function copy(value: string) {
    try {
      await navigator.clipboard.writeText(value)
      text.value = value
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 2000)
    } catch {
      // fallback for older browsers
      const textarea = document.createElement('textarea')
      textarea.value = value
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      text.value = value
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 2000)
    }
  }

  return { copied, text, copy }
}
