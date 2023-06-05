export default [
  {
    name: '3D卡片',
    path: '/3dCard',
    meta: {
      icon: 'Postcard'
    },
    component: () => import('./aboutCss/3dCard.vue'),
  },
  {
    name: '加载',
    path: '/loading',
    meta: {
      icon: 'Loading'
    },
    component: () => import('./aboutCss/loading.vue'),
  },
  {
    name: '一些vue3用法',
    path: '/someUsage',
    meta: {
      icon: 'EditPen'
    },
    component: () => import('./aboutVue3/someUsage.vue'),
  },
]