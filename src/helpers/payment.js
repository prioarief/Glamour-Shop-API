const midtransClient = require('midtrans-client');

module.exports = {
	payment: async (data) => {
		let result = null;
		let snap = new midtransClient.Snap({
			// Set to true if you want Production Environment (accept real transaction).
			isProduction: false,
			serverKey: 'SB-Mid-server-e-BoGKjll_KyFBRmwrfY88v-',
		});

		let parameter = {
			transaction_details: {
				order_id: `ORDER-00${data.id}`,
				gross_amount: data.total * 13000,
			},
			credit_card: {
				secure: true,
			},
			customer_details: {
				first_name: data.user.name.split(' ')[0],
				last_name: data.user.name.split(' ')[1],
				email: data.user.email,
				shipping_address: {
					first_name: data.address.name.split(' ')[0],
					last_name: data.address.name.split(' ')[1],
					phone: data.address.telp,
					address: data.address.address,
					city: data.address.city,
					postal_code: data.address.zipcode,
				},
			},
		};

		await snap.createTransaction(parameter).then(async (transaction) => {
			// transaction token
			// let transactionToken = transaction.token;
            result = await transaction;
		});
		return result;
	},
};
