<script setup lang="ts">
/**
 * useSmsCountdown Hook 演示页面
 */
import { NButton, NAlert, NSpace, NTag } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'
import { useSmsCountdown } from '@/composables/useSmsCountdown'

const { countdown, start, reset } = useSmsCountdown(10)

const code = `import { useSmsCountdown } from '@/composables/useSmsCountdown'

const { countdown, start, reset } = useSmsCountdown(10)

// start() - 开始倒计时（倒计时中调用无效）
// reset() - 重置倒计时
// countdown.value - 当前剩余秒数（0 表示未开始或已结束）

// 优先使用 requestAnimationFrame，不兼容时降级到 setInterval
// 组件卸载时自动清理定时器`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">useSmsCountdown</h2>
    <CodePreview
      title="短信验证码倒计时"
      description="useSmsCountdown 使用 requestAnimationFrame 实现高精度倒计时，自动清理"
      :code="code"
    >
      <NAlert type="info" title="说明" class="mb-4">
        演示使用 10 秒倒计时。点击"发送验证码"开始倒计时，倒计时期间按钮禁用。
      </NAlert>

      <NSpace vertical :size="16">
        <NSpace align="center">
          <NButton
            type="primary"
            :disabled="countdown > 0"
            @click="start"
          >
            {{ countdown > 0 ? `${countdown}秒后重发` : '发送验证码' }}
          </NButton>
          <NButton :disabled="countdown === 0" @click="reset">
            重置
          </NButton>
        </NSpace>

        <NSpace align="center">
          <NTag :type="countdown > 0 ? 'warning' : 'success'">
            状态: {{ countdown > 0 ? '倒计时中' : '就绪' }}
          </NTag>
          <NTag type="info">
            剩余: {{ countdown }}s
          </NTag>
        </NSpace>
      </NSpace>
    </CodePreview>
  </div>
</template>
