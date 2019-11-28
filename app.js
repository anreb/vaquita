require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');

mongoose
	.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((x) => {
		console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
	})
	.catch((err) => {
		console.error('Error connecting to mongo', err);
	});

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(
	require('node-sass-middleware')({
		src: path.join(__dirname, 'public'),
		dest: path.join(__dirname, 'public'),
		sourceMap: true
	})
);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

hbs.registerHelper('ifUndefined', (value, options) => {
	if (arguments.length < 2) throw new Error('Handlebars Helper ifUndefined needs 1 parameter');
	if (typeof value !== undefined) {
		return options.inverse(this);
	} else {
		return options.fn(this);
	}
});

// default value for title local
app.locals.title = 'Vaquita';

// Enable authentication using session + passport
app.use(
	session({
		secret: 'patata',
		resave: true,
		saveUninitialized: true,
		store: new MongoStore({ mongooseConnection: mongoose.connection })
	})
);
app.use(flash());
require('./passport')(app);

const index = require('./routes/index');
const authRoutes = require('./routes/auth');
const promoRoutes = require('./routes/promos');
const storeRoutes = require('./routes/stores');
const profileRoutes = require('./routes/profile');
const vaquitaRoutes = require('./routes/vaquita');
const { checkUser, isAuth, isAdmin, checkAdmin } = require('./middlewares');
app.use('/', checkUser, checkAdmin, vaquitaRoutes);
app.use('/feed', index);
app.use('/auth', authRoutes);
app.use('/promos', isAuth, checkUser, promoRoutes);
app.use('/stores', isAuth, checkUser, isAdmin, storeRoutes);
app.use('/profile', isAuth, checkUser, profileRoutes);

module.exports = app;
