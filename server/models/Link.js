const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  site: { type: String },
  desc: { type: String },
  icon: { type: String }
})

module.exports = mongoose.model('Link', schema)
