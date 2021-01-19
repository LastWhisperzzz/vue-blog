import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './plugins/element'
import './assets/css/global.scss'

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
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
