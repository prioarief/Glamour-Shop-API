const auth = require('../middlewares/validation/auth');

module.exports = {
	RegisterValidation: (data) => {
		return auth.registerValidation.validate(data);
	},
	LoginValidation: (data) => {
		return auth.loginValidation.validate(data);
	},
};
