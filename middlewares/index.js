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
	req.app.locals.confirmed ? next() : res.redirect('/auth/login');
};

exports.catchErrors = (controller) => (req, res, next) => controller(req, res, next).catch(next);
