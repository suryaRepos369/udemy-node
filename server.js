const express = require("express");
const app = new express();
const cors = require("cors");
const passport = require("passport");
const httpStatus = require("http-status");
const { xss } = require("express-xss-sanitizer");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");

const { errorHandler, errorConverter } = require("./middlewares/error");
const ApiError = require("./utils/ApiError");
const morgan = require("./config/morgan");
const log = require("./config/logger");
const { JwtStrategy } = require("./config/passport");

const blogRouter = require("./router/blog/router");
const userRouter = require("./router/user/router");
const authRouter = require("./router/auth/auth");
const streamRouter = require("./router/stream/route");
const config = require("./config/config");

log.attachLogger(app);
app.use(cors());
app.use(morgan);
app.use(express.json());
app.use(passport.initialize());
app.use(mongoSanitize());
passport.use("jwt", JwtStrategy);

//it will filter out scripts in the requests so that it'll be empty
app.use(xss());
app.use(
  cors({
    origin: "*", // Specify the allowed origin
    // Respond with a 204 No Content status for preflight requests
  }),
);

app.use(
  helmet({
    contentSecurityPolicy: config.cspOptions,
  }),
);

app.use("/blog", blogRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/stream", streamRouter);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});
app.use(errorConverter);
app.use(errorHandler);

module.exports = app;
