import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue']
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    proxy: {
      '/dailyhot': {
        target: 'https://www.mapcenter.cn',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        charset: false,
      },
    },
  },
  build: {
    rollupOptions: {
      manualChunks: {
        fabric: ['fabric']
      }
    }
  }
})
