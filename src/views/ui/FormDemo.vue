<script setup lang="ts">
import { ref } from 'vue'
import { NForm, NFormItem, NInput, NButton, NSelect, NSpace, NRadioGroup, NRadio, useMessage } from 'naive-ui'
import type { FormInst, FormRules } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const message = useMessage()
const formRef = ref<FormInst | null>(null)
const formValue = ref({ name: '', email: '', role: null as string | null, desc: '' })

const rules: FormRules = {
  name: { required: true, message: '请输入姓名', trigger: 'blur' },
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' },
  ],
  role: { required: true, message: '请选择角色', trigger: 'change' },
}

const roleOptions = [
  { label: '管理员', value: 'admin' },
  { label: '编辑', value: 'editor' },
  { label: '用户', value: 'user' },
]

function handleSubmit() {
  formRef.value?.validate((errors) => {
    if (!errors) { message.success('验证通过！') }
    else { message.error('请检查表单') }
  })
}

const labelPlacement = ref<'left' | 'top'>('left')

const basicCode = `const formRef = ref<FormInst | null>(null)
const formValue = ref({ name: '', email: '', role: null })

const rules: FormRules = {
  name: { required: true, message: '请输入姓名', trigger: 'blur' },
  email: [
    { required: true, message: '请输入邮箱' },
    { type: 'email', message: '邮箱格式不正确' },
  ],
}

<NForm ref="formRef" :model="formValue" :rules="rules" label-placement="left" label-width="80">
  <NFormItem label="姓名" path="name">
    <NInput v-model:value="formValue.name" />
  </NFormItem>
  <NFormItem label="邮箱" path="email">
    <NInput v-model:value="formValue.email" />
  </NFormItem>
</NForm>`

const layoutCode = `<NForm label-placement="left" label-width="80">
  <!-- 标签在左侧 -->
</NForm>

<NForm label-placement="top">
  <!-- 标签在顶部 -->
</NForm>`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Form 表单</h2>

    <CodePreview title="基础表单" description="带验证规则的表单，点击提交触发验证" :code="basicCode">
      <div style="max-width: 500px">
        <NForm ref="formRef" :model="formValue" :rules="rules" label-placement="left" label-width="80">
          <NFormItem label="姓名" path="name">
            <NInput v-model:value="formValue.name" placeholder="请输入姓名" />
          </NFormItem>
          <NFormItem label="邮箱" path="email">
            <NInput v-model:value="formValue.email" placeholder="请输入邮箱" />
          </NFormItem>
          <NFormItem label="角色" path="role">
            <NSelect v-model:value="formValue.role" :options="roleOptions" placeholder="请选择角色" />
          </NFormItem>
          <NFormItem label="描述">
            <NInput v-model:value="formValue.desc" type="textarea" placeholder="请输入描述（选填）" />
          </NFormItem>
          <NFormItem>
            <NSpace>
              <NButton type="primary" @click="handleSubmit">提交</NButton>
              <NButton @click="formRef?.restoreValidation()">重置</NButton>
            </NSpace>
          </NFormItem>
        </NForm>
      </div>
    </CodePreview>

    <CodePreview title="标签位置" description="表单标签支持 left 和 top 两种位置" :code="layoutCode">
      <NSpace style="margin-bottom: 12px">
        <NRadioGroup v-model:value="labelPlacement">
          <NRadio value="left">Left</NRadio>
          <NRadio value="top">Top</NRadio>
        </NRadioGroup>
      </NSpace>
      <div style="max-width: 500px">
        <NForm :label-placement="labelPlacement" label-width="80">
          <NFormItem label="用户名"><NInput placeholder="请输入" /></NFormItem>
          <NFormItem label="密码"><NInput type="password" placeholder="请输入" /></NFormItem>
        </NForm>
      </div>
    </CodePreview>
  </div>
</template>
