const httpStatus = require("http-status");
const User = require("../../models/user.js");
const ApiError = require("../../utils/ApiError.js");
const { logger } = require("../../config/logger.js");
const {
  generateToken,
  saveToken,
  verifyToken,
} = require("../token/generateToken.js");

const getUser = async (email) => {
  console.log("user service mail received", email);
  let a = await User.findOne({ email });
  console.log(a);
  let { name } = a;
  if (a && a != null) return { email, name };
  else return "No user found";
};
const getUserById = async (id) => {
  return await User.findOne({ _id: id });
};
const getAllUser = async () => {
  return await User.find({});
};

const createUser = async (body) => {
  let savedData;
  try {
    if (await User.isEmailTaken(body.email)) {
      throw new ApiError(
        httpStatus.NOT_ACCEPTABLE,
        "User already exists",
        false,
        "",
      );
    }

    const newData = new User(body);
    savedData = await newData.save();
    const accessToken = await generateToken(savedData._id, "access");
    const refreshToken = await generateToken(savedData._id, "refresh");
    const tdr = await saveToken(refreshToken, savedData._id, "refresh", false);
    logger.info("refresh token saved");
    logger.info(`User created successfully ${savedData._id}`);
    return { email: savedData?.email, token: { accessToken, refreshToken } };
  } catch (error) {
    logger.error("Error creating user:", error);
    if (savedData) {
      const result = await User.deleteOne({ _id: savedData._id });
    }

    throw error;
  }
};

module.exports = { getUser, createUser, getAllUser, getUserById };
