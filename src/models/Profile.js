const connection = require('../config/database');
const query = require('../helpers/query/profile');

module.exports = {
	editUser: (data, id) => {
		return new Promise((resolve, reject) => {
			connection.query(query.editUser, [data, id], (error, result) => {
				if (error) {
					return reject(error);
				}
				resolve(result);
			});
		});
	},
	getData: (id) => {
		return new Promise((resolve, reject) => {
			connection.query(query.getData, id, (error, result) => {
				if (error) {
					return reject(error);
				}
				resolve(result);
			});
		});
	},
	addAddress: (data) => {
		return new Promise((resolve, reject) => {
			connection.query(query.addAdress, data, (error, result) => {
				if (error) {
					return reject(error);
				}
				const response = {
					id: result.insertId,
					...data,
				};
				resolve(response);
			});
		});
	},
	editAddress: (data, id) => {
		return new Promise((resolve, reject) => {
			connection.query(query.editAdress, [data, id], (error, result) => {
				if (error) {
					return reject(error);
				}
				const response = {
					id: id,
					...data,
				};
				resolve(response);
			});
		});
	},
};
