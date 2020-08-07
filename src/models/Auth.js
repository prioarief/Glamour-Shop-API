const connection = require('../config/database');

module.exports = {
	Register: (data) => {
		return new Promise((resolve, reject) => {
			connection.query('INSERT INTO users SET ?', data, (error, result) => {
				if (error) {
					return reject(error);
                }
                const response = {
                    id: result.insertId,
                    ... data
                }
				resolve(response);
			});
		});
	},
	Login: (data) => {
		return new Promise((resolve, reject) => {
			connection.query('SELECT * FROM users WHERE email = ?', data, (error, result) => {
				if (error) {
					return reject(error);
                }
				resolve(result);
			});
		});
	},
	insertOTP: (data) => {
		return new Promise((resolve, reject) => {
			connection.query('INSERT INTO otp SET ?', data, (error, result) => {
				if (error) {
					return reject(error);
                }
				resolve(result);
			});
		});
	},
	checkOTP: (data) => {
		return new Promise((resolve, reject) => {
			connection.query('SELECT * FROM otp WHERE email = ?', data, (error, result) => {
				if (error) {
					return reject(error);
                }
				resolve(result);
			});
		});
	},
	deleteOTP: (data) => {
		return new Promise((resolve, reject) => {
			connection.query('DELETE FROM otp WHERE email = ?', data, (error, result) => {
				if (error) {
					return reject(error);
                }
				resolve(result);
			});
		});
	},
	updateUser: (data, id) => {
		return new Promise((resolve, reject) => {
			connection.query('UPDATE users SET ? WHERE email=?', [data, id], (error, result) => {
				if (error) {
					return reject(error);
                }
				resolve(result);
			});
		});
	},
};
