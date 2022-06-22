import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import('@/views/Login'),
    name: 'login'
  },
  {
    path: '/',
    component: () => import('@/views/Layount'),
    children: [
      {
        path: '', // 默认子路由
        component: () => import('@/views/Home'),
        redirect: '/home'
      },
      {
        path: '/home', // 默认子路由
        component: () => import('@/views/Home')
      },
      {
        path: '/qa',
        component: () => import('@/views/Qa')
      },
      {
        path: '/video',
        component: () => import('@/views/Video')
      },
      {
        path: '/my',
        component: () => import('@/views/My')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
