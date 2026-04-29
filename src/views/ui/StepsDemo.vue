<script setup lang="ts">
import { ref } from 'vue'
import { NSteps, NStep, NButton, NSpace } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const current = ref(1)

const basicCode = `<NSteps :current="current">
  <NStep title="步骤一" description="填写信息" />
  <NStep title="步骤二" description="验证信息" />
  <NStep title="步骤三" description="完成" />
</NSteps>`

const verticalCode = `<NSteps :current="2" vertical>
  <NStep title="创建账户" description="注册新账户" />
  <NStep title="设置密码" description="设置安全密码" />
  <NStep title="完成注册" description="注册成功" />
</NSteps>`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Steps 步骤条</h2>

    <CodePreview title="基础用法" description="基础的步骤条，可通过按钮控制" :code="basicCode">
      <NSteps :current="current">
        <NStep title="填写信息" description="填写基本信息" />
        <NStep title="验证信息" description="验证填写的信息" />
        <NStep title="提交审核" description="提交等待审核" />
        <NStep title="完成" description="审核通过" />
      </NSteps>
      <NSpace style="margin-top: 16px">
        <NButton @click="current = Math.max(1, current - 1)">上一步</NButton>
        <NButton type="primary" @click="current = Math.min(5, current + 1)">下一步</NButton>
      </NSpace>
    </CodePreview>

    <CodePreview title="垂直步骤条" description="设置 vertical 属性使步骤条垂直显示" :code="verticalCode">
      <NSteps :current="2" vertical>
        <NStep title="创建账户" description="注册新账户并验证邮箱" />
        <NStep title="设置密码" description="设置安全的登录密码" />
        <NStep title="完善资料" description="填写个人基本信息" />
        <NStep title="完成注册" description="注册流程完成" />
      </NSteps>
    </CodePreview>
  </div>
</template>
