<script setup lang="ts">
import { NDivider, NSpace } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const basicCode = `<p>上方内容</p>
<NDivider />
<p>下方内容</p>`

const textCode = `<NDivider>分割文字</NDivider>
<NDivider title-placement="left">左侧文字</NDivider>
<NDivider title-placement="right">右侧文字</NDivider>`

const verticalCode = `<span>文本</span>
<NDivider vertical />
<span>文本</span>`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Divider 分割线</h2>

    <CodePreview title="水平分割线" description="默认的水平分割线" :code="basicCode">
      <p>这是上方的内容区域。</p>
      <NDivider />
      <p>这是下方的内容区域。</p>
    </CodePreview>

    <CodePreview title="带文字" description="分割线中间可以添加文字" :code="textCode">
      <NDivider>居中文字</NDivider>
      <NDivider title-placement="left">左侧文字</NDivider>
      <NDivider title-placement="right">右侧文字</NDivider>
    </CodePreview>

    <CodePreview title="垂直分割线" description="设置 vertical 属性使用垂直分割线" :code="verticalCode">
      <span>首页</span>
      <NDivider vertical />
      <span>文档</span>
      <NDivider vertical />
      <span>关于</span>
      <NDivider vertical />
      <span>联系我们</span>
    </CodePreview>
  </div>
</template>
