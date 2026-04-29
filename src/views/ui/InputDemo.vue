<script setup lang="ts">
import { ref } from 'vue'
import { NInput, NSpace, NGrid, NGridItem } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const text = ref('')
const password = ref('')
const textarea = ref('')
const clearable = ref('可清除内容')

const basicCode = `<NInput v-model:value="text" placeholder="请输入" />
<NInput v-model:value="password" type="password" placeholder="请输入密码" show-password-on="click" />
<NInput v-model:value="textarea" type="textarea" placeholder="请输入" :rows="3" />`

const prefixCode = `<NInput placeholder="请输入">
  <template #prefix>🔍</template>
</NInput>
<NInput placeholder="请输入金额">
  <template #prefix>¥</template>
  <template #suffix>.00</template>
</NInput>`

const sizeCode = `<NInput size="small" placeholder="Small" />
<NInput size="medium" placeholder="Medium" />
<NInput size="large" placeholder="Large" />`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Input 输入框</h2>

    <CodePreview title="基础用法" description="包括文本输入、密码输入和文本域" :code="basicCode">
      <NSpace vertical :size="12" style="max-width: 400px">
        <NInput v-model:value="text" placeholder="请输入文本" />
        <NInput v-model:value="password" type="password" placeholder="请输入密码" show-password-on="click" />
        <NInput v-model:value="textarea" type="textarea" placeholder="请输入多行文本" :rows="3" />
      </NSpace>
    </CodePreview>

    <CodePreview title="前缀和后缀" description="通过 prefix 和 suffix 插槽添加前后缀" :code="prefixCode">
      <NSpace vertical :size="12" style="max-width: 400px">
        <NInput placeholder="搜索...">
          <template #prefix>🔍</template>
        </NInput>
        <NInput placeholder="请输入金额">
          <template #prefix>¥</template>
          <template #suffix>.00</template>
        </NInput>
        <NInput placeholder="请输入网址">
          <template #prefix>https://</template>
          <template #suffix>.com</template>
        </NInput>
      </NSpace>
    </CodePreview>

    <CodePreview title="可清除 & 尺寸" description="设置 clearable 可清除内容，支持 small/medium/large 尺寸" :code="sizeCode">
      <NSpace vertical :size="12" style="max-width: 400px">
        <NInput v-model:value="clearable" clearable placeholder="可清除" />
        <NInput size="small" placeholder="Small" />
        <NInput size="medium" placeholder="Medium" />
        <NInput size="large" placeholder="Large" />
      </NSpace>
    </CodePreview>

    <CodePreview title="禁用和只读" description="输入框可以被禁用或设为只读" :code="`<NInput disabled value='禁用' />\n<NInput readonly value='只读' />`">
      <NSpace vertical :size="12" style="max-width: 400px">
        <NInput disabled value="禁用状态" />
        <NInput readonly value="只读状态" />
      </NSpace>
    </CodePreview>
  </div>
</template>
