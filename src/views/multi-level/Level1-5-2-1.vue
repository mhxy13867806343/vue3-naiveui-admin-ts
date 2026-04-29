<script setup lang="ts">
/**
 * 多级路由 1-5-2-1
 * Form + Upload + 多类型校验综合
 */
import { ref } from 'vue'
import {
  NCard, NForm, NFormItem, NInput, NSelect, NDatePicker, NUpload,
  NSwitch, NSpace, NButton, NBreadcrumb, NBreadcrumbItem, NDivider,
  type FormInst, type FormRules, type UploadFileInfo, useMessage,
} from 'naive-ui'

const message = useMessage()
const formRef = ref<FormInst | null>(null)

const model = ref({
  title: '',
  category: null as string | null,
  publishAt: null as number | null,
  files: [] as UploadFileInfo[],
  publish: false,
  summary: '',
})

const rules: FormRules = {
  title: { required: true, min: 2, max: 40, message: '标题 2-40 字', trigger: ['blur', 'input'] },
  category: { required: true, message: '请选择分类', trigger: 'change' },
  publishAt: { type: 'number', required: true, message: '请选择发布时间', trigger: 'change' },
  summary: { required: true, message: '请输入摘要', trigger: 'blur' },
}

const categoryOptions = [
  { label: '新闻', value: 'news' },
  { label: '教程', value: 'tutorial' },
  { label: '公告', value: 'announce' },
]

function submit() {
  formRef.value?.validate((errors) => {
    if (errors) {
      message.error('请检查表单')
      return
    }
    if (model.value.files.length === 0) {
      message.warning('未上传附件，已使用默认占位')
    }
    message.success('提交成功')
  })
}

function reset() {
  model.value = { title: '', category: null, publishAt: null, files: [], publish: false, summary: '' }
  formRef.value?.restoreValidation()
}
</script>

<template>
  <div class="p-4">
    <NBreadcrumb>
      <NBreadcrumbItem>多级路由</NBreadcrumbItem>
      <NBreadcrumbItem>1-5</NBreadcrumbItem>
      <NBreadcrumbItem>1-5-2</NBreadcrumbItem>
      <NBreadcrumbItem>1-5-2-1</NBreadcrumbItem>
    </NBreadcrumb>
    <NDivider />
    <NCard title="1-5-2-1 · 综合表单（Form + Upload + 校验）" size="small">
      <NForm
        ref="formRef"
        :model="model"
        :rules="rules"
        label-placement="left"
        label-width="100"
        style="max-width: 640px"
      >
        <NFormItem label="标题" path="title">
          <NInput v-model:value="model.title" placeholder="请输入标题" />
        </NFormItem>
        <NFormItem label="分类" path="category">
          <NSelect v-model:value="model.category" :options="categoryOptions" placeholder="请选择" />
        </NFormItem>
        <NFormItem label="发布时间" path="publishAt">
          <NDatePicker v-model:value="model.publishAt" type="datetime" clearable />
        </NFormItem>
        <NFormItem label="附件">
          <NUpload
            v-model:file-list="model.files"
            :max="3"
            multiple
            :default-upload="false"
          >
            <NButton>选择文件（最多 3 个）</NButton>
          </NUpload>
        </NFormItem>
        <NFormItem label="立即发布">
          <NSwitch v-model:value="model.publish" />
        </NFormItem>
        <NFormItem label="摘要" path="summary">
          <NInput v-model:value="model.summary" type="textarea" :rows="3" />
        </NFormItem>
        <NFormItem :show-label="false">
          <NSpace>
            <NButton type="primary" @click="submit">提交</NButton>
            <NButton @click="reset">重置</NButton>
          </NSpace>
        </NFormItem>
      </NForm>
    </NCard>
  </div>
</template>
