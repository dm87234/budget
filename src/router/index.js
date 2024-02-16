import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 一級路由
    {
      path: '/login',
      component: () => import('@/views/Login/index.vue')
    },
    {
      path: '/notfound',
      component: () => import('@/views/NotFound/index.vue')
    },
    {
      path: '/',
      component: () => import('@/views/Layout/layoutContainer.vue'),
      redirect: '/home',
      children: [
        {
          path: 'home',
          component: () => import('@/views/home/index.vue')
        },
        {
          path: 'budget',
          component: () => import('@/views/budget/index.vue')
        },
        {
          path: 'chart',
          component: () => import('@/views/chart/index.vue')
        },
        {
          path: 'settings',
          component: () => import('@/views/user/index.vue')
        }
      ]
    }
  ]
})

export default router
