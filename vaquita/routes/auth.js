const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User');
const { checkUser } = require('../middlewares/index');

// Bcrypt to encrypt passwords
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

router.get('/login', (req, res, next) => {
	res.render('auth/login', { message: req.flash('error') });
});

router.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/auth/login',
		failureFlash: true,
		passReqToCallback: true
	}),
	checkUser
);

router.get('/signup', (req, res, next) => {
	res.render('auth/signup');
});

router.post('/signup', (req, res, next) => {
	const { name, lastName, email, password } = req.body;

	if (name === '' || password === '' || lastName === '' || email === '') {
		res.render('auth/signup', { message: 'One or more fields are missing' });
		return;
	}

	User.findOne({ email }, 'email', (err, user) => {
		if (user !== null) {
			res.render('auth/signup', { message: 'The email already exists' });
			return;
		}

		const salt = bcrypt.genSaltSync(bcryptSalt);
		const hashPass = bcrypt.hashSync(password, salt);

		const newUser = new User({
			name,
			lastName,
			email,
			password: hashPass
		});

		console.log(newUser);

		newUser
			.save()
			.then(() => {
				res.redirect('/');
			})
			.catch((err) => {
				res.render('auth/signup', { message: 'Something went wrong' });
			});
	});
});

router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

module.exports = router;
