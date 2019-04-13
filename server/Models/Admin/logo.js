var mongoose = require('mongoose')
var LogoSchema = require('../../Schemas/Admin/logo')
var Logo = mongoose.model('Logo',LogoSchema)

module.exports = Logo