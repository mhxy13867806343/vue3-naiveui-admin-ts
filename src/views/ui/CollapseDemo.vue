<script setup lang="ts">
import { NCollapse, NCollapseItem } from 'naive-ui'
import CodePreview from '@/components/common/CodePreview.vue'

const basicCode = `<NCollapse>
  <NCollapseItem title="标题一" name="1">内容一</NCollapseItem>
  <NCollapseItem title="标题二" name="2">内容二</NCollapseItem>
</NCollapse>`

const accordionCode = `<NCollapse accordion>
  <NCollapseItem title="标题一" name="1">内容一</NCollapseItem>
</NCollapse>`
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Collapse 折叠面板</h2>

    <CodePreview title="基础用法" description="可以同时展开多个面板" :code="basicCode">
      <NCollapse>
        <NCollapseItem title="什么是 Vue？" name="1">Vue 是一个用于构建用户界面的渐进式 JavaScript 框架。</NCollapseItem>
        <NCollapseItem title="什么是 Naive UI？" name="2">Naive UI 是一个 Vue 3 组件库，使用 TypeScript 编写。</NCollapseItem>
        <NCollapseItem title="什么是 TypeScript？" name="3">TypeScript 是 JavaScript 的超集，添加了类型系统。</NCollapseItem>
      </NCollapse>
    </CodePreview>

    <CodePreview title="手风琴模式" description="设置 accordion 属性，每次只能展开一个面板" :code="accordionCode">
      <NCollapse accordion>
        <NCollapseItem title="🚀 快速开始" name="1">安装依赖后运行 pnpm dev 即可启动项目。</NCollapseItem>
        <NCollapseItem title="📦 项目结构" name="2">src 目录包含 views、components、router、store 等子目录。</NCollapseItem>
        <NCollapseItem title="🔧 配置说明" name="3">项目使用 Vite 作为构建工具，配置文件为 vite.config.ts。</NCollapseItem>
      </NCollapse>
    </CodePreview>
  </div>
</template>
