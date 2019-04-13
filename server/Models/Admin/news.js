const mongoose = require('mongoose')
let NewsSchema = require('../../Schemas/Admin/news')
let News = mongoose.model('News',NewsSchema)

module.exports = News