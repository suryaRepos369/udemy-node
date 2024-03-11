const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const config = require('../../config/config');
// const catchAsync = require("../../utils/catchAsync");
const Token = require('../../models/token');
const ApiError = require('../../utils/ApiError');
const { logger } = require('../../config/logger');

const tokenTypes = {
  ACCESS: 'access',
  REFRESH: 'refresh',
};
const generateToken = async (userId, type) => {
  const payload = {
    sub: userId,
    iat: dayjs().unix(),
    exp: dayjs()
      .add(
        type == tokenTypes.ACCESS ? Number(config.jwt.expiry) : 1440,
        'minutes',
      )
      .unix(),
    type: type == tokenTypes.ACCESS ? tokenTypes.ACCESS : tokenTypes.REFRESH,
  };
  const t = await jwt.sign(payload, config.jwt.secret);
  return t;
};

const saveToken = async (token, userId, type, blacklisted = false) => {
  const tokenRes = await Token.create({
    token,
    user: userId,
    // expires:expires.toDate(),
    type,
    blacklisted,
  });
  logger.info(`${type} token saved `);
  return tokenRes;
};

const verifyToken = async (token, type) => {
  const payload = jwt.verify(token, config.jwt.secret);
  const tokenDoc = await Token.findOne({ user: payload.sub, type });
  if (!tokenDoc) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Authorization failed');
  }
  return tokenDoc;
};

module.exports = { generateToken, saveToken, verifyToken };
