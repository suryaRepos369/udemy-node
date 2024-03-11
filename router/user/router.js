const express = require("express");
const router = express.Router();
const { createUserSchema } = require("./../../validations/newUser.js");
const validateBody = require("../../middlewares/validate.js");
const catchAsync = require("../../utils/catchAsync.js");
const httpStatus = require("http-status");
const {
  createUser,
  getAllUser,
  getUser,
} = require("../../services/user/user.js");
const ApiResponse = require("../../utils/ApiResponse.js");

router.get(
  "/getUser",
  catchAsync(async (req, res, next) => {
    const a = await getAllUser();
    return new ApiResponse(httpStatus.OK, "user fetch success", a);
  }),
);

router.post(
  "/getUser",
  catchAsync(async (req, res, next) => {
    console.log(req.body.email);
    if (!req.body.email) return null;
    const a = await getUser(req.body.email);
    return new ApiResponse(httpStatus.OK, "user fetch success", a);
  }),
);

router.post(
  "/addUser",
  validateBody(createUserSchema),
  catchAsync(async (req, res, next) => {
    const a = await createUser(req.body);
    return new ApiResponse(httpStatus.CREATED, "Creation success", a);
  }),
);

module.exports = router;
1;
