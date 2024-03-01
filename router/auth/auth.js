const express = require("express");
const router = express.Router();
const { loginUserSchema } = require("./../../validations/newUser.js");
const validateBody = require("../../middlewares/validate.js");
const catchAsync = require("../../utils/catchAsync.js");
const httpStatus = require("http-status");
const ApiResponse = require("../../utils/ApiResponse.js");
const login = require("../../services/auth/auth.js");

router.post(
  "/login",
  validateBody(loginUserSchema),
  catchAsync(async (req, res, next) => {
    const a = await login(req.body);
    return new ApiResponse(httpStatus.OK, "Login success", a);
  }),
);

module.exports = router;
1;
