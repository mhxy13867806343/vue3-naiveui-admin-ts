<script setup lang="ts">
/**
 * 工作台页面
 * 欢迎卡片 + 统计卡片 + 快捷操作 + 最近活动 + 待办事项 + 项目进度
 */
import { ref } from 'vue'
import {
  NCard, NGrid, NGridItem, NButton, NSpace, NTimeline, NTimelineItem,
  NCheckbox, NProgress, NAvatar, NTag, NStatistic,
} from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const username = ref('Admin')

const todos = ref([
  { id: 1, text: '完成项目需求文档', done: true },
  { id: 2, text: '评审 UI 设计稿', done: true },
  { id: 3, text: '开发用户管理模块', done: false },
  { id: 4, text: '编写单元测试', done: false },
  { id: 5, text: '部署测试环境', done: false },
])

const projects = [
  { name: 'Admin Dashboard', progress: 72, status: 'success' as const },
  { name: 'API Gateway', progress: 45, status: 'warning' as const },
  { name: 'Mobile App', progress: 90, status: 'success' as const },
  { name: 'Data Pipeline', progress: 30, status: 'default' as const },
]

const statsCode = `<NGrid :cols="4" :x-gap="16">
  <NGridItem>
    <NCard>
      <NStatistic label="项目数" :value="12" />
    </NCard>
  </NGridItem>
  <!-- ... -->
</NGrid>`

const welcomeCode = `<NCard>
  <template #header>
    <NSpace align="center">
      <NAvatar round size="large">A</NAvatar>
      <div>
        <h3>欢迎回来，Admin</h3>
        <p>今天是个好日子，开始工作吧！</p>
      </div>
    </NSpace>
  </template>
  <NSpace>
    <NButton type="primary">创建项目</NButton>
    <NButton>查看报表</NButton>
  </NSpace>
</NCard>`

const activityCode = `<NTimeline>
  <NTimelineItem
    type="success"
    title="项目部署成功"
    content="Admin Dashboard v1.2.0 已部署到生产环境"
    time="2024-01-15 14:30"
  />
</NTimeline>`

const todoCode = `const todos = ref([
  { id: 1, text: '完成项目需求文档', done: true },
  { id: 2, text: '评审 UI 设计稿', done: false },
])

<NCheckbox v-model:checked="todo.done">{{ todo.text }}</NCheckbox>`

const progressCode = `<NCard title="Admin Dashboard">
  <NProgress type="line" :percentage="72" status="success" />
</NCard>`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">工作台 Workspace</h2>

    <!-- Statistics Cards -->
    <CodePreview title="统计概览" description="使用 NStatistic 展示关键业务指标" :code="statsCode">
      <NGrid :cols="4" :x-gap="16" :y-gap="16" responsive="screen" item-responsive>
        <NGridItem span="4 m:1">
          <NCard>
            <NStatistic label="项目数" :value="12">
              <template #prefix>📁</template>
            </NStatistic>
          </NCard>
        </NGridItem>
        <NGridItem span="4 m:1">
          <NCard>
            <NStatistic label="待办任务" :value="8">
              <template #prefix>📝</template>
            </NStatistic>
          </NCard>
        </NGridItem>
        <NGridItem span="4 m:1">
          <NCard>
            <NStatistic label="团队成员" :value="36">
              <template #prefix>👥</template>
            </NStatistic>
          </NCard>
        </NGridItem>
        <NGridItem span="4 m:1">
          <NCard>
            <NStatistic label="消息通知" :value="5">
              <template #prefix>🔔</template>
            </NStatistic>
          </NCard>
        </NGridItem>
      </NGrid>
    </CodePreview>

    <!-- Welcome Card -->
    <CodePreview title="欢迎卡片" description="展示用户信息和快捷操作按钮" :code="welcomeCode">
      <NCard>
        <template #header>
          <NSpace align="center">
            <NAvatar round size="large" style="background-color: #18a058">A</NAvatar>
            <div>
              <h3 style="margin: 0; font-size: 18px">欢迎回来，{{ username }}</h3>
              <p style="margin: 4px 0 0; color: #999; font-size: 14px">今天是个好日子，开始工作吧！</p>
            </div>
          </NSpace>
        </template>
        <NSpace>
          <NButton type="primary">🚀 创建项目</NButton>
          <NButton type="info">📊 查看报表</NButton>
          <NButton>⚙️ 系统设置</NButton>
          <NButton type="warning">📝 写文档</NButton>
        </NSpace>
      </NCard>
    </CodePreview>

    <NGrid :cols="2" :x-gap="16" :y-gap="16">
      <NGridItem>
        <CodePreview title="最近活动" description="使用 NTimeline 展示最近的操作记录" :code="activityCode">
          <NTimeline>
            <NTimelineItem type="success" title="项目部署成功" content="Admin Dashboard v1.2.0 已部署到生产环境" time="2024-01-15 14:30" />
            <NTimelineItem type="info" title="新成员加入" content="张三 加入了开发团队" time="2024-01-15 10:00" />
            <NTimelineItem type="warning" title="代码审查待处理" content="有 3 个 PR 等待审查" time="2024-01-14 16:20" />
            <NTimelineItem type="error" title="构建失败" content="feature/auth 分支构建失败，请检查" time="2024-01-14 11:00" />
            <NTimelineItem type="info" title="版本发布" content="v1.1.0 版本已发布到 npm" time="2024-01-13 09:30" />
          </NTimeline>
        </CodePreview>
      </NGridItem>

      <NGridItem>
        <CodePreview title="待办事项" description="使用 NCheckbox 实现可交互的待办列表" :code="todoCode">
          <div style="display: flex; flex-direction: column; gap: 12px">
            <div v-for="todo in todos" :key="todo.id">
              <NCheckbox v-model:checked="todo.done">
                <span :style="{ textDecoration: todo.done ? 'line-through' : 'none', color: todo.done ? '#999' : 'inherit' }">
                  {{ todo.text }}
                </span>
              </NCheckbox>
            </div>
          </div>
        </CodePreview>
      </NGridItem>
    </NGrid>

    <CodePreview title="项目进度" description="使用 NProgress 展示各项目的完成进度" :code="progressCode">
      <NGrid :cols="2" :x-gap="16" :y-gap="16">
        <NGridItem v-for="project in projects" :key="project.name">
          <NCard :title="project.name" size="small">
            <NProgress type="line" :percentage="project.progress" :status="project.status" indicator-placement="inside" />
            <p style="margin-top: 8px; color: #999; font-size: 13px">完成度 {{ project.progress }}%</p>
          </NCard>
        </NGridItem>
      </NGrid>
    </CodePreview>
  </div>
</template>
