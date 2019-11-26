const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PromoSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	description: {
		type: String,
		required: true
	},
	expiration: {
		type: Date
	},
	price: {
		type: Number
	},
	imgUrl: {
		type: String
	}
});

const Promo = mongoose.model('Promo', PromoSchema);
module.exports = Promo;
