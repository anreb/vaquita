const { transporter } = require('./email.controller');
const User = require('../models/User');

const tokenGen = () => {
	const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	let token = '';
	for (let i = 0; i < 25; i++) {
		token += characters[Math.floor(Math.random() * characters.length)];
	}
	return token;
};

const bcrypt = require('bcrypt');
const bcryptSalt = 10;

exports.loginView = (req, res) => {
	res.render('auth/login', { message: req.flash('error') });
};

exports.signUpView = (req, res) => {
	res.render('auth/signup');
};

exports.signUpProcess = (req, res) => {
	const { name, lastName, email, password } = req.body;

	if (name === '' || password === '' || lastName === '' || email === '') {
		res.render('auth/signup', { message: 'Faltan uno o mas campos' });
		return;
	}

	User.findOne({ email }, 'email', (err, user) => {
		if (user !== null) {
			res.render('auth/signup', { message: 'Email ya existe' });
			return;
		}

		const salt = bcrypt.genSaltSync(bcryptSalt);
		const hashPass = bcrypt.hashSync(password, salt);
		const token = tokenGen();

		const newUser = new User({
			name,
			lastName,
			email,
			password: hashPass,
			confirmationCode: token
		});

		newUser
			.save()
			.then(async () => {
				await transporter.sendMail({
					from: 'Soporte Vaquita <vaquita_soporte@gmail.com>',
					to: email,
					subject: 'Verificar cuenta',
					text: `Haz click en codigo de verifacion para activar cuenta`,
					html: `
			  		<a href="${req.headers.origin}/auth/confirm/${token}"> Codigo de verificacion: ${token} </a>`
				});
				req.app.locals.confirmed = false;
				res.redirect('/auth/login');
			})
			.catch((err) => {
				console.log(err);
				res.render('auth/signup', { message: 'Something went wrong' });
			});
	});
};

exports.confirmAccount = async (req, res) => {
	const { confirmationCode } = req.params;
	const user = await User.findOneAndUpdate(
		{ confirmationCode },
		{
			status: 'Active'
		},
		{
			new: true
		}
	);
	req.app.locals.confirmed = true;
	res.render('auth/login', { confirmed: 'Cuenta verificada! Inicia sesion para continuar...' });
};

exports.logout = (req, res) => {
	req.logout();
	res.redirect('/');
};
