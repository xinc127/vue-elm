import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// const view = name => () => {
//   import(`@/view/${name}/${name}.vue`)
// }

const routes = [
  // 空地址跳转至home页面
  {
    path: '',
    redirect: '/home',
  },
  // 首页城市列表
  {
    name: 'home',
    path: '/home',
    component: () =>
      import(/* webpackChunkName: '1' */ `@/views/home/home.vue`),
  },
  // 当前选择城市页面
  {
    name: 'city',
    path: '/city/:cityid',
    component: () =>
      import(/* webpackChunkName: '2' */ `@/views/city/city.vue`),
  },
  // 全部店铺列表页
  {
    name: 'msite',
    path: '/msite/',
    component: () =>
      import(/* webpackChunkName: '3' */ './views/msite/msite.vue'),
  },
  // 特色商铺列表页
  {
    name: 'food',
    path: '/food/',
    component: () =>
      import(/* webpackChunkName: '4' */ '@/views/food/food.vue'),
  },
  // 搜索页面
  {
    name: 'search',
    path: '/search/',
    component: () =>
      import(/* webpackChunkName: '5' */ './views/search/search.vue'),
  },
  // 订单列表页面
  {
    name: 'order',
    path: '/order/',
    component: () =>
      import(/* webpackChunkName: '6' */ './views/order/order.vue'),
  },
  // 个人中心页面
  {
    name: 'center',
    path: '/center/',
    component: () =>
      import(/* webpackChunkName: '7' */ './views/center/center.vue'),
  },
  // 注册登录
  {
    name: 'login',
    path: '/login/',
    component: () =>
      import(/* webpackChunkName: '8' */ './views/login/login.vue'),
  },
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
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
