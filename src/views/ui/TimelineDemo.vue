<script setup lang="ts">
import { NTimeline, NTimelineItem } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const basicCode = `<NTimeline>
  <NTimelineItem type="success" title="创建项目" content="项目初始化完成" time="2024-01-01" />
  <NTimelineItem type="info" title="开发中" content="功能开发进行中" time="2024-01-10" />
  <NTimelineItem type="warning" title="测试" content="进入测试阶段" time="2024-01-15" />
</NTimeline>`

const customCode = `<NTimelineItem title="自定义内容">
  <template #icon>🚀</template>
  <p>支持自定义图标和内容</p>
</NTimelineItem>`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Timeline 时间线</h2>

    <CodePreview title="基础用法" description="基础的时间线展示" :code="basicCode">
      <NTimeline>
        <NTimelineItem type="success" title="项目创建" content="项目初始化完成，搭建基础架构" time="2024-01-01 09:00" />
        <NTimelineItem type="info" title="需求评审" content="完成第一轮需求评审" time="2024-01-05 14:00" />
        <NTimelineItem type="warning" title="开发中" content="核心功能开发进行中" time="2024-01-10 10:00" />
        <NTimelineItem type="error" title="Bug 修复" content="修复了 3 个关键 Bug" time="2024-01-12 16:00" />
        <NTimelineItem type="success" title="发布上线" content="v1.0.0 正式发布" time="2024-01-15 18:00" />
      </NTimeline>
    </CodePreview>

    <CodePreview title="自定义内容" description="时间线支持自定义图标和丰富内容" :code="customCode">
      <NTimeline>
        <NTimelineItem title="🚀 项目启动" content="团队组建完成，项目正式启动" time="第一周" />
        <NTimelineItem title="📋 需求分析" content="完成需求文档编写和评审" time="第二周" />
        <NTimelineItem title="💻 编码实现" content="完成核心模块开发" time="第三周" />
        <NTimelineItem title="🧪 测试验收" content="通过所有测试用例" time="第四周" />
      </NTimeline>
    </CodePreview>
  </div>
</template>
