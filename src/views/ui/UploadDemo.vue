<script setup lang="ts">
import { NUpload, NButton, NSpace } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const basicCode = `<NUpload action="https://httpbin.org/post" :max="3">
  <NButton>上传文件</NButton>
</NUpload>`

const dragCode = `<NUpload action="https://httpbin.org/post" directory-dnd>
  拖拽文件到此处上传
</NUpload>`

const imageCode = `<NUpload action="https://httpbin.org/post" list-type="image-card" />`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Upload 上传</h2>

    <CodePreview title="基础上传" description="点击按钮选择文件上传" :code="basicCode">
      <NUpload action="https://httpbin.org/post" :max="3">
        <NButton type="primary">📁 选择文件</NButton>
      </NUpload>
    </CodePreview>

    <CodePreview title="拖拽上传" description="支持拖拽文件到区域上传" :code="dragCode">
      <NUpload action="https://httpbin.org/post" directory-dnd multiple>
        <div style="padding: 40px; border: 2px dashed #d9d9d9; border-radius: 8px; text-align: center; cursor: pointer">
          <p style="font-size: 16px">📂 拖拽文件到此处</p>
          <p style="color: #999; font-size: 13px">或点击选择文件</p>
        </div>
      </NUpload>
    </CodePreview>

    <CodePreview title="图片列表" description="使用 list-type='image-card' 展示图片预览" :code="imageCode">
      <NUpload action="https://httpbin.org/post" list-type="image-card" :max="5" />
    </CodePreview>
  </div>
</template>
