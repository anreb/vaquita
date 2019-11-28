const express = require('express');
const passport = require('passport');
const router = express.Router();
const { loginView, signUpView, signUpProcess, confirmAccount, logout } = require('../controllers/auth.controller');
const { catchErrors, confirmed } = require('../middlewares');

router.get('/login', loginView);

router.post(
	'/login',
	confirmed,
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/auth/login',
		failureFlash: true,
		passReqToCallback: true
	})
);

router.get('/signup', signUpView);

router.post('/signup', signUpProcess);

router.get('/confirm/:confirmationCode', catchErrors(confirmAccount));

router.get('/logout', logout);

module.exports = router;
