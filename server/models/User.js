const mongoose = require('mongoose')
const schema = new mongoose.Schema(
  {
    nickName: { type: String },
    avatar: { type: String },
    email: { type: String },
    url: { type: String }
  },
  {
    timestamps: true
  }
)
module.exports = mongoose.model('User', schema)
