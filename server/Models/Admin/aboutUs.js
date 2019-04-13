const mongoose = require('mongoose')
let AboutUsSchema = require('../../Schemas/Admin/aboutUs')
let AboutUs = mongoose.model('AboutUs',AboutUsSchema)

module.exports = AboutUs