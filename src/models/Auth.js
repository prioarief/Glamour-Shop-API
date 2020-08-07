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
};
