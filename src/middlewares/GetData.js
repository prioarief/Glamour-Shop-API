const {response} = require('../helpers/response');
const { json } = require('body-parser');

module.exports = {
	getData: (req, res, next) => {
		try {
			const redis = req.redis;
			return redis.get('address', (err, photos) => {
				if (photos) {
					return response(res, true, JSON.parse(photos), 200);
                }
                req.redis = redis
				next();
			});
		} catch (error) {
			console.log(error);
		}
	},
};
