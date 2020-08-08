const express = require('express');
const {
	Register,
	Verification,
	Login,
} = require('../controllers/AuthController');
const router = express.Router();

router.post('/register', Register);
router.post('/verify', Verification);
router.post('/login', Login);

module.exports = router;
