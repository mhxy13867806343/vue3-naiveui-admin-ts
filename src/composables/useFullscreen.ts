/**
 * useFullscreen - 全屏状态管理 Hook
 * 提供 isFullscreen 响应式状态和 toggleFullscreen 切换方法
 */
import { ref } from 'vue'
import { useEventListener } from './useEventListener'

export function useFullscreen() {
  const isFullscreen = ref(!!document.fullscreenElement)

  function syncState() {
    isFullscreen.value = !!document.fullscreenElement
  }

  useEventListener(document, 'fullscreenchange', syncState)

  async function toggleFullscreen(): Promise<void> {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen()
      } else {
        await document.documentElement.requestFullscreen()
      }
    } catch (error) {
      console.warn('Fullscreen API error:', error)
    }
  }

  return {
    isFullscreen,
    toggleFullscreen,
  }
}
