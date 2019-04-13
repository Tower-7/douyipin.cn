let mongoose = require('mongoose')
let ServiceSchema = require('../../Schemas/Admin/service')
let Service = mongoose.model('Service',ServiceSchema)

module.exports = Service