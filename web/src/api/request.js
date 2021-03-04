import axios from 'axios'
import NProgress from 'nprogress'

const http = axios.create({
  baseURL: 'http://localhost:3000/web/api',
  timeout: 5000
})

// 请求拦截
http.interceptors.request.use(
  config => {
    NProgress.start()
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 响应拦截
http.interceptors.response.use(
  response => {
    NProgress.done()
    return response.status === 200 ? Promise.resolve(response) : Promise.reject(response)
  },
  error => {
    return Promise.reject(error)
  }
)

export default http
