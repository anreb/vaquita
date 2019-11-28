const Promo = require('../models/Promo');
const Store = require('../models/Store');
const User = require('../models/User');

exports.promosView = (req, res) => {
	const id = req.user._id;
	Promo.find({ author: id })
		.populate('author')
		.populate('store')
		.then((promos) => {
			res.render('promos/view', { promos });
		})
		.catch((err) => console.log(err));
};

exports.createPromo = (req, res) => {
	const { name, description, price, expiration, storeName } = req.body;
	const { secure_url } = req.file;
	const author = req.user._id;

	Store.find({ name: storeName }).then(([ store ]) => {
		console.log(store);
		Promo.create({ name, description, price, expiration, imgUrl: secure_url, author, store: store._id })
			.then((promo) => {
				User.findByIdAndUpdate(author, { $push: { promotions: promo._id } })
					.then((user) => {
						Store.findByIdAndUpdate(store._id, { $push: { promotions: promo._id } })
							.then((store) => res.redirect('/promos'))
							.catch((err) => console.log(err));
					})
					.catch((err) => console.log(err));
			})
			.catch((err) => console.log(err));
	});
};

exports.deletePromo = (req, res) => {
	const { id } = req.params;
	Promo.findByIdAndDelete({ _id: id })
		.then((promo) => {
			User.findByIdAndUpdate(promo.author, { $pull: { promotions: { $in: promo._id } } })
				.then((user) => {
					Store.findByIdAndUpdate(promo.store, { $pull: { promotions: { $in: promo._id } } })
						.then((store) => console.log(store))
						.catch((err) => console.log(err));
				})
				.catch((err) => console.log(err));
		})
		.catch((err) => console.log(err));
	res.redirect('/promos');
};

exports.editPromoView = (req, res) => {
	const { id } = req.params;
	Promo.findById({ _id: id })
		.populate('store')
		.then((promo) => {
			res.render('promos/editView', { promo });
		})
		.catch((err) => console.log(err));
};

exports.editPromoProcess = async (req, res) => {
	const { name, description, price, expiration, storeName } = req.body;
	const { secure_url } = req.file;
	const { id } = req.params;
	const author = req.user._id;
	const { store } = await Promo.findById(id);

	Store.find({ name: storeName })
		.then(([ newStore ]) => {
			if (newStore._id !== store) {
				Promo.findByIdAndUpdate(id, {
					name,
					description,
					price,
					expiration,
					imgUrl: secure_url,
					author,
					store: newStore._id
				})
					.then((promo) => {
						console.log(store, promo._id, newStore._id);
						Store.findByIdAndUpdate(store, { $pull: { promotions: { $in: promo._id } } })
							.then((oldStore) => {
								Store.findByIdAndUpdate(newStore._id, { $push: { promotions: promo._id } })
									.then((user) => console.log(user))
									.catch((err) => console.log(err));
							})
							.catch((err) => console.log(err));
					})
					.catch((err) => console.log(err));
			} else {
				Promo.findByIdAndUpdate(id, {
					name,
					description,
					price,
					expiration,
					imgUrl: secure_url,
					author
				})
					.then((res) => console.log(res))
					.catch((err) => console.log(err));
			}
		})
		.catch((err) => console.log(err));
	res.redirect('/promos');
};
