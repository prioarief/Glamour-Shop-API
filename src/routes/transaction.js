const express = require('express');
const {
	insertTransaction,
	insertTransactionDetails,
} = require('../controllers/TransactionController');
const TokenCheck = require('../middlewares/TokenCheck');
const router = express.Router();

router.post('/', TokenCheck, insertTransaction);
router.post('/detail', TokenCheck, insertTransactionDetails);

module.exports = router;
