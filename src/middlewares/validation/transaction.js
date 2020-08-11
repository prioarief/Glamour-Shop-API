const joi = require("@hapi/joi");

const schema = {
  insertTransaction: joi.object({
    total: joi.number().required(),
    user_id: joi.number().required(),
  }),
  insertCart: joi.object({
    product_id: joi.number().required(),
    user_id: joi.number().required(),
    qty: joi.number().required(),
  }),
};

module.exports = schema;
