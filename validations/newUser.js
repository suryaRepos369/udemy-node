const joi = require("joi");
const { password } = require("./customValidation");
const createUserSchema = {
  body: joi.object().keys({
    name: joi.string().required(),
    email: joi.string().required(),
    password: joi.custom(password).required(),
  }),
};
const loginUserSchema = {
  body: joi.object().keys({
    email: joi.string().required(),
    password: joi.custom(password).required(),
  }),
};

module.exports = { createUserSchema, loginUserSchema };
