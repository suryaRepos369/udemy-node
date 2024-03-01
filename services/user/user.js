const httpStatus = require("http-status");
const User = require("../../models/user.js");
const ApiError = require("../../utils/ApiError.js");
const { logger } = require("../../config/logger.js");

const getUser = async () => {
  const data = await User.find({});
  return data;
};

const createUser = async (body) => {
  if (await User.isEmailTaken(body.email)) {
    throw new ApiError(
      httpStatus.NOT_ACCEPTABLE,
      "user already exist",
      false,
      "",
    );
  }
  const newData = new User(body);
  const a = await newData.save();
  logger.info("User created successfully", a._id);
  return a;
};

module.exports = { getUser, createUser };
