var mongoose = require('mongoose')

var BannerSchema = new mongoose.Schema({
	title: String,
	title_two:String,
	job:String,
	intro:String,
	word:String,
	type: String,
	link: String,
	txt:String,
	btn:String,
	pic: String,
	number: String,
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
BannerSchema.pre('save',function(next) {
	if(this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	}
	else {
		this.meta.updateAt = Date.now()
	}
	next()
})
BannerSchema.statics = {
	findAll: function(cb) {
		return this
		.find({})
		.exec(cb)
	},
	updateById: async (banner,id,_banner)=> {
		return banner
		.update({_id: id},_banner,{upsert:true})
	},
	deletById: async(db,id) => {
		return db
		.remove({_id:id})
	}
}
module.exports = BannerSchema