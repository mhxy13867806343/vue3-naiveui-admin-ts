<script setup lang="ts">
import { ref, computed } from 'vue'
import { chunk, groupBy, uniq, sortBy, debounce, cloneDeep, flatten, pick } from 'lodash-es'
import { NCard, NAlert, NInput } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

// chunk 示例
const chunkResult = computed(() => JSON.stringify(chunk([1, 2, 3, 4, 5, 6, 7, 8], 3)))

// groupBy 示例
const users = [
  { name: '张三', dept: '技术部' },
  { name: '李四', dept: '产品部' },
  { name: '王五', dept: '技术部' },
  { name: '赵六', dept: '产品部' },
  { name: '孙七', dept: '设计部' },
]
const groupByResult = computed(() => JSON.stringify(groupBy(users, 'dept'), null, 2))

// uniq 示例
const uniqResult = computed(() => JSON.stringify(uniq([1, 2, 2, 3, 4, 4, 5])))

// sortBy 示例
const sortByResult = computed(() =>
  JSON.stringify(sortBy([{ n: 'b', a: 2 }, { n: 'a', a: 3 }, { n: 'c', a: 1 }], ['a']))
)

// flatten 示例
const flattenResult = computed(() => JSON.stringify(flatten([[1, 2], [3, [4]], 5])))

// pick 示例
const pickResult = computed(() =>
  JSON.stringify(pick({ name: '张三', age: 25, dept: '技术部', role: 'dev' }, ['name', 'dept']))
)

// cloneDeep 示例
const original = { a: 1, b: { c: 2 } }
const cloned = cloneDeep(original)
cloned.b.c = 999
const cloneDeepResult = computed(() =>
  `original.b.c = ${original.b.c}, cloned.b.c = ${cloned.b.c}`
)

// debounce 示例
const debounceInput = ref('')
const debounceOutput = ref('')
const debouncedFn = debounce((val: string) => {
  debounceOutput.value = `处理: "${val}" (${new Date().toLocaleTimeString()})`
}, 500)

function handleInput(val: string) {
  debounceInput.value = val
  debouncedFn(val)
}

const examples = computed(() => [
  { label: 'chunk([1..8], 3)', value: chunkResult.value },
  { label: 'uniq([1,2,2,3,4,4,5])', value: uniqResult.value },
  { label: 'flatten([[1,2],[3,[4]],5])', value: flattenResult.value },
  { label: "sortBy(arr, ['a'])", value: sortByResult.value },
  { label: "pick(obj, ['name','dept'])", value: pickResult.value },
  { label: 'cloneDeep 深拷贝', value: cloneDeepResult.value },
])

const code = `import { chunk, groupBy, uniq, sortBy, debounce, cloneDeep, flatten, pick } from 'lodash-es'

// chunk - 数组分块
chunk([1, 2, 3, 4, 5, 6, 7, 8], 3)
// => [[1,2,3], [4,5,6], [7,8]]

// uniq - 数组去重
uniq([1, 2, 2, 3, 4, 4, 5])
// => [1, 2, 3, 4, 5]

// groupBy - 分组
groupBy(users, 'dept')
// => { '技术部': [...], '产品部': [...] }

// sortBy - 排序
sortBy([{ n: 'b', a: 2 }, { n: 'a', a: 3 }], ['a'])

// flatten - 扁平化
flatten([[1, 2], [3, [4]], 5])

// pick - 选取属性
pick({ name: '张三', age: 25, dept: '技术部' }, ['name', 'dept'])

// cloneDeep - 深拷贝
const cloned = cloneDeep(original)

// debounce - 防抖
const debouncedFn = debounce((val) => {
  console.log(val)
}, 500)`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">lodash 工具函数</h2>
    <CodePreview title="lodash-es 工具函数" description="lodash-es 是 lodash 的 ES Module 版本，支持 tree-shaking，按需引入函数" :code="code">
      <NAlert type="info" title="说明" class="mb-4">
        lodash-es 是 lodash 的 ES Module 版本，支持 tree-shaking，按需引入函数。
      </NAlert>

      <NCard title="常用函数示例" class="mb-4">
        <div class="space-y-3">
          <div
            v-for="item in examples"
            :key="item.label"
            class="py-2 border-b border-gray-100 last:border-0"
          >
            <div class="text-sm text-gray-600 mb-1">{{ item.label }}</div>
            <code class="text-xs bg-gray-100 px-2 py-1 rounded block break-all">{{ item.value }}</code>
          </div>
        </div>
      </NCard>

      <NCard title="groupBy 分组" class="mb-4">
        <pre class="text-xs bg-gray-100 p-3 rounded overflow-auto">{{ groupByResult }}</pre>
      </NCard>

      <NCard title="debounce 防抖 (500ms)">
        <NInput :value="debounceInput" @update:value="handleInput" placeholder="输入文字试试防抖效果..." />
        <p class="mt-2 text-sm text-gray-500">{{ debounceOutput || '等待输入...' }}</p>
      </NCard>
    </CodePreview>
  </div>
</template>
