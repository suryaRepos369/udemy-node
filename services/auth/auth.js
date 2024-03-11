const httpStatus = require('http-status');
const ApiError = require('../../utils/ApiError');
const { getUser, createUser } = require('../user/user');
const {
  generateToken,
  verifyToken,
  saveToken,
} = require('../token/generateToken');
const {
  emailIpBruteLimiter,
  slowerBruteLimiter,
  emailBruteLimiter,
} = require('../../middlewares/rateLimiter');
const { logger } = require('../../config/logger');
const transporter = require('../../utils/emailTransport');
const config = require('../../config/config');
const getTime = require('../../utils/getTime');

const login = async (body) => {
  const { email, password, ipAddress } = body;
  try {
    const promises = [slowerBruteLimiter.consume(ipAddress)];
    const user = await getUser(email);
    if (!user || !(await user.isPasswordMatch(password))) {
      user &&
        promises.push([
          emailIpBruteLimiter.consume(`${email}_${ipAddress}`),
          emailBruteLimiter.consume(email),
        ]);
      await Promise.all(promises);
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
    }
    const tokens = await loginTokens(user._id);
    await saveToken(tokens.refreshToken, user._id, 'refresh');
    //send user mail
    await transporter.sendMail({
      from: 'suryaoff369@gmail.com',
      to: 'suryaprakasamc@gmail.com',
      subject: 'checking node  mailer',
      text: `Logging detected for user ${user.name} with mail ${email} at ${getTime()} \n If not You Please contact support`,
    });
    return tokens;
  } catch (error) {
    console.log('error', error);
    logger.error('Login error:', error);
    throw new ApiError(
      error.remainingPoints == 0
        ? httpStatus.TOO_MANY_REQUESTS
        : error.statusCode,
      error.remainingPoints == 0 ? 'Too many requests' : error.message,
    );
  }
};

const refreshAuthToken = async (refreshToken) => {
  const doc = await verifyToken(refreshToken, 'refresh');
  return await generateToken(doc.user, 'access');
};

const loginTokens = async (userId) => {
  const at = await generateToken(userId, 'access');
  const rt = await generateToken(userId, 'refresh');
  return { accessToken: at, refreshToken: rt };
};

module.exports = { login, refreshAuthToken, loginTokens };
