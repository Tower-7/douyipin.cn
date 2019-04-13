const mongoose = require('mongoose')

let NewsSchema = new mongoose.Schema({
	title: String,
	intro: String,
	type: String,
	pic: String,
	content: String,
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
NewsSchema.pre('save',function(next) {
	if(this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	}
	else {
		this.meta.updateAt = Date.now()
	}
	next()
})
NewsSchema.statics = {
	findAll: function(cb) {
		return this
		.find({})
		.sort({'meta.createAt':-1})
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
	},
	findByType: async(db,id)=>{
		return db
		.find({type:id})
	},
	findFourList: async(db,number)=>{
		return db
		.find({}).limit(number).skip(0)
		.sort({'meta.createAt':-1})
	}
}
module.exports = NewsSchema