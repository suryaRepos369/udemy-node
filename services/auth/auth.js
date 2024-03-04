const httpStatus = require("http-status");
const ApiError = require("../../utils/ApiError");
const { getUser, createUser } = require("../user/user");
const {
  generateToken,
  verifyToken,
  saveToken,
} = require("../token/generateToken");

const login = async (body) => {
  const { email, password } = body;
  try {
    const user = await getUser(email);
    const isPwdMatch = await user.isPasswordMatch(password);
    console.log(user, isPwdMatch);
    if (user && isPwdMatch) {
      const tokens = await loginTokens(user._id);
      // await saveToken(tokens.accessToken,user._id, 'access' )
      await saveToken(tokens.refreshToken, user._id, "refresh");
      return tokens;
    } else {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid credentials");
    }
  } catch (err) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid credentials");
  }
};

const refreshAuthToken = async (refreshToken) => {
  const doc = await verifyToken(refreshToken, "refresh");
  return await generateToken(doc.user, "access");
};

const loginTokens = async (userId) => {
  const at = await generateToken(userId, "access");
  const rt = await generateToken(userId, "refresh");
  return { accessToken: at, refreshToken: rt };
};

module.exports = { login, refreshAuthToken, loginTokens };
