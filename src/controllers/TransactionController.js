const { response } = require('../helpers/response');
const {
	insertTransaction,
	insertTransactionDetail,
	getAllTransactions,
	getMyTransactions,
	getDetailTransactions,
} = require('../models/Transaction');
const { insertTransactionVal } = require('../helpers/validation');

module.exports = {
	insertTransaction: async (req, res) => {
		try {
			const dummy = req.body.items;
			const user_id = req.decoded.result[0].id;
			const data = {
				total: parseInt(req.body.total),
				user_id: user_id,
			};

			const validation = insertTransactionVal(data);
			if (validation.error === undefined) {
				const inserted = await insertTransaction(data);
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
			const id = parseInt(req.decoded.result[0].id)
			const result = await getMyTransactions(id);
			return response(res, true, result, 200);
		} catch (error) {
			console.log(error);
		}
	},
	getDetailTransaction: async (req, res) => {
		try {
			const id = req.params.id
			const result = await getDetailTransactions(id);
			return response(res, true, result, 200);
		} catch (error) {
			console.log(error);
		}
	},
};
