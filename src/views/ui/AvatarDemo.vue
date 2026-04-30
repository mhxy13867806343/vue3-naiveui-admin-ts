<script setup lang="ts">
import { NAvatar, NAvatarGroup, NSpace } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

// 注：NAvatarGroup 的 AvatarGroupOption 官方仅含 src，这里通过 any 扩展 name + style，
// 用于演示纯色字母头像（实际项目通常传 src）
const avatarOptions = [
  { name: 'A', style: { background: '#18a058' } },
  { name: 'B', style: { background: '#2080f0' } },
  { name: 'C', style: { background: '#f0a020' } },
  { name: 'D', style: { background: '#d03050' } },
  { name: 'E', style: { background: '#8a2be2' } },
] as never[]

const basicCode = `<NAvatar round size="small">A</NAvatar>
<NAvatar round size="medium">B</NAvatar>
<NAvatar round size="large">C</NAvatar>`

const shapeCode = `<NAvatar round>圆</NAvatar>
<NAvatar>方</NAvatar>`

const groupCode = `<NAvatarGroup :options="avatars" :size="40" :max="3" />`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Avatar 头像</h2>

    <CodePreview title="尺寸" description="头像有 small、medium、large 三种尺寸" :code="basicCode">
      <NSpace align="center">
        <NAvatar round size="small" style="background: #18a058">S</NAvatar>
        <NAvatar round size="medium" style="background: #2080f0">M</NAvatar>
        <NAvatar round size="large" style="background: #f0a020">L</NAvatar>
        <NAvatar round :size="60" style="background: #d03050">XL</NAvatar>
      </NSpace>
    </CodePreview>

    <CodePreview title="形状" description="头像支持圆形和方形" :code="shapeCode">
      <NSpace align="center">
        <NAvatar round style="background: #18a058">圆</NAvatar>
        <NAvatar style="background: #2080f0">方</NAvatar>
      </NSpace>
    </CodePreview>

    <CodePreview title="头像组" description="使用 NAvatarGroup 展示头像组" :code="groupCode">
      <NAvatarGroup :options="avatarOptions" :size="40" :max="4" />
    </CodePreview>
  </div>
</template>
