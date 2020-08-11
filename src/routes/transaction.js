const express = require('express');
const {
	insertTransaction,
	getAllTransaction,
	getMyTransaction,
	getDetailTransaction,
	insertToCart,
	updateCart,
	deleteCart
} = require('../controllers/TransactionController');
const TokenCheck = require('../middlewares/TokenCheck');
const router = express.Router();

router.post('/', TokenCheck, insertTransaction);
router.get('/', TokenCheck, getAllTransaction);
router.get('/detail/:id', TokenCheck, getDetailTransaction);
router.get('/my-transaction', TokenCheck, getMyTransaction);
router.post('/cart', TokenCheck, insertToCart);
router.put('/cart/:id', TokenCheck, updateCart);
router.delete('/cart/:id', TokenCheck, deleteCart);

module.exports = router;
