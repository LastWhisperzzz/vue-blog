const express = require('express')
const cors = require('cors')
const history = require('connect-history-api-fallback')
const app = express()

app.set('secret', 'i2u34y12oi3u4y8')

app.use(cors()) // 跨域
app.use(express.json()) // 将请求解析为json

// 托管静态资源
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use('/admin', express.static(__dirname + '/admin'))
app.use('/', history(), express.static(__dirname + '/web'))

require('./plugins/db')(app) // 连接数据库

require('./routes/admin')(app) // 后台管理接口
require('./routes/web')(app) // 前端页面接口

app.listen(3000, () => {
  console.log('App running at: http://localhost:3000')
})
