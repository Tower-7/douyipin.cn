let mongoose = require('mongoose')
let RangeOfServiceSchema = require('../../Schemas/Admin/rangeOfService')
let RangeOfService = mongoose.model('RangeOfService',RangeOfServiceSchema)

module.exports = RangeOfService