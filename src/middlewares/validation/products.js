const joi = require("@hapi/joi");

const schema = {
  addProductsValidation: joi.object({
    products: joi.string().required(),
    image: joi.string().required(),
    description: joi.string().required(),
    stock: joi.number().required(),
    price: joi.number().required(),
    category_id: joi.number().required(),
    size_id: joi.number().required(),
    color_id: joi.number().required(),
  }),

  updateProductsValidation: joi.object({
    products: joi.string().required(),
    image: joi.string().required(),
    description: joi.string().required(),
    stock: joi.number().required(),
    price: joi.number().required(),
    category_id: joi.number().required(),
    size_id: joi.number().required(),
    color_id: joi.number().required(),
  }),
};

module.exports = schema;
