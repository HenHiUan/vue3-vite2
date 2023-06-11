import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes.js'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
// router.beforeEach((to, from, next) => {//路由守卫重定向
//   next("/home")
// })
export default router