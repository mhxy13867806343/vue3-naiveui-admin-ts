/**
 * useSmsCountdown - 短信验证码倒计时 Hook
 * 优先使用 requestAnimationFrame 实现，不兼容时降级到 setInterval
 * 登录/注册页面共用
 */
import { ref, onUnmounted } from 'vue'

const hasRAF = typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function'

export function useSmsCountdown(seconds = 60) {
  const countdown = ref(0)
  let rafId: number | null = null
  let timerId: ReturnType<typeof setInterval> | null = null
  let startTime = 0

  /** RAF 方式：基于时间差计算，精度更高 */
  function tick() {
    const elapsed = Math.floor((Date.now() - startTime) / 1000)
    const remaining = seconds - elapsed

    if (remaining <= 0) {
      countdown.value = 0
      rafId = null
      return
    }

    countdown.value = remaining
    rafId = window.requestAnimationFrame(tick)
  }

  function startWithRAF() {
    startTime = Date.now()
    countdown.value = seconds
    rafId = window.requestAnimationFrame(tick)
  }

  /** setInterval 降级方式 */
  function startWithInterval() {
    countdown.value = seconds
    timerId = setInterval(() => {
      countdown.value--
      if (countdown.value <= 0) {
        stop()
      }
    }, 1000)
  }

  function stop() {
    if (rafId !== null) {
      window.cancelAnimationFrame(rafId)
      rafId = null
    }
    if (timerId !== null) {
      clearInterval(timerId)
      timerId = null
    }
  }

  function start() {
    if (countdown.value > 0) return
    stop()
    if (hasRAF) {
      startWithRAF()
    } else {
      startWithInterval()
    }
  }

  function reset() {
    stop()
    countdown.value = 0
  }

  // 组件卸载时自动清理
  onUnmounted(() => {
    stop()
  })

  return {
    countdown,
    start,
    reset,
  }
}
