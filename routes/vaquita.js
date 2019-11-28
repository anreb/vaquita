const express = require('express');
const router = express.Router();
const { vaquitaView } = require('../controllers/vaquita.controller');

router.get('/', vaquitaView);

module.exports = router;
