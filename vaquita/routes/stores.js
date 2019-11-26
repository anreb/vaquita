const express = require('express');
const router = express.Router();
const { checkUser } = require('../middlewares/index');
const { feedView } = require('../controllers/index.controller');
