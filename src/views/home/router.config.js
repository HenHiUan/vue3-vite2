export default [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: '主页',
    meta: {
      // icon: '<i class="el-icon-tickets"></i>',
      icon: 'House'
    },
    component: () => import('./home.vue'),
  },
  {
    name: '雷猴世界',
    path: '/helloWorld',
    meta: {
      icon: 'Eleme'
    },
    component: () => import('@/components/HelloWorld.vue'),
  }
]