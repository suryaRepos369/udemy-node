const express = require("express");
const router = express.Router();
const { loginUserSchema } = require("./../../validations/newUser.js");
const validateBody = require("../../middlewares/validate.js");
const catchAsync = require("../../utils/catchAsync.js");
const httpStatus = require("http-status");
const ApiResponse = require("../../utils/ApiResponse.js");
const { login, refreshAuthToken } = require("../../services/auth/auth.js");
const getBearerToken = require("../../utils/BearerToken.js");
const authMiddleware = require("../../middlewares/auth.js");
const { authLimiter } = require("../../middlewares/rateLimiter.js");

// const auth = require("../../middlewares/auth.js");
// router.use(auth);
router.post(
  "/login",
  authLimiter,
  validateBody(loginUserSchema),
  catchAsync(async (req, res, next) => {
    const ipAddress = req.connection.remoteAddress;
    const body = req.body;
    body.ipAddress = ipAddress;
    const a = await login(body);
    return new ApiResponse(httpStatus.OK, "Login success", a);
  }),
);

router.get(
  "/getAccesstoken",
  authMiddleware,
  catchAsync(async (req, res, next) => {
    const a = await refreshAuthToken(getBearerToken(req.headers.authorization));
    return new ApiResponse(httpStatus.OK, "Token refresh success", a);
  }),
);

module.exports = router;
1;
