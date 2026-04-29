/**
 * useThrottleFn - 节流函数 Hook
 * 对传入函数进行节流处理，提供 isPending 状态和 cancel 方法
 */
import { ref } from 'vue'

export function useThrottleFn<T extends (...args: any[]) => any>(fn: T, delay = 300) {
  let timer: ReturnType<typeof setTimeout> | null = null
  let lastExec = 0
  const isPending = ref(false)

  function throttledFn(...args: Parameters<T>) {
    const now = Date.now()
    const elapsed = now - lastExec

    if (elapsed >= delay) {
      fn(...args)
      lastExec = now
    } else {
      isPending.value = true
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        fn(...args)
        lastExec = Date.now()
        isPending.value = false
        timer = null
      }, delay - elapsed)
    }
  }

  function cancel() {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    isPending.value = false
  }

  return { throttledFn, isPending, cancel }
}
