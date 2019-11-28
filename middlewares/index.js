const User = require('../models/User');

exports.checkUser = (req, res, next) => {
	if (req.isAuthenticated()) {
		req.app.locals.logged = true;
	} else {
		req.app.locals.logged = false;
	}
	return next();
};

exports.isAuth = (req, res, next) => {
	req.isAuthenticated() ? next() : res.redirect('/auth/login');
};

exports.confirmed = (req, res, next) => {
	const { email } = req.body;
	console.log(email);
	User.find({ email })
		.then(([ user ]) => {
			console.log(user);
			user.status === 'Active' ? next() : res.redirect('/auth/login');
		})
		.catch((err) => console.log(err));
};

exports.checkAdmin = (req, res, next) => {
	if (req.user) {
		if (req.user.email === 'anrebdev@gmail.com') {
			req.app.locals.admin = true;
			return next();
		} else {
			req.app.locals.admin = false;
			return next();
		}
	} else {
		return next();
	}
};

exports.isAdmin = (req, res, next) => {
	if (req.user.email === 'anrebdev@gmail.com') {
		console.log('Is admin');
		req.app.locals.admin = true;
		return next();
	} else {
		req.app.locals.admin = false;
		res.redirect('/');
	}
};

exports.catchErrors = (controller) => (req, res, next) => controller(req, res, next).catch(next);
