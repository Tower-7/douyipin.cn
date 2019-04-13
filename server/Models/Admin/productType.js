const mongoose = require('mongoose')
let ProductTypeSchema = require('../../Schemas/Admin/productType')
let ProductType = mongoose.model('ProductType',ProductTypeSchema)

module.exports = ProductType