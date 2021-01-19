const express = require('express')
const cors = require('cors')
const app = express()

// 跨域
app.use(cors())
// 将请求转为json
app.use(express.json())
// 托管静态资源
app.use('/uploads', express.static(__dirname + '/uploads'))

// 连接数据库
require('./plugins/db')(app)
// 后台管理接口
require('./routes/admin')(app)
// 前端页面接口
// require('./routes/web')(app)

app.listen(3000, () => {
  console.log('App running at: http://localhost:3000')
})
