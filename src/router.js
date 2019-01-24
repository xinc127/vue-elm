import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  // 空地址跳转至home页面
  {
    path: '',
    redirect: '/home',
  },
  // 首页城市列表
  {
    path: '/home',
    component: () => import('./views/Home/index.vue'),
  },
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    // 第三个参数 savedPosition 当且仅当 popstate 导航(通过浏览器的 前进/后退 按钮才可以触发)
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  },
})

export default router
