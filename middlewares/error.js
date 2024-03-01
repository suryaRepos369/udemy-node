const { default: mongoose } = require("mongoose");
const config = require("../config/config");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const { logger } = require("../config/logger");
const errorHandler = (err, req, res, next) => {
  // console.log('**************************error handler called')
  let { statusCode, message } = err;

  if (config.env === "production" && err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = message || httpStatus[statusCode];
  }
  const response = {
    error: true,
    code: statusCode || 400,
    message,
    ...(config.env === "developement" && { stack: err.stack }),
  };
  logger.error(`error response sent to user:: ${message}`);
  res.status(statusCode).send(response);
};

const errorConverter = (err, req, res, next) => {
  // console.log('*********************************error converted called', err.message)
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || config.env === "development"
        ? httpStatus.BAD_REQUEST
        : error instanceof mongoose.Error
          ? httpStatus.BAD_REQUEST
          : httpStatus.INTERNAL_SERVER_ERROR;
    const message = err.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, error.stack);
  }
  next(error);
};

module.exports = { errorHandler, errorConverter };
