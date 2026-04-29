/**
 * useLocalStorage - 响应式 localStorage Hook
 * 读写 localStorage 并保持响应式同步
 */
import { ref, watch, type Ref } from 'vue'

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const stored = localStorage.getItem(key)
  const data = ref<T>(stored ? JSON.parse(stored) : defaultValue) as Ref<T>

  watch(
    data,
    (val) => {
      localStorage.setItem(key, JSON.stringify(val))
    },
    { deep: true },
  )

  function remove() {
    data.value = defaultValue
    localStorage.removeItem(key)
  }

  return { data, remove }
}
