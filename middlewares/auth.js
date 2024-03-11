const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const verifyCallBack = (req, resolve, reject) => (err, user, info) => {
  try {
    if (err || info || !user) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
    }

    req.user = user;
    resolve();
  } catch (error) {
    reject(error);
  }
};

const authMiddleware = (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate(
      'jwt',
      { session: false },
      verifyCallBack(req, resolve, reject),
    )(req, res, next);
  })
    .then(() => next())
    .catch((err) => next(err));
};

module.exports = authMiddleware;
