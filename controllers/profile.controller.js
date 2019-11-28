const User = require('../models/User');

exports.profileView = (req, res) => {
	const { id } = req.user;
	User.findById(id)
		.then((user) => {
			console.log(user);
			res.render('profile/view', { user });
		})
		.catch((err) => console.log(err));
};
