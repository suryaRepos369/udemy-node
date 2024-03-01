const dayjs = require("dayjs");
const jwt = require("jsonwebtoken");
const config = require("../../config/config");
const catchAsync = require("../../utils/catchAsync");
catchAsync;
const tokenTypes = {
  ACCESS: "access",
  REFRESH: "refresh",
};
const generateToken = async (userId, type) => {
  const payload = {
    sub: userId,
    iat: dayjs().unix(),
    exp: dayjs()
      .add(
        type == tokenTypes.ACCESS ? Number(config.jwt.expiry) : 1440,
        "minutes",
      )
      .unix(),
    type: type == tokenTypes.ACCESS ? tokenTypes.ACCESS : tokenTypes.REFRESH,
  };
  const t = await jwt.sign(payload, config.jwt.secret);
  return t;
};

module.exports = generateToken;
