const { Strategy, ExtractJwt } = require('passport-jwt');
const httpStatus = require('http-status');
const config = require('./config');
const { getUserById } = require('../services/user/user');
const ApiError = require('../utils/ApiError');

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const tokenType = ['access', 'refresh'];

const jwtVerify = async (payload, done) => {
  try {
    if (!tokenType.includes(payload.type)) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token type');
    }
    const user = await getUserById(payload.sub);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const JwtStrategy = new Strategy(jwtOptions, jwtVerify);

module.exports = { JwtStrategy };
