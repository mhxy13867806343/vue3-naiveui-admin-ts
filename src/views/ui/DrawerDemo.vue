<script setup lang="ts">
import { ref } from 'vue'
import { NButton, NDrawer, NDrawerContent, NSpace, NInput, NRadioGroup, NRadio } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const showBasic = ref(false)
const showPlacement = ref(false)
const placement = ref<'left' | 'right' | 'top' | 'bottom'>('right')

const basicCode = `const show = ref(false)

<NButton @click="show = true">打开抽屉</NButton>
<NDrawer v-model:show="show" :width="400">
  <NDrawerContent title="抽屉标题">
    <p>抽屉内容</p>
  </NDrawerContent>
</NDrawer>`

const placementCode = `<NDrawer v-model:show="show" :placement="placement" :width="400" :height="300">
  <NDrawerContent title="抽屉">内容</NDrawerContent>
</NDrawer>`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Drawer 抽屉</h2>

    <CodePreview title="基础用法" description="从侧边滑出的面板" :code="basicCode">
      <NButton type="primary" @click="showBasic = true">打开抽屉</NButton>
      <NDrawer v-model:show="showBasic" :width="400">
        <NDrawerContent title="用户详情" closable>
          <NSpace vertical :size="12">
            <NInput placeholder="用户名" value="admin" />
            <NInput placeholder="邮箱" value="admin@example.com" />
            <NInput type="textarea" placeholder="备注" :rows="4" />
          </NSpace>
          <template #footer>
            <NSpace>
              <NButton type="primary" @click="showBasic = false">保存</NButton>
              <NButton @click="showBasic = false">取消</NButton>
            </NSpace>
          </template>
        </NDrawerContent>
      </NDrawer>
    </CodePreview>

    <CodePreview title="弹出位置" description="抽屉支持 left、right、top、bottom 四个方向" :code="placementCode">
      <NSpace vertical :size="12">
        <NRadioGroup v-model:value="placement">
          <NRadio value="left">Left</NRadio>
          <NRadio value="right">Right</NRadio>
          <NRadio value="top">Top</NRadio>
          <NRadio value="bottom">Bottom</NRadio>
        </NRadioGroup>
        <NButton type="info" @click="showPlacement = true">打开 {{ placement }} 抽屉</NButton>
      </NSpace>
      <NDrawer v-model:show="showPlacement" :placement="placement" :width="350" :height="250">
        <NDrawerContent :title="`${placement} 方向抽屉`" closable>
          <p>这是从 {{ placement }} 方向弹出的抽屉。</p>
        </NDrawerContent>
      </NDrawer>
    </CodePreview>
  </div>
</template>
