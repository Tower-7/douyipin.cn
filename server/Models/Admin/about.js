const mongoose = require('mongoose')
let AboutSchema = require('../../Schemas/Admin/about')
let About = mongoose.model('AboutUs',AboutSchema)

module.exports = About