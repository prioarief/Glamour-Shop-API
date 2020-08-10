const joi = require("@hapi/joi");

const schema = {
  addColorsValidation: joi.object({
    color: joi.string().required(),
  }),

  updateColorsValidation: joi.object({
    color: joi.string().required(),
  }),
};

module.exports = schema;
