const mongoose = require('mongoose')
let goodSchema = require('../../Schemas/Admin/good')
let good = mongoose.model('good',goodSchema)

module.exports = good