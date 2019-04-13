var mongoose = require('mongoose')

var ContactStyleSchema = new mongoose.Schema({
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
ContactStyleSchema.pre('save',function(next) {
	if(this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	}
	else {
		this.meta.updateAt = Date.now()
	}
	next()
})
ContactStyleSchema.statics = {
	findAll: function(cb) {
		return this
		.find({})
		.exec(cb)
	},
	updateById: async (contactStyle,id,_contactStyle)=> {
		return contactStyle
		.update({_id: id},_contactStyle,{upsert:true})
	},
	deletById: async(db,id) => {
		return db
		.remove({_id:id})
	}
}
module.exports = ContactStyleSchema