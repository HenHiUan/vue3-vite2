import { createApp } from 'vue'
import './style.css'
import '@/assets/css/tool.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import $common from './assets/js/common.js'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import store from './store/index.js'
import pinia from './pinia'
import ryEditTable from 'ry-edit-table'; // 引入表格插件
import 'ry-edit-table/dist/style.css';// 引入ry-edit-table样式

const app = createApp(App)
// npm install -D unplugin-vue-components unplugin-auto-import 按需引入icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// app.config.globalProperties.$common = $common
app.provide('$common', $common)
app.use(ElementPlus)
app.use(router)
app.use(store)
app.use(pinia)
app.use(ryEditTable)
app.mount('#app')
