import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/Main.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue'),
        meta: {
          title: '首页 - MIQILIN'
        }
      },
      {
        path: '/archives',
        name: 'Archive',
        component: () => import('../views/Archive.vue'),
        meta: {
          title: '归档 - MIQILIN'
        }
      },
      {
        path: '/tags',
        name: 'Tag',
        component: () => import('../views/Tag.vue'),
        meta: {
          title: '标签 - MIQILIN'
        }
      },
      {
        path: '/links',
        name: 'Link',
        component: () => import('../views/Link.vue'),
        meta: {
          title: '友链 - MIQILIN'
        }
      },
      {
        path: '/message',
        name: 'Message',
        component: () => import('../views/Message.vue'),
        meta: {
          title: '留言 - MIQILIN'
        }
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue'),
        meta: {
          title: '关于 - MIQILIN'
        }
      },
      {
        path: '/article/list/:id',
        name: 'Article',
        component: () => import('../views/Article.vue'),
        props: true,
        meta: {
          title: '文章详情 - MIQILIN'
        }
      }
    ]
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  routes,
  // 路由跳转使页面滚动到顶部
  scrollBehavior() {
    return {
      x: 0,
      y: 0
    }
  }
})
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
