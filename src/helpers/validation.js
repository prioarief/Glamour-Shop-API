const auth = require("../middlewares/validation/auth");
const profile = require("../middlewares/validation/profile");
const products = require("../middlewares/validation/products");
const transaction = require("../middlewares/validation/transaction");
const categories = require("../middlewares/validation/categories");
const colors = require("../middlewares/validation/colors");
const sizes = require("../middlewares/validation/sizes");

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
  insertTransactionVal: (data) => {
    return transaction.insertTransaction.validate(data);
  },
  insertCartVal: (data) => {
    return transaction.insertCart.validate(data);
  },
  AddCategoriesValidation: (data) => {
    return categories.addCategoriesValidation.validate(data);
  },
  UpdateCategoriesValidation: (data) => {
    return categories.updateCategoriesValidation.validate(data);
  },
  AddColorsValidation: (data) => {
    return colors.addColorsValidation.validate(data);
  },
  UpdateColorsValidation: (data) => {
    return colors.updateColorsValidation.validate(data);
  },
  AddSizesValidation: (data) => {
    return sizes.addSizesValidation.validate(data);
  },
  UpdateSizesValidation: (data) => {
    return sizes.updateSizesValidation.validate(data);
  },
  forgotPassVal: (data) => {
    return auth.forgotPassValidation.validate(data)
  },
  changePassVal: (data) => {
    return auth.changePassValidation.validate(data)
  },
};
