const Promo = require('../models/Promo');

exports.promosView = (req, res) => {
	const id = req.user._id;
	Promo.find({ author: id })
		.populate('author')
		.then((promos) => {
			res.render('promos/view', { promos });
		})
		.catch((err) => console.log(err));
};

exports.createPromo = (req, res) => {
	const { name, description, price, expiration } = req.body;
	const { secure_url } = req.file;
	const author = req.user._id;
	Promo.create({ name, description, price, expiration, imgUrl: secure_url, author })
		.then((res) => console.log(res))
		.catch((err) => console.log(err));
	res.redirect('/promos');
};

exports.deletePromo = (req, res) => {
	const { id } = req.params;
	Promo.findByIdAndDelete({ _id: id }).then((res) => console.log(res)).catch((err) => console.log(err));
	res.redirect('/promos');
};
