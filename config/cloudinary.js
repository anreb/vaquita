require('dotenv').config();

const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_KEY,
	api_secret: process.env.CLOUDINARY_SECRET
});

const storage = cloudinaryStorage({
	cloudinary,
	folder: 'profile-pics',
	allowedFormats: [ 'jpg', 'png', 'gif' ],
	filename: function(req, file, done) {
		done(null, file.originalname);
	}
});

module.exports = multer({ storage });
