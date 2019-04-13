var mongoose = require('mongoose')

var WhatWeDoSchema = new mongoose.Schema({
	title: String,
	icon: String,
	title_two:String,
	job:String,
	intro:String,
	word:String,
	type: String,
	link: String,
	txt:String,
	pic: String,
	meta: {
		createAt: {
			type:Date,
			default:Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
})
WhatWeDoSchema.pre('save',function(next) {
	if(this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	}
	else {
		this.meta.updateAt = Date.now()
	}
	next()
})
WhatWeDoSchema.statics = {
	findAll: function(cb) {
		return this
		.find({})
		.exec(cb)
	},
	updateById: async (WhatWeDo,id,_whatWeDo)=> {
		return WhatWeDo
		.update({_id: id},_whatWeDo,{upsert:true})
	},
	deletById: async(db,id) => {
		return db
		.remove({_id:id})
	}
}
module.exports = WhatWeDoSchema