const express = require('express');
const {
	insertTransaction,
	getAllTransaction,
	getMyTransaction,
	getDetailTransaction
} = require('../controllers/TransactionController');
const TokenCheck = require('../middlewares/TokenCheck');
const router = express.Router();

router.post('/', TokenCheck, insertTransaction);
router.get('/', TokenCheck, getAllTransaction);
router.get('/detail/:id', TokenCheck, getDetailTransaction);
router.get('/my-transaction', TokenCheck, getMyTransaction);

module.exports = router;
