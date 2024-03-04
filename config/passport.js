const { Strategy, ExtractJwt } = require("passport-jwt");
const config = require("./config");
const { getUserById } = require("../services/user/user");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    if (payload.type != "access") {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid token type");
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
