/**
 * useThemeMode - 主题模式管理 Hook
 * 提供 themeMode 响应式状态、setThemeMode 切换方法和 naiveTheme 计算属性
 * 支持 'light' | 'dark' | 'system' 三种模式，持久化到 localStorage
 *
 * 使用全局单例模式，确保 App.vue 和 Header.vue 等多处调用共享同一份状态
 */
import { ref, computed, watch } from 'vue'
import { darkTheme } from 'naive-ui'
import type { GlobalTheme } from 'naive-ui'
import type { ThemeMode } from '@/types'

const STORAGE_KEY = 'themeMode'
const VALID_MODES: ThemeMode[] = ['light', 'dark', 'system']

function readStoredMode(): ThemeMode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && VALID_MODES.includes(stored as ThemeMode)) {
      return stored as ThemeMode
    }
  } catch {
    // localStorage unavailable (e.g. private browsing) — fall back silently
  }
  return 'light'
}

function persistMode(mode: ThemeMode): void {
  try {
    localStorage.setItem(STORAGE_KEY, mode)
  } catch {
    // localStorage unavailable — skip persistence
  }
}

function getSystemPrefersDark(): boolean {
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  } catch {
    return false
  }
}

function getMediaQuery(): MediaQueryList | null {
  try {
    return window.matchMedia('(prefers-color-scheme: dark)')
  } catch {
    return null
  }
}

// ---- 全局单例状态（模块级别，所有 useThemeMode() 调用共享） ----

const themeMode = ref<ThemeMode>(readStoredMode())
const systemPrefersDark = ref(getSystemPrefersDark())

let mediaQuery: MediaQueryList | null = null
let mediaHandler: ((e: MediaQueryListEvent) => void) | null = null
let initialized = false

function onMediaChange(e: MediaQueryListEvent) {
  systemPrefersDark.value = e.matches
}

function startListening() {
  stopListening()
  mediaQuery = getMediaQuery()
  if (mediaQuery) {
    mediaHandler = onMediaChange
    mediaQuery.addEventListener('change', mediaHandler)
  }
}

function stopListening() {
  if (mediaQuery && mediaHandler) {
    mediaQuery.removeEventListener('change', mediaHandler)
  }
  mediaQuery = null
  mediaHandler = null
}

function initWatcher() {
  if (initialized) return
  initialized = true

  // Manage matchMedia listener based on current themeMode
  watch(
    themeMode,
    (mode) => {
      if (mode === 'system') {
        systemPrefersDark.value = getSystemPrefersDark()
        startListening()
      } else {
        stopListening()
      }
    },
    { immediate: true },
  )
}

function setThemeMode(mode: ThemeMode) {
  themeMode.value = mode
  persistMode(mode)
}

const naiveTheme = computed<GlobalTheme | null>(() => {
  switch (themeMode.value) {
    case 'dark':
      return darkTheme
    case 'system':
      return systemPrefersDark.value ? darkTheme : null
    case 'light':
    default:
      return null
  }
})

export function useThemeMode() {
  initWatcher()

  return {
    themeMode,
    setThemeMode,
    naiveTheme,
  }
}
