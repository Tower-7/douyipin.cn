const mongoose = require('mongoose')

let ProductSchema = new mongoose.Schema({
	title: String,
	intro: String,
	type: String,
	pic: String,
	content: String,
	workType:String,
	pay:String,
	benefit:String,
	task:String,
	require:String,
	code:String,
	cover:String,
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
ProductSchema.pre('save',function(next) {
	if(this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	}
	else {
		this.meta.updateAt = Date.now()
	}
	next()
})
ProductSchema.statics = {
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
	}
}
module.exports = ProductSchema