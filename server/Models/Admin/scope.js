const mongoose = require('mongoose')
let scopeSchema = require('../../Schemas/Admin/scope')
let scope = mongoose.model('scope',scopeSchema)

module.exports = scope