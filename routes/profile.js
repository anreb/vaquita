const express = require('express');
const router = express.Router();
const { profileView } = require('../controllers/profile.controller');

router.get('/', profileView);

module.exports = router;
