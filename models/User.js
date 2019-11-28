const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true
		},
		status: {
			type: String,
			enum: [ 'Pending Confirmation', 'Active' ],
			default: 'Pending Confirmation'
		},
		confirmationCode: {
			type: String,
			unique: true
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
