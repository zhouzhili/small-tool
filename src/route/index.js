import { createRouter, createWebHashHistory } from 'vue-router'

// 使用createWebHistory 的时候要注意配置根目录地址：https://juejin.cn/post/6941620691284262926
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../views/index.vue')
    },
    {
      path: '/wechat',
      component: () => import('../views/wechat.vue')
    },
    {
      path: '/riji',
      component: () => import('../views/riji.vue')
    },
    {
      path: '/audio',
      component: () => import('../views/audio.vue')
    }
  ]
})

export default router