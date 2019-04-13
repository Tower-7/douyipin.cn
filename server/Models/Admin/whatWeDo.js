var mongoose = require('mongoose')
var WhatWeDoSchema = require('../../Schemas/Admin/whatWeDo')
var WhatWeDo = mongoose.model('WhatWeDo',WhatWeDoSchema)

module.exports = WhatWeDo