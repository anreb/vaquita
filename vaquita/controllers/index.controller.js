exports.feedView = (req, res) => {
	const logged = req.app.locals.logged;
	res.render('feed/view', { logged });
};
