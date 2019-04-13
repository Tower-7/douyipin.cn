let mongoose = require('mongoose')
let ReadSchema = require('../../Schemas/Admin/read')
let Read = mongoose.model('Read',ReadSchema)

module.exports = Read