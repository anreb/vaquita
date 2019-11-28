const Store = require('../models/Store');
const Promo = require('../models/Promo');
const User = require('../models/User');

exports.storesView = (req, res) => {
	Store.find({})
		.then((stores) => {
			res.render('stores/view', { stores });
		})
		.catch((err) => console.log(err));
};

exports.storePromosView = (req, res) => {
	const { id } = req.params;
	console.log(id);
	Promo.find({ store: id })
		.populate('store')
		.populate('author')
		.then((promos) => {
			console.log(promos);
			res.render('stores/viewStore', { promos });
		})
		.catch((err) => console.log(err));
};

exports.createStore = (req, res) => {
	const { name } = req.body;
	const { secure_url } = req.file;
	Store.create({ name, imgUrl: secure_url }).then((res) => console.log(res)).catch((err) => console.log(err));
	res.redirect('/stores');
};

exports.deleteStore = (req, res) => {
	const { id } = req.params;

	Store.findByIdAndDelete(id)
		.populate('promotions')
		.then((deletedStore) => {
			deletedStore.promotions.forEach((promo) => {
				Promo.findByIdAndDelete(promo._id)
					.then((deletedPromo) => {
						User.findByIdAndUpdate(promo.author, { $pull: { promotions: { $in: promo._id } } })
							.then((deletedUserPromo) => {
								res.redirect('/stores');
							})
							.catch((err) => console.log(err));
					})
					.catch((err) => console.log(err));
			});
		})
		.catch((err) => console.log(err));
};

exports.editStoreView = (req, res) => {
	const { id } = req.params;
	Store.findById(id)
		.then((store) => {
			res.render('stores/editView', { store });
		})
		.catch((err) => console.log(err));
};

exports.editStoreProcess = (req, res) => {
	const { storeName } = req.body;
	const { secure_url } = req.file;
	const { id } = req.params;
	Store.findByIdAndUpdate(id, { name: storeName, imgUrl: secure_url })
		.then((store) => res.redirect('/stores'))
		.catch((err) => console.log(err));
};
