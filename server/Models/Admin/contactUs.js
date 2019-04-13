const mongoose = require('mongoose')
let ContactUsSchema = require('../../Schemas/Admin/contactUs')
let ContactUs = mongoose.model('ContactUs',ContactUsSchema)

module.exports = ContactUs