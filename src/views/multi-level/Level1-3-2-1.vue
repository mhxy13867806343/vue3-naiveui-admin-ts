<script setup lang="ts">
/**
 * 多级路由 1-3-2-1
 * Modal + Drawer 组合：模态框打开抽屉做二级编辑
 */
import { ref } from 'vue'
import {
  NCard, NSpace, NButton, NModal, NDrawer, NDrawerContent,
  NForm, NFormItem, NInput, NBreadcrumb, NBreadcrumbItem, NDivider,
  useMessage,
} from 'naive-ui'

const showModal = ref(false)
const showDrawer = ref(false)
const message = useMessage()

const form = ref({ name: '', desc: '' })

function openDrawer() {
  showDrawer.value = true
}
function saveAll() {
  message.success(`已保存：${form.value.name || '未命名'}`)
  showDrawer.value = false
  showModal.value = false
}
</script>

<template>
  <div class="p-4">
    <NBreadcrumb>
      <NBreadcrumbItem>多级路由</NBreadcrumbItem>
      <NBreadcrumbItem>1-3</NBreadcrumbItem>
      <NBreadcrumbItem>1-3-2</NBreadcrumbItem>
      <NBreadcrumbItem>1-3-2-1</NBreadcrumbItem>
    </NBreadcrumb>
    <NDivider />
    <NCard title="1-3-2-1 · Modal + Drawer 组合" size="small">
      <NSpace>
        <NButton type="primary" @click="showModal = true">打开模态框</NButton>
      </NSpace>
    </NCard>

    <NModal v-model:show="showModal" preset="card" title="一级：选择操作" style="width: 480px">
      <NSpace vertical>
        <p>这是一个层叠操作示例：在模态框内继续打开抽屉做详细编辑。</p>
        <NSpace>
          <NButton type="primary" @click="openDrawer">编辑详情</NButton>
          <NButton @click="showModal = false">取消</NButton>
        </NSpace>
      </NSpace>
    </NModal>

    <NDrawer v-model:show="showDrawer" :width="420" placement="right">
      <NDrawerContent title="二级：编辑详情" closable>
        <NForm label-placement="left" label-width="80">
          <NFormItem label="名称">
            <NInput v-model:value="form.name" placeholder="请输入名称" />
          </NFormItem>
          <NFormItem label="说明">
            <NInput v-model:value="form.desc" type="textarea" :rows="4" />
          </NFormItem>
        </NForm>
        <template #footer>
          <NSpace>
            <NButton @click="showDrawer = false">取消</NButton>
            <NButton type="primary" @click="saveAll">保存</NButton>
          </NSpace>
        </template>
      </NDrawerContent>
    </NDrawer>
  </div>
</template>
