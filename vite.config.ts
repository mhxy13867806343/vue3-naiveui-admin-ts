import { defineConfig, type UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { compression } from 'vite-plugin-compression2'
import { visualizer } from 'rollup-plugin-visualizer'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

export default defineConfig(({ mode }): UserConfig => {
  const isProduction = mode === 'production'
  const isAnalyze = mode === 'analyze'

  return {
    plugins: [
      vue(),

      // Tailwind CSS v4
      tailwindcss(),

      // 自动导入 Vue/VueRouter/Pinia/i18n API 和 Naive UI 组合式函数
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          'pinia',
          'vue-i18n',
          {
            'naive-ui': [
              'useDialog',
              'useMessage',
              'useNotification',
              'useLoadingBar',
            ],
          },
        ],
        dts: 'src/auto-imports.d.ts',
        dirs: ['src/composables', 'src/stores'],
        vueTemplate: true,
      }),

      // 自动注册组件 + Naive UI 按需导入
      Components({
        resolvers: [NaiveUiResolver()],
        dts: 'src/components.d.ts',
        dirs: ['src/components'],
      }),

      // SVG 图标
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),

      // 生产环境 gzip + brotli 压缩
      ...(isProduction
        ? [
            compression({
              algorithms: ['gzip', 'brotliCompress'],
              threshold: 1024,
              deleteOriginalAssets: false,
            }),
          ]
        : []),

      // 构建分析（pnpm build:analyze）
      ...(isAnalyze
        ? [
            visualizer({
              open: true,
              gzipSize: true,
              brotliSize: true,
              filename: 'dist/stats.html',
            }),
          ]
        : []),
    ],

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },

    // CSS 配置
    css: {
      preprocessorOptions: {},
      devSourcemap: true,
    },

    // 构建优化
    build: {
      target: 'es2020',
      cssTarget: 'chrome80',
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          // 分包策略（Vite 8 / Rolldown 需要函数形式）
          manualChunks(id: string) {
            if (id.includes('node_modules')) {
              if (id.includes('naive-ui')) return 'naive-ui'
              if (id.includes('vue-i18n')) return 'i18n'
              if (id.includes('axios')) return 'axios'
              if (
                id.includes('vue') ||
                id.includes('vue-router') ||
                id.includes('pinia')
              ) {
                return 'vue-vendor'
              }
            }
          },
          // 资源文件命名
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        },
      },
      // 生产环境移除 console 和 debugger
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: isProduction,
          drop_debugger: isProduction,
        },
      },
    },

    // 开发服务器配置
    server: {
      port: 3100,
      open: true,
      cors: true,
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/api/, ''),
        },
      },
    },
  }
})
