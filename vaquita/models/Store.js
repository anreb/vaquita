const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StoreSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	promotions: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Promo'
		}
	]
});

const Store = mongoose.model('Store', StoreSchema);
module.exports = Store;
