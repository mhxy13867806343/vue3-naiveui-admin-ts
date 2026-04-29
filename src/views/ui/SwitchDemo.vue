<script setup lang="ts">
import { ref } from 'vue'
import { NSwitch, NSpace } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const active = ref(false)
const loading = ref(true)

const basicCode = `<NSwitch v-model:value="active" />`
const sizeCode = `<NSwitch size="small" />\n<NSwitch size="medium" />\n<NSwitch size="large" />`
const customCode = `<NSwitch>\n  <template #checked>开</template>\n  <template #unchecked>关</template>\n</NSwitch>`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Switch 开关</h2>

    <CodePreview title="基础用法" description="基础的开关组件" :code="basicCode">
      <NSpace align="center">
        <NSwitch v-model:value="active" />
        <span>{{ active ? '开启' : '关闭' }}</span>
      </NSpace>
    </CodePreview>

    <CodePreview title="尺寸" description="开关有三种尺寸" :code="sizeCode">
      <NSpace align="center">
        <NSwitch size="small" default-value />
        <NSwitch size="medium" default-value />
        <NSwitch size="large" default-value />
      </NSpace>
    </CodePreview>

    <CodePreview title="自定义文字" description="通过插槽自定义开关文字" :code="customCode">
      <NSpace>
        <NSwitch default-value>
          <template #checked>开</template>
          <template #unchecked>关</template>
        </NSwitch>
        <NSwitch>
          <template #checked>✓</template>
          <template #unchecked>✗</template>
        </NSwitch>
      </NSpace>
    </CodePreview>

    <CodePreview title="加载和禁用" description="开关支持加载和禁用状态" :code="`<NSwitch loading />\n<NSwitch disabled />`">
      <NSpace align="center">
        <NSwitch :loading="loading" :value="true" />
        <NSwitch disabled />
        <NSwitch disabled :value="true" />
      </NSpace>
    </CodePreview>
  </div>
</template>
