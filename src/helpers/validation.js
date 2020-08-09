const auth = require('../middlewares/validation/auth');
const profile = require('../middlewares/validation/profile');
const products = require('../middlewares/validation/products')

module.exports = {
	RegisterValidation: (data) => {
		return auth.registerValidation.validate(data);
	},
	LoginValidation: (data) => {
		return auth.loginValidation.validate(data);
	},
	VerifyValidation: (data) => {
		return auth.verifyValidation.validate(data)
	},
	editValidation: (data) => {
		return profile.editValidation.validate(data)
  },
  AddProductsValidation: (data) => {
    return products.addProductsValidation.validate(data);
  },
  UpdateProductsValidation: (data) => {
    return products.updateProductsValidation.validate(data);
  },
};
