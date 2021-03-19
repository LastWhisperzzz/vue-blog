import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta: { isPublic: true }
  },
  {
    path: '/',
    component: () => import('../views/Layout.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('../views/dashboard/index')
      },
      {
        path: 'profile',
        component: () => import('../views/profile/index')
      },
      {
        path: '/categories/list',
        component: () => import('../views/CategoryList.vue')
      },
      {
        path: '/articles/create',
        component: () => import('../views/ArticleEdit.vue')
      },
      {
        path: '/articles/edit/:id',
        component: () => import('../views/ArticleEdit.vue'),
        props: true
      },
      {
        path: '/articles/list',
        component: () => import('../views/ArticleList.vue')
      },
      {
        path: '/comments/list',
        component: () => import('../views/CommentList.vue'),
        props: true
      },
      {
        path: '/messages/list',
        component: () => import('../views/MessageList.vue')
      },
      {
        path: '/users/list',
        component: () => import('../views/UserList.vue')
      },
      {
        path: '/links/list',
        component: () => import('../views/LinkList.vue')
      },
      {
        path: '/admin_users',
        component: () => import('../views/AdminUser.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 客户端路由限制
router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !sessionStorage.token) {
    return next('/login')
  }
  next()
})

export default router
