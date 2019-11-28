const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');

passport.use(
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password'
		},
		(email, password, done) => {
			User.findOne({ email })
				.then((foundUser) => {
					if (!foundUser) {
						done(null, false, { message: 'contraseño o email invalido' });
						return;
					}

					if (!bcrypt.compareSync(password, foundUser.password)) {
						done(null, false, { message: 'contraseño o email invalido' });
						return;
					}

					done(null, foundUser);
				})
				.catch((err) => done(err));
		}
	)
);
