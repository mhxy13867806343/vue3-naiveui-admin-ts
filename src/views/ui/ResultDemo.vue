<script setup lang="ts">
import { NResult, NButton, NGrid, NGridItem, NCard } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const basicCode = `<NResult status="success" title="操作成功" description="您的提交已成功处理">
  <template #footer><NButton type="primary">返回首页</NButton></template>
</NResult>`

const errorCode = `<NResult status="error" title="提交失败" description="请检查后重试">
  <template #footer><NButton>重试</NButton></template>
</NResult>`

const httpCode = `<NResult status="404" title="404" description="页面不存在" />`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Result 结果</h2>

    <CodePreview title="基础用法" description="展示操作结果的四种状态" :code="basicCode">
      <NGrid :cols="2" :x-gap="16" :y-gap="16">
        <NGridItem>
          <NCard size="small">
            <NResult status="success" title="操作成功" description="您的提交已成功处理" size="small">
              <template #footer><NButton type="primary" size="small">返回</NButton></template>
            </NResult>
          </NCard>
        </NGridItem>
        <NGridItem>
          <NCard size="small">
            <NResult status="error" title="提交失败" description="请检查后重试" size="small">
              <template #footer><NButton size="small">重试</NButton></template>
            </NResult>
          </NCard>
        </NGridItem>
        <NGridItem>
          <NCard size="small">
            <NResult status="warning" title="警告" description="操作存在风险" size="small" />
          </NCard>
        </NGridItem>
        <NGridItem>
          <NCard size="small">
            <NResult status="info" title="提示" description="这是一条提示信息" size="small" />
          </NCard>
        </NGridItem>
      </NGrid>
    </CodePreview>

    <CodePreview title="HTTP 状态" description="展示 404、500 等 HTTP 错误状态" :code="httpCode">
      <NGrid :cols="2" :x-gap="16">
        <NGridItem>
          <NCard size="small">
            <NResult status="404" title="404" description="页面不存在" size="small" />
          </NCard>
        </NGridItem>
        <NGridItem>
          <NCard size="small">
            <NResult status="500" title="500" description="服务器错误" size="small" />
          </NCard>
        </NGridItem>
      </NGrid>
    </CodePreview>
  </div>
</template>
