module.exports = app => {
  const express = require('express')
  const assert = require('http-assert')
  const jwt = require('jsonwebtoken')
  const AdminUser = require('../../models/AdminUser')
  const router = express.Router({
    mergeParams: true
  })

  // 登录校验中间件
  const authMiddleware = require('../../middleware/auth')
  // 资源匹配中间件
  const resourceMiddleware = require('../../middleware/resource')

  // 登录
  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body
    // 1.根据用户名找用户
    const user = await AdminUser.findOne({ username }).select('+password')
    assert(user, 422, '用户名不存在')
    // 2.校验密码
    const isValid = require('bcryptjs').compareSync(password, user.password)
    assert(isValid, 422, '用户名或密码错误')
    // 3.返回token
    const token = jwt.sign({ id: user._id }, app.get('secret'))
    res.send({ message: '登陆成功', token })
  })

  //第一次登录把注册注释取消
  // app.post("/admin/api/register", async (req, res) => {
  //   const user = await AdminUser.create({
  //     username: req.body.username,
  //     password: req.body.password
  //   });
  //   res.send(user)
  // })

  // crud接口--------------------------------------------------------
  // 创建资源
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  // 更新资源
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  // 删除资源
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })
  // 资源详情
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })
  // 资源列表
  router.get('/', async (req, res) => {
    const queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions)
    res.send(items)
  })
  // 监听资源crud通用接口--------------------------------------------------
  app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)

  // 图片上传
  const multer = require('multer')
  const upload = multer({
    dest: __dirname + '/../../uploads'
    // 替换为阿里云存储
    //   storage: MAO({
    //     config: {
    //         region: 'oss-cn-beijing',
    //         accessKeyId: 'LTAI4G5Nk12EQWfEajo9gEAD',
    //         accessKeySecret: 'qpLegIjTQCYeWx81AmxwMflmUTVjTl',
    //         bucket: 'my-moba'
    //     }
    // })
  })
  app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  app.post('/admin/api/email', async (req, res) => {
    console.log(req.body)
    sendEmail(req.body)
    res.send({
      ok: 'ok'
    })
  })

  //错误处理函数
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}
