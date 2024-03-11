const validator = require('validator');

const password = (value, helpers) => {
  if (!validator.isStrongPassword(value))
    helpers.message(
      'Password atleast 8 chars with a uppercase, lowercase, number and special character',
    );
  return value;
};

module.exports = { password };
