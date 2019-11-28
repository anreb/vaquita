const Promo = require('../models/Promo');

exports.feedView = (req, res) => {
	Promo.find({})
		.populate('author')
		.populate('store')
		.then((promos) => {
			console.log(promos);
			res.render('feed/view', { promos });
		})
		.catch((err) => console.log(err));
};

exports.feedSearch = (req, res) => {
	const { search } = req.body;
	Promo.find({ name: search })
		.then((promo) => {
			res.render('feed/view', {});
		})
		.catch((err) => console.log(err));
};
