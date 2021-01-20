import axios from 'axios'
import NProgress from 'nprogress'
import Vue from 'vue'
import router from '../router/index'

const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api',
  timeout: 5000
})

// 请求拦截
http.interceptors.request.use(
  config => {
    NProgress.start() // 展示进度条
    const token = sessionStorage.getItem('token')
    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
// 响应拦截
http.interceptors.response.use(
  res => {
    NProgress.done() //隐藏进度条
    return res
  },
  err => {
    NProgress.done() //隐藏进度条
    if (err.response.data.message) {
      Vue.prototype.$message({
        type: 'error',
        message: err.response.data.message
      })
      if (err.response.status === 401) {
        router.push('/login')
      }
    }
    return Promise.reject(err)
  }
)

export default http
