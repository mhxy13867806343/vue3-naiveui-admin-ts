/**
 * useDebounceFn - 防抖函数 Hook
 * 对传入函数进行防抖处理，提供 isPending 状态和 cancel 方法
 */
import { ref } from 'vue'

export function useDebounceFn<T extends (...args: any[]) => any>(fn: T, delay = 300) {
  let timer: ReturnType<typeof setTimeout> | null = null
  const isPending = ref(false)

  function debouncedFn(...args: Parameters<T>) {
    isPending.value = true
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
      isPending.value = false
      timer = null
    }, delay)
  }

  function cancel() {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    isPending.value = false
  }

  return { debouncedFn, isPending, cancel }
}
