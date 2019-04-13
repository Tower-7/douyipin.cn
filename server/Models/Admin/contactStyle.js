const mongoose = require('mongoose')
let ContactStyleSchema = require('../../Schemas/Admin/contactStyle')
let ContactStyle = mongoose.model('ContactStyle',ContactStyleSchema)

module.exports = ContactStyle