const express = require('express');
const tokenCheck = require('../middlewares/TokenCheck');
const { editProfile } = require('../controllers/ProfileController');
const router = express.Router();
const ImageFilter = require('../middlewares/ImageFilter');

router.put('/', tokenCheck, ImageFilter, editProfile);

module.exports = router;
