/**
 * useLoading - 加载状态管理 Hook
 * 提供 loading 响应式状态和 run 异步执行方法
 */
import { ref } from 'vue'

export function useLoading() {
  const loading = ref(false)

  async function run<T>(fn: () => Promise<T>): Promise<T> {
    loading.value = true
    try {
      const result = await fn()
      return result
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    run,
  }
}
