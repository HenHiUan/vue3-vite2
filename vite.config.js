import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// icon按需引入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    // AutoImport和Components是elememt-plus按需引入才需要加的！！！！！！！
    AutoImport({
        resolvers: [ElementPlusResolver()],
    }),
    Components({
        resolvers: [ElementPlusResolver()],
    }),
  ],
  // 配置根路径
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
})
