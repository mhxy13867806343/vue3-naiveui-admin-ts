/**
 * usePagination - 分页 Hook
 * 提供 page、pageSize、total、pageCount 响应式状态
 * pageCount 自动计算，page 超过 pageCount 时自动修正
 */
import { ref, computed, watch } from 'vue'

export interface UsePaginationOptions {
  defaultPage?: number
  defaultPageSize?: number
}

export function usePagination(options: UsePaginationOptions = {}) {
  const { defaultPage = 1, defaultPageSize = 10 } = options

  const page = ref(defaultPage)
  const pageSize = ref(defaultPageSize)
  const total = ref(0)

  const pageCount = computed(() => {
    return Math.max(1, Math.ceil(total.value / pageSize.value))
  })

  // 当 pageCount 变化时，自动修正 page
  watch(pageCount, (newPageCount) => {
    if (page.value > newPageCount) {
      page.value = newPageCount
    }
  })

  function onPageChange(newPage: number) {
    page.value = newPage
  }

  function onPageSizeChange(newSize: number) {
    pageSize.value = newSize
    // 切换 pageSize 后重置到第一页
    page.value = 1
  }

  return {
    page,
    pageSize,
    total,
    pageCount,
    onPageChange,
    onPageSizeChange,
  }
}
