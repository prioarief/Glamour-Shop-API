const express = require('express');
const tokenCheck = require('../middlewares/TokenCheck');
const {
	editProfile,
	insertMyAddress,
	editMyAddress,
	getMyAddress,
	getDetailMyAddress,
	deleteMyAddress,
} = require('../controllers/ProfileController');
const router = express.Router();
const ImageFilter = require('../middlewares/ImageFilter');

router.put('/', tokenCheck, ImageFilter, editProfile);
router.post('/my-address', tokenCheck, insertMyAddress);
router.get('/my-address', tokenCheck, getMyAddress);
router.put('/my-address/:id', tokenCheck, editMyAddress);
router.get('/my-address/:id', tokenCheck, getDetailMyAddress);
router.delete('/my-address/:id', tokenCheck, deleteMyAddress);

module.exports = router;
