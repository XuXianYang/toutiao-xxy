import Vue from 'vue'
import VueRouter from 'vue-router'
import loginPage from '@/views/login/index.vue'
import layout from '@/views/layout'
import home from '@/views/home'
import qa from '@/views/qa'
import video from '@/views/video'
import my from '@/views/my'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layout',
  },
  {
    path: '/login',
    component: loginPage,
  },
  {
    path: "/layout",
    redirect: '/layout/home',
    component: layout,
    children: [
      {
        path: 'home',
        component: home,
        meta: {// meta保存路由对象额外信息的
          title: '首页'
        },
      },
      {
        path: 'qa',
        component: qa,
      },
      {
        path: 'video',
        component: video,
      },
      {
        path: 'my',
        component: my,
      },
    ],
  },
]

const router = new VueRouter({
  routes
})

export default router
