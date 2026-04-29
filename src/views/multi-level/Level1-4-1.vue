<script setup lang="ts">
/**
 * 多级路由 1-4-1
 * Form 表单基础：双向绑定 + 校验
 */
import { ref } from 'vue'
import {
  NCard, NForm, NFormItem, NInput, NInputNumber, NSelect, NSwitch,
  NButton, NSpace, NBreadcrumb, NBreadcrumbItem, NDivider,
  type FormInst, type FormRules, useMessage,
} from 'naive-ui'

const message = useMessage()
const formRef = ref<FormInst | null>(null)
const model = ref({
  username: '',
  age: null as number | null,
  role: null as string | null,
  active: true,
})
const rules: FormRules = {
  username: { required: true, message: '请输入用户名', trigger: 'blur' },
  age: { type: 'number', required: true, message: '请输入年龄', trigger: 'change' },
  role: { required: true, message: '请选择角色', trigger: 'change' },
}
const roleOptions = [
  { label: '管理员', value: 'admin' },
  { label: '编辑', value: 'editor' },
  { label: '访客', value: 'guest' },
]

function submit() {
  formRef.value?.validate((errors) => {
    if (errors) {
      message.error('请检查表单')
      return
    }
    message.success('提交成功')
  })
}
</script>

<template>
  <div class="p-4">
    <NBreadcrumb>
      <NBreadcrumbItem>多级路由</NBreadcrumbItem>
      <NBreadcrumbItem>1-4</NBreadcrumbItem>
      <NBreadcrumbItem>1-4-1</NBreadcrumbItem>
    </NBreadcrumb>
    <NDivider />
    <NCard title="1-4-1 · Form 表单基础（含校验）" size="small">
      <NForm
        ref="formRef"
        :model="model"
        :rules="rules"
        label-placement="left"
        label-width="100"
        style="max-width: 520px"
      >
        <NFormItem label="用户名" path="username">
          <NInput v-model:value="model.username" placeholder="请输入用户名" />
        </NFormItem>
        <NFormItem label="年龄" path="age">
          <NInputNumber v-model:value="model.age" :min="1" :max="120" placeholder="年龄" />
        </NFormItem>
        <NFormItem label="角色" path="role">
          <NSelect v-model:value="model.role" :options="roleOptions" placeholder="请选择" />
        </NFormItem>
        <NFormItem label="启用">
          <NSwitch v-model:value="model.active" />
        </NFormItem>
        <NFormItem :show-label="false">
          <NSpace>
            <NButton type="primary" @click="submit">提交</NButton>
            <NButton @click="formRef?.restoreValidation()">重置校验</NButton>
          </NSpace>
        </NFormItem>
      </NForm>
    </NCard>
  </div>
</template>
