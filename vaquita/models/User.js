const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		lastName: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true,
			unique: true
		},
		password: {
			type: String,
			required: true
		},
		promotions: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Promo'
			}
		]
	},
	{
		timestamps: true
	}
);

const User = mongoose.model('User', userSchema);
module.exports = User;
