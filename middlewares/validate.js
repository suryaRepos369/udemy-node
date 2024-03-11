const joi = require('joi');
const ApiError = require('../utils/ApiError');
// const { logger } = require("../config/logger");

const validateSchema = (schema) => (req, res, next) => {
  const keys = ['body'];
  const object = keys.reduce((obj, key) => {
    if (Object.prototype.hasOwnProperty.call(req, key)) {
      obj[key] = req[key];
    }
    return obj;
  }, {});
  const { error } = joi.compile(schema).validate(object);
  if (error) {
    const errors = error.details.map((detail) => detail.message).join(',');
    next(new ApiError(400, errors));
  } else {
    return next();
  }
};

module.exports = validateSchema;
