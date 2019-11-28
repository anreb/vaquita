const User = require('../models/User');

exports.vaquitaView = (req, res) => {
	const { id } = req.user;
	User.findById(id)
		.then((user) => {
			res.render('vaquita/view', { user });
		})
		.catch((err) => console.log(err));
};
