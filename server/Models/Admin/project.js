let mongoose = require('mongoose')
let ProjectSchema = require('../../Schemas/Admin/project')
let Project = mongoose.model('Project',ProjectSchema)

module.exports = Project