<script setup lang="ts">
import { ref } from 'vue'
import { NButton, NModal, NSpace, NCard, NInput } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const showBasic = ref(false)
const showCard = ref(false)
const showPreset = ref(false)

const basicCode = `const show = ref(false)

<NButton @click="show = true">打开模态框</NButton>
<NModal v-model:show="show" title="基础模态框" preset="dialog">
  <p>这是模态框内容</p>
</NModal>`

const cardCode = `<NModal v-model:show="show" preset="card" title="卡片模态框" style="width: 500px">
  <p>卡片样式的模态框</p>
</NModal>`

const confirmCode = `<NModal v-model:show="show" preset="dialog" type="warning" title="确认" content="确定要执行此操作吗？" positive-text="确定" negative-text="取消" />`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Modal 模态框</h2>

    <CodePreview title="基础用法" description="基础的对话框模态框" :code="basicCode">
      <NButton type="primary" @click="showBasic = true">打开模态框</NButton>
      <NModal v-model:show="showBasic" preset="dialog" title="基础模态框">
        <p>这是一个基础的模态框内容。你可以在这里放置任何内容。</p>
      </NModal>
    </CodePreview>

    <CodePreview title="卡片模态框" description="使用 preset='card' 展示卡片样式" :code="cardCode">
      <NButton type="info" @click="showCard = true">卡片模态框</NButton>
      <NModal v-model:show="showCard" preset="card" title="编辑用户信息" style="width: 500px">
        <NSpace vertical :size="12">
          <NInput placeholder="用户名" />
          <NInput placeholder="邮箱" />
          <NInput type="textarea" placeholder="备注" />
        </NSpace>
        <template #footer>
          <NSpace justify="end">
            <NButton @click="showCard = false">取消</NButton>
            <NButton type="primary" @click="showCard = false">保存</NButton>
          </NSpace>
        </template>
      </NModal>
    </CodePreview>

    <CodePreview title="确认对话框" description="使用 preset='dialog' 和 type 属性创建确认框" :code="confirmCode">
      <NButton type="warning" @click="showPreset = true">确认操作</NButton>
      <NModal v-model:show="showPreset" preset="dialog" type="warning" title="确认" content="确定要执行此操作吗？此操作不可撤销。" positive-text="确定" negative-text="取消" @positive-click="showPreset = false" @negative-click="showPreset = false" />
    </CodePreview>
  </div>
</template>
