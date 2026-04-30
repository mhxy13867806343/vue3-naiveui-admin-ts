<script setup lang="ts">
/**
 * useDebounceFn Hook 演示页面
 */
import { ref } from 'vue'
import { NButton, NAlert, NSpace, NInput, NTag } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'
import { useDebounceFn } from '@/composables/useDebounceFn'

const searchText = ref('')
const searchResult = ref('')
const callCount = ref(0)

function doSearch(text: string) {
  callCount.value++
  searchResult.value = `搜索 "${text}" (第 ${callCount.value} 次实际调用)`
}

const { debouncedFn, isPending, cancel } = useDebounceFn((text: string) => {
  doSearch(text)
}, 800)

function onInput(value: string) {
  searchText.value = value
  debouncedFn(value)
}

const code = `import { useDebounceFn } from '@/composables/useDebounceFn'

const { debouncedFn, isPending, cancel } = useDebounceFn((text: string) => {
  doSearch(text)
}, 800)

// debouncedFn(...args) - 防抖后的函数
// isPending.value - 是否有待执行的调用
// cancel() - 取消待执行的调用

// 连续输入时只在停止 800ms 后执行一次`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">useDebounceFn</h2>
    <CodePreview
      title="防抖函数"
      description="useDebounceFn 对函数进行防抖处理，连续调用只在最后一次调用后延迟执行"
      :code="code"
    >
      <NAlert type="info" title="说明" class="mb-4">
        在输入框中快速输入，搜索函数只会在停止输入 800ms 后执行一次。
      </NAlert>

      <NSpace vertical :size="16">
        <NSpace align="center">
          <NInput
            :value="searchText"
            placeholder="输入搜索关键词（800ms 防抖）"
            style="width: 320px"
            @update:value="onInput"
          />
          <NButton :disabled="!isPending" @click="cancel">取消</NButton>
        </NSpace>

        <NSpace align="center">
          <NTag :type="isPending ? 'warning' : 'default'">
            isPending: {{ isPending }}
          </NTag>
          <NTag type="info">
            实际调用次数: {{ callCount }}
          </NTag>
        </NSpace>

        <NAlert v-if="searchResult" type="success" :title="searchResult" />
      </NSpace>
    </CodePreview>
  </div>
</template>
