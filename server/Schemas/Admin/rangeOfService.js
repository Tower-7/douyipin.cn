const mongoose = require('mongoose')

let RangeOfServiceSchema = new mongoose.Schema({
	title: String,
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
RangeOfServiceSchema.pre('save',function(next) {
	if(this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	}
	else {
		this.meta.updateAt = Date.now()
	}
	next()
})
RangeOfServiceSchema.statics = {
	findAll: function(cb) {
		return this
		.find({})
		.exec(cb)
	},
	updateById: async (db,id,_db)=> {
		return db
		.update({_id: id},_db,{upsert:true})
	},
	deletById: async(db,id) => {
		return db
		.remove({_id:id})
	}
}
module.exports = RangeOfServiceSchema