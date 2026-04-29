<script setup lang="ts">
import { ref } from 'vue'
import { NSkeleton, NSpace, NSwitch, NCard } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const loading = ref(true)

const basicCode = `<NSkeleton text :repeat="3" />
<NSkeleton text style="width: 60%" />`

const shapeCode = `<NSkeleton :width="48" :height="48" circle />
<NSkeleton :width="200" :height="120" />`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Skeleton 骨架屏</h2>

    <CodePreview title="基础用法" description="文本骨架屏" :code="basicCode">
      <NSpace vertical :size="8" style="max-width: 400px">
        <NSkeleton text :repeat="3" />
        <NSkeleton text style="width: 60%" />
      </NSpace>
    </CodePreview>

    <CodePreview title="形状" description="支持圆形和矩形骨架" :code="shapeCode">
      <NSpace align="start">
        <NSkeleton :width="48" :height="48" circle />
        <NSpace vertical :size="8">
          <NSkeleton text style="width: 200px" />
          <NSkeleton text style="width: 150px" />
        </NSpace>
      </NSpace>
    </CodePreview>

    <CodePreview title="加载切换" description="切换加载状态展示骨架屏效果" :code="`<NSkeleton v-if='loading' />\n<div v-else>实际内容</div>`">
      <NSpace vertical :size="12">
        <NSwitch v-model:value="loading">
          <template #checked>加载中</template>
          <template #unchecked>已加载</template>
        </NSwitch>
        <NCard size="small" style="max-width: 400px">
          <template v-if="loading">
            <NSpace align="start">
              <NSkeleton :width="40" :height="40" circle />
              <NSpace vertical :size="8" style="flex: 1">
                <NSkeleton text style="width: 60%" />
                <NSkeleton text :repeat="2" />
              </NSpace>
            </NSpace>
          </template>
          <template v-else>
            <NSpace align="start">
              <div style="width: 40px; height: 40px; border-radius: 50%; background: #18a058; display: flex; align-items: center; justify-content: center; color: #fff">A</div>
              <div>
                <strong>Admin</strong>
                <p style="color: #666; margin: 4px 0 0">这是加载完成后显示的实际内容。骨架屏可以提升用户体验。</p>
              </div>
            </NSpace>
          </template>
        </NCard>
      </NSpace>
    </CodePreview>
  </div>
</template>
