const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.EMAIL,
		pass: process.env.PASS
	}
});

exports.transporter = transporter;

exports.sendEmailView = (req, res) => {
	res.render('sendmail');
};

exports.sendEmail = async (req, res) => {
	const { email, subject, message } = req.body;
	await transporter.sendMail({
		from: 'Vaquita Support vaquita_support@gmail.com>',
		to: email,
		subject: 'Verificar cuenta',
		text: message,
		html: `<b>${message}</b>`
	});

	res.render('message', { email, subject, message });
};
