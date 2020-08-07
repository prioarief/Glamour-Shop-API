const express = require('express');
const { Register, Verification } = require('../controllers/AuthController');
const router = express.Router();

router.post('/register', Register);
router.post('/verify', Verification);

module.exports = router;
