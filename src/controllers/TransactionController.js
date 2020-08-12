const { response } = require('../helpers/response');
const {
	insertTransaction,
	insertTransactionDetail,
	getAllTransactions,
	getMyTransactions,
	getDetailTransactions,
	checkItems,
	insertCart,
	updateCart,
	checkAvailable,
	deleteCart
} = require('../models/Transaction');
const {
	insertTransactionVal,
	insertCartVal,
} = require('../helpers/validation');
const { getProductDetailsModel } = require('../models/Products');
const {payment} = require('../helpers/payment');
const { getDetailMyAddress } = require('../models/Profile');

module.exports = {
	insertTransaction: async (req, res) => {
		try {
			const dummy = req.body.items;
			const user_id = req.decoded.result[0].id;
			const data = {
				total: parseInt(req.body.total),
				shipping_address: parseInt(req.body.address),
				user_id: user_id,
			};

			const validation = insertTransactionVal(data);
			if (validation.error === undefined) {
				const inserted = await insertTransaction(data);
				data.id = inserted.id
				data.user = req.decoded.result[0]
				const address = await getDetailMyAddress(inserted.shipping_address)
				data.address = address[0]
				const pay = await payment(data)
				inserted.payment = pay
				dummy.map(async (data) => {
					data.transaction_id = inserted.id;
					insertTransactionDetail(data);
				});
				inserted.items = dummy;
				return response(res, true, inserted, 200);
			}
			let errorMessage = validation.error.details[0].message;
			errorMessage = errorMessage.replace(/"/g, '');
			return response(res, false, errorMessage, 400);
		} catch (error) {
			console.log(error);
		}
	},
	getAllTransaction: async (req, res) => {
		try {
			const result = await getAllTransactions();
			return response(res, true, result, 200);
		} catch (error) {
			console.log(error);
		}
	},
	getMyTransaction: async (req, res) => {
		try {
			const id = parseInt(req.decoded.result[0].id);
			const result = await getMyTransactions(id);
			return response(res, true, result, 200);
		} catch (error) {
			console.log(error);
		}
	},
	getDetailTransaction: async (req, res) => {
		try {
			const id = req.params.id;
			console.log(id);
			const result = await getDetailTransactions(id);
			return response(res, true, result, 200);
		} catch (error) {
			console.log(error);
		}
	},
	insertToCart: async (req, res) => {
		try {
			const data = {
				product_id: parseInt(req.body.product_id),
				user_id: req.decoded.result[0].id,
				qty: 1,
			};
			const validation = insertCartVal(data);
			if (validation.error === undefined) {
				const checkItem = await checkItems(data.user_id, data.product_id);
				if (checkItem.length === 0) {
					const inserted = await insertCart(data);
					return response(res, true, inserted, 200);
				}
				let qty = checkItem[0].qty;
				data.qty = qty + 1;
				const id = checkItem[0].id;
				const stockCheck = await getProductDetailsModel(data.product_id)
				if(data.qty <= stockCheck[0].stock) {
					const updated = await updateCart(data, id);
					return response(res, true, updated, 200);
				}
				return response(res, true, `Stock just available ${stockCheck[0].stock}`, 400);
			}
			let errorMessage = validation.error.details[0].message;
			errorMessage = errorMessage.replace(/"/g, '');
			return response(res, false, errorMessage, 400);
		} catch (error) {
			console.log(error);
		}
	},
	updateCart: async (req, res) => {
		try {
			const id = parseInt(req.params.id)
			const data = {
				qty: parseInt(req.body.qty)
			};
			if(!isNaN(data.qty) && data.qty.length !== 0 && !isNaN(id) && id.length !== 0){
				const checked = await checkAvailable(id)
				if(checked.length !== 0) {
					const stockCheck = await getProductDetailsModel(checked[0].product_id)
					if(data.qty <= stockCheck[0].stock) {
						const updated = await updateCart(data, id)
						return response(res, true, updated, 200)
					}
					return response(res, true, `Stock just available ${stockCheck[0].stock}`, 400);
				}
			}
			let errorMessage = 'qty must integer and not empty'
			return response(res, false, errorMessage, 400);
		} catch (error) {
			console.log(error);
		}
	},
	deleteCart: async (req, res) => {
		try {
			const id = parseInt(req.params.id)
			if(!isNaN(id) && id.length !== 0){
				const checked = await checkAvailable(id)
				if(checked.length !== 0) {
					const deleted = await deleteCart(id)
					if(deleted.affectedRows === 1){
						return response(res, true, 'Has been deleted', 200)
					}
					return response(res, true, 'Has not been deleted', 200)
				}
				return response(res, false, 'Data not found', 404)
			}
			let errorMessage = 'qty must integer and not empty'
			return response(res, false, errorMessage, 400);
		} catch (error) {
			console.log(error);
		}
	},
};
