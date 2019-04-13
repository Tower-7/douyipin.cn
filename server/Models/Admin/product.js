const mongoose = require('mongoose')
let ProductSchema = require('../../Schemas/Admin/product')
let Product = mongoose.model('Product',ProductSchema)

module.exports = Product