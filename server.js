const express = require("express");
const app = new express();
const blogRouter = require("./router/blog/router");
const userRouter = require("./router/user/router");
const authRouter = require("./router/auth/auth");

const { errorHandler, errorConverter } = require("./middlewares/error");
const httpStatus = require("http-status");
const ApiError = require("./utils/ApiError");
const morgan = require("./config/morgan");
const log = require("./config/logger");

log.attachLogger(app);

app.use(morgan);
app.use(express.json());
app.use("/blog", blogRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});
app.use(errorConverter);
app.use(errorHandler);

module.exports = app;
