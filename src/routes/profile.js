const express = require('express');
const tokenCheck = require('../middlewares/TokenCheck');
const { editProfile, getMyAddress } = require('../controllers/ProfileController');
const router = express.Router();
const ImageFilter = require('../middlewares/ImageFilter');

router.put('/', tokenCheck, ImageFilter, editProfile);
router.get('/my-address', tokenCheck, getMyAddress)

module.exports = router;
