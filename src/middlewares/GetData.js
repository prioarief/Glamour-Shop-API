const {response} = require('../helpers/response');

module.exports = {
	getData: (req, res, next) => {
		try {
			const redis = req.redis;
			return redis.get('address', (err, address) => {
				if (address) {
					const data = JSON.parse(address)
					const filtered = data.filter((a) => {
						return a.user_id === req.decoded.result[0].id
					})
					return response(res, true, filtered, 200);
                }
                req.redis = redis
				next();
			});
		} catch (error) {
			console.log(error);
		}
	},
};
