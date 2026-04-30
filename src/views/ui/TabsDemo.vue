<script setup lang="ts">
import { ref } from 'vue'
import { NTabs, NTabPane, NSpace } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const activeTab = ref('tab1')

const lineCode = `<NTabs type="line" v-model:value="activeTab">
  <NTabPane name="tab1" tab="标签一">内容一</NTabPane>
  <NTabPane name="tab2" tab="标签二">内容二</NTabPane>
  <NTabPane name="tab3" tab="标签三">内容三</NTabPane>
</NTabs>`

const cardCode = `<NTabs type="card">
  <NTabPane name="tab1" tab="标签一">内容一</NTabPane>
</NTabs>`

const segmentCode = `<NTabs type="segment">
  <NTabPane name="tab1" tab="标签一">内容一</NTabPane>
</NTabs>`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Tabs 标签页</h2>

    <CodePreview title="线条类型" description="默认的线条样式标签页" :code="lineCode">
      <NTabs v-model:value="activeTab" type="line">
        <NTabPane name="tab1" tab="用户管理">用户管理相关内容，可以在这里管理系统用户。</NTabPane>
        <NTabPane name="tab2" tab="角色管理">角色管理相关内容，可以在这里配置角色权限。</NTabPane>
        <NTabPane name="tab3" tab="系统设置">系统设置相关内容，可以在这里修改系统配置。</NTabPane>
      </NTabs>
    </CodePreview>

    <CodePreview title="卡片类型" description="卡片样式的标签页" :code="cardCode">
      <NTabs type="card">
        <NTabPane name="tab1" tab="📊 概览">概览数据展示区域</NTabPane>
        <NTabPane name="tab2" tab="📈 趋势">趋势图表展示区域</NTabPane>
        <NTabPane name="tab3" tab="📋 明细">明细数据表格区域</NTabPane>
      </NTabs>
    </CodePreview>

    <CodePreview title="分段类型" description="分段控制器样式" :code="segmentCode">
      <NTabs type="segment">
        <NTabPane name="day" tab="日">日数据统计</NTabPane>
        <NTabPane name="week" tab="周">周数据统计</NTabPane>
        <NTabPane name="month" tab="月">月数据统计</NTabPane>
      </NTabs>
    </CodePreview>
  </div>
</template>
