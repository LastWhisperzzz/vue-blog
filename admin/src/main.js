import Vue from 'vue'
import App from './App.vue'
import router from './router'

// axios
import axios from './api/request'
Vue.prototype.axios = axios

// 全局样式
import './assets/css/global.scss'

// import './plugins/element'
import './plugins/filters'

// element图片上传
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
