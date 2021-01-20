import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:3000/web/api',
  timeout: 20 * 1000 // Timeout
})

export default http
