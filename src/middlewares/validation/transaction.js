const joi = require("@hapi/joi");

const schema = {
  insertTransaction: joi.object({
    total: joi.number().required(),
    user_id: joi.number().required(),
  }),
};

module.exports = schema;
