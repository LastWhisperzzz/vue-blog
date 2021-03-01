import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './assets/css/global.scss'

import './plugins/element'
import './plugins/filters'

import axios from './request/request'
Vue.prototype.axios = axios

Vue.mixin({
  computed: {
    uploadUrl() {
      return this.axios.defaults.baseURL + '/upload'
    }
  },
  methods: {
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${sessionStorage.token || ''}`
      }
    }
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
