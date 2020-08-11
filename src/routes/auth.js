const express = require('express');
const {
	Register,
	Verification,
	Login,
	RefreshToken,
	ForgotPassword,
	ChangePassword,
} = require('../controllers/AuthController');
const router = express.Router();

router.post('/register', Register);
router.post('/verify', Verification);
router.post('/login', Login);
router.post('/refresh-token', RefreshToken);
router.post('/forgot-password', ForgotPassword);
router.post('/change-password', ChangePassword);

module.exports = router;
