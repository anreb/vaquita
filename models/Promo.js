const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PromoSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	store: {
		type: Schema.Types.ObjectId,
		ref: 'Store'
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
		type: String
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
