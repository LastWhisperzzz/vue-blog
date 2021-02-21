import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// axios
import http from './api/request'
Vue.prototype.$http = http

// 全局样式
import './assets/scss/style.scss'
import './assets/iconfont/iconfont.css'

import './plugins/element'
import './plugins/filters'
import './plugins/global'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
