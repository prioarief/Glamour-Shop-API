const express = require('express');
const {
	Register,
	Verification,
	Login,
	RefreshToken,
} = require('../controllers/AuthController');
const router = express.Router();

router.post('/register', Register);
router.post('/verify', Verification);
router.post('/login', Login);
router.post('/refresh-token', RefreshToken);

module.exports = router;
