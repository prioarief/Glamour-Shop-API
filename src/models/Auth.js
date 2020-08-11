const connection = require('../config/database');
const query = require('../helpers/query/auth');

module.exports = {
	Register: (data) => {
		return new Promise((resolve, reject) => {
			connection.query(query.register, data, (error, result) => {
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
	Login: (data) => {
		return new Promise((resolve, reject) => {
			connection.query(query.login, data, (error, result) => {
				if (error) {
					return reject(error);
				}
				resolve(result);
			});
		});
	},
	insertOTP: (data) => {
		return new Promise((resolve, reject) => {
			connection.query(query.sendOTP, data, (error, result) => {
				if (error) {
					return reject(error);
				}
				resolve(result);
			});
		});
	},
	checkOTP: (data) => {
		return new Promise((resolve, reject) => {
			connection.query(query.checkOTP, data, (error, result) => {
				if (error) {
					return reject(error);
				}
				resolve(result);
			});
		});
	},
	deleteOTP: (data) => {
		return new Promise((resolve, reject) => {
			connection.query(query.deleteOTP, data, (error, result) => {
				if (error) {
					return reject(error);
				}
				resolve(result);
			});
		});
	},
	updateUser: (data, id) => {
		return new Promise((resolve, reject) => {
			connection.query(query.updateUser, [data, id], (error, result) => {
				if (error) {
					return reject(error);
				}
				resolve(result);
			});
		});
	},
};
