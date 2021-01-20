import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import http from './request/request'
Vue.prototype.$http = http

import './assets/scss/style.scss'
import './assets/iconfont/iconfont.css'

import './plugins/element'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
