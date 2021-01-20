const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const schema = new mongoose.Schema({
  username: { type: String, unique: true }, // 唯一
  password: {
    type: String,
    select: false, // 密码不会被查询
    set(val) {
      return bcrypt.hashSync(val, 10) //散列加密
    }
  }
})

module.exports = mongoose.model('AdminUser', schema)
