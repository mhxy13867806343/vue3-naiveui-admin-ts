/**
 * useEventListener - 自动清理事件监听 Hook
 * 在 onMounted 时绑定事件，onUnmounted 时自动移除
 */
import { onMounted, onUnmounted } from 'vue'

export function useEventListener(
  target: EventTarget | (() => EventTarget),
  event: string,
  handler: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions,
) {
  let el: EventTarget

  onMounted(() => {
    el = typeof target === 'function' ? target() : target
    el.addEventListener(event, handler, options)
  })

  onUnmounted(() => {
    if (el) {
      el.removeEventListener(event, handler, options)
    }
  })
}
