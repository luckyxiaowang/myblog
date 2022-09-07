import store from '@/store'
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/Welcome'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/components/Home.vue')
      },
      {
        path: 'blog',
        name: 'blog',
        component: () => import('@/components/Blog.vue')
      },
      {
        path: 'blogging',
        name: 'blogging',
        component: () => import('@/components/Blogging.vue')
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('@/components/My.vue'),
        children: [
          {
            path: '/my',
            name: 'about',
            component: () => import('@/components/my/About.vue')
          },
          {
            path: '/updateuser',
            name: 'updateuser',
            component: () => import('@/components/my/UpdateUser.vue')
          },
          {
            path: '/updatepwd',
            name: 'updatepwd',
            component: () => import('@/components/my/updataPwd.vue')
          }
        ]
      }

    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/register')
  }
]

const router = new VueRouter({
  routes
})

const whiteList = ['/login', '/register'] // 无需登录可以访问的路由地址
// 全局前置路由守卫
router.beforeEach((to, from, next) => {
  const token = store.state.token
  if (token) {
    // 登录了
    if (!store.state.userinfo.username) {
      // 本地有token的值，才去请求用户信息
      store.dispatch('getUserInfoActions')
    }
    next()
  } else {
    // 未登录
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
export default router
