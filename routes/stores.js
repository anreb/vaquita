const express = require('express');
const router = express.Router();
const { checkUser } = require('../middlewares/index');
const {
	storesView,
	createStore,
	storePromosView,
	deleteStore,
	editStoreView,
	editStoreProcess
} = require('../controllers/stores.controller');
const uploadCloud = require('../config/cloudinary');

router.get('/', storesView);
router.get('/:id', storePromosView);
router.post('/new', uploadCloud.single('photo'), createStore);
router.post('/:id/delete', deleteStore);
router.get('/:id/edit', editStoreView);
router.post('/:id/edit', uploadCloud.single('photo'), editStoreProcess);

module.exports = router;
