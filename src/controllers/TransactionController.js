const { response } = require('../helpers/response');
const {
	insertTransaction,
	insertTransactionDetail,
} = require('../models/Transaction');
const { getProductDetailsModel } = require('../models/Products');
const { insertTransactionVal } = require('../helpers/validation');

module.exports = {
	insertTransaction: async (req, res) => {
		try {
            const dummy = req.body.items
			const user_id = req.decoded.result[0].id;
			const data = {
				total: parseInt(req.body.total),
				user_id: user_id,
			};

			const validation = insertTransactionVal(data);
			if (validation.error === undefined) {
				const inserted = await insertTransaction(data);
				dummy.map(async (data) => {
                    data.transaction_id = inserted.id
					insertTransactionDetail(data);
                });
                inserted.items = dummy
				return response(res, true, inserted, 200);
			}
			let errorMessage = validation.error.details[0].message;
			errorMessage = errorMessage.replace(/"/g, '');
			return response(res, false, errorMessage, 400);
		} catch (error) {
			console.log(error);
		}
	},
	insertTransactionDetails: async (req, res) => {
		try {
			console.log(req.body);
		} catch (error) {}
	},
};
