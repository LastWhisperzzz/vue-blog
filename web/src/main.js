import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// axios
import http from './api/request'
Vue.prototype.$http = http

// 全局样式
import './assets/scss/style.scss'
import './assets/iconfont/iconfont.css'

// import './plugins/element'
import './plugins/filters'
import './plugins/global'

// 进度条
NProgress.configure({
  easing: 'ease',
  speed: 500,
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.3
})
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})
router.afterEach(() => {
  NProgress.done()
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
