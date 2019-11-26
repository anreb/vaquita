const express = require('express');
const router = express.Router();
const { checkUser } = require('../middlewares/index');
const { promosView, createPromo, deletePromo } = require('../controllers/promos.controller');
const uploadCloud = require('../config/cloudinary');

router.get('/', promosView);
router.post('/new', uploadCloud.single('photo'), createPromo);
router.post('/:id/delete', deletePromo);

module.exports = router;
