const httpStatus = require("http-status");
const ApiError = require("../../utils/ApiError");
const { getUser, createUser } = require("../user/user");
const generateToken = require("../token/generateToken");

const login = async (body) => {
  const { email, password } = body;
  try {
    const user = await getUser(email);
    const isPwdMatch = await user.isPasswordMatch(password);
    console.log(user, isPwdMatch);
    if (user && isPwdMatch) return await loginTokens(user._id);
    else {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid credentials");
    }
  } catch (err) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid credentials");
  }
};

const loginTokens = async (userId) => {
  const at = await generateToken(userId, "access");
  const rt = await generateToken(userId, "refresh");
  return { accessToken: at, refreshToken: rt };
};

module.exports = login;
