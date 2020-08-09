const auth = require("../middlewares/validation/auth");
const profile = require("../middlewares/validation/profile");
const products = require("../middlewares/validation/products");
const categories = require("../middlewares/validation/categories");

module.exports = {
  RegisterValidation: (data) => {
    return auth.registerValidation.validate(data);
  },
  LoginValidation: (data) => {
    return auth.loginValidation.validate(data);
  },
  VerifyValidation: (data) => {
    return auth.verifyValidation.validate(data);
  },
  editValidation: (data) => {
    return profile.editValidation.validate(data);
  },
  addAddressVal: (data) => {
    return profile.addAddressVal.validate(data);
  },
  editAddressVal: (data) => {
    return profile.editAddressVal.validate(data);
  },
  AddProductsValidation: (data) => {
    return products.addProductsValidation.validate(data);
  },
  UpdateProductsValidation: (data) => {
    return products.updateProductsValidation.validate(data);
  },
  AddCategoriesValidation: (data) => {
    return categories.addCategoriesValidation.validate(data);
  },
  UpdateCategoriesValidation: (data) => {
    return categories.updateCategoriesValidation.validate(data);
  },
};
