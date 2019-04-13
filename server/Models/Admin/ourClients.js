var mongoose = require('mongoose')
var OurClientsSchema = require('../../Schemas/Admin/ourClients')
var OurClients = mongoose.model('OurClients',OurClientsSchema)

module.exports = OurClients