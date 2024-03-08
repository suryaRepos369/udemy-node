const express = require("express");
const app = new express();
const cors = require("cors");

const blogRouter = require("./router/blog/router");
const userRouter = require("./router/user/router");
const authRouter = require("./router/auth/auth");
const streamRouter = require("./router/stream/route");

const { errorHandler, errorConverter } = require("./middlewares/error");
const httpStatus = require("http-status");
const ApiError = require("./utils/ApiError");
const morgan = require("./config/morgan");
const log = require("./config/logger");
const passport = require("passport");
const { JwtStrategy } = require("./config/passport");

log.attachLogger(app);
app.use(cors());
app.use(morgan);
app.use(express.json());
app.use(
  cors({
    origin: "*", // Specify the allowed origin
    // Respond with a 204 No Content status for preflight requests
  }),
);

app.use(passport.initialize());
passport.use("jwt", JwtStrategy);

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
