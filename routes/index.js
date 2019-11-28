const express = require('express');
const router = express.Router();
const { checkUser } = require('../middlewares/index');
const { feedView, feedSearch } = require('../controllers/index.controller');

/* GET home page */
router.get('/', feedView);
router.post('/', feedSearch);

module.exports = router;
