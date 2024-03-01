const joi = require("joi");
const { password } = require("./customValidation");
const createUserSchema = {
  body: joi.object().keys({
    email: joi.string().required(),
    password: joi.custom(password).required(),
    name: joi.string().required(),
  }),
};

module.exports = { createUserSchema };
