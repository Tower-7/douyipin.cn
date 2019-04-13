const mongoose = require('mongoose')

let ProductTypeSchema = new mongoose.Schema({
	title: String,
	intro: String,
	type: String,
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
ProductTypeSchema.pre('save',function(next) {
	if(this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	}
	else {
		this.meta.updateAt = Date.now()
	}
	next()
})
ProductTypeSchema.statics = {
	findAll: function(cb) {
		return this
		.find({})
		.sort({'meta.updateAt':-1})
		.exec(cb)
	},
	updateById: async (db,id,_db)=> {
		return db
		.update({_id: id},_db,{upsert:true})
	},
	deletById: async(db,id) => {
		return db
		.remove({_id:id})
	},
	findById: async(db,id)=>{
		return db
		.find({_id:id})
	}
}
module.exports = ProductTypeSchema