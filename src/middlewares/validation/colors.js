const joi = require("@hapi/joi");

const schema = {
  addColorsValidation: joi.object({
    category: joi.string().required(),
  }),

  updateColorsValidation: joi.object({
    category: joi.string().required(),
  }),
};

module.exports = schema;
