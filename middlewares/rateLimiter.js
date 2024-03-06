const mongoose = require("mongoose");
const { RateLimiterMongo } = require("rate-limiter-flexible");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const maxAttemptsPerDay = 100;
const maxAttemptsByIpUsername = 10;
const maxAttemptsByEmail = 20;

const emailIpBruteLimiter = new RateLimiterMongo({
  storeClient: mongoose.connection,
  points: maxAttemptsByIpUsername,
  duration: 60 * 60 * 24,
  blockDuration: 60 * 5,
  dbName: "test1",
});

const slowerBruteLimiter = new RateLimiterMongo({
  storeClient: mongoose.connection,
  points: maxAttemptsPerDay,
  duration: 60 * 60 * 24,
  blockDuration: 60 * 60 * 24,
  dbName: "test1",
});
const emailBruteLimiter = new RateLimiterMongo({
  storeClient: mongoose.connection,
  points: maxAttemptsPerDay,
  duration: 60 * 60 * 24,
  blockDuration: 60 * 60 * 24,
  dbName: "test1",
});

const authLimiter = async (req, res, next) => {
  try {
    const ipAddress = req.connection.remoteAddress;
    const emailIpKey = `${req.body.email}_${ipAddress}`;
    const [slowerBruteRes, emailIpRes, emailRes] = await Promise.all([
      slowerBruteLimiter.get(ipAddress),
      emailIpBruteLimiter.get(emailIpKey),
      emailBruteLimiter.get(req.body.email),
    ]);

    console.log("&&&&&&&&&&&&&&", slowerBruteRes);
    console.log("%%%%%%%%%%%%%% email Ip logins", emailIpRes);
    let retrySeconds = 0;

    if (slowerBruteRes && slowerBruteRes.consumedPoints > maxAttemptsPerDay) {
      retrySeconds = Math.floor(slowerBruteRes.msBeforeNext / 1000) || 1;
    } else if (
      emailIpRes &&
      emailIpRes.consumedPoints > maxAttemptsByIpUsername
    ) {
      retrySeconds = Math.floor(emailIpRes.msBeforeNext / 1000) || 1;
    } else if (emailRes && emailRes.consumedPoints > maxAttemptsByIpUsername) {
      retrySeconds = Math.floor(emailIpRes.msBeforeNext / 1000) || 1;
    }

    console.log("retry seconds", retrySeconds);
    if (retrySeconds > 0) {
      console.log("retry second >0 ");
      res.set("Retry-After", String(retrySeconds));
      return next(
        new ApiError(httpStatus.TOO_MANY_REQUESTS, "Too many requests"),
      );
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authLimiter,
  emailIpBruteLimiter,
  slowerBruteLimiter,
  emailBruteLimiter,
};
