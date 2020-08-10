const joi = require("@hapi/joi");

const schema = {
  addSizesValidation: joi.object({
    size: joi.string().required(),
  }),

  updateSizesValidation: joi.object({
    size: joi.string().required(),
  }),
};

module.exports = schema;
