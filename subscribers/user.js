const config = require('../config/config.js');
const { logger } = require('../config/logger.js');
const transporter = require('../utils/emailTransport.js');
const getTime = require('../utils/getTime');

const signUp = async (user) => {
  console.log('signup  event listend sending mail');
  try {
    const a = await transporter.sendMail({
      from: config.mail.id,
      to: user.email || 'suryaprakasamc@gmail.com',
      subject: 'Successfully registered',
      text: `Thanks ${user.name} for registering at ${getTime()} \n If not You Please contact support`,
    });

    if (a) {
      console.log(a);
      logger.info(`Mail sent succesfully ${a}`);
    }
  } catch (error) {
    logger.error(`Error sending mai ${error}`);
  }
};

const login = async (user) => {
  console.log('login event listend sending mail');
  try {
    const a = await transporter.sendMail({
      from: config.mail.id,
      to: user.email || 'suryaprakasamc@gmail.com',
      subject: 'Login information',
      text: `Logging detected for user ${user.name} with mail ${user.email} at ${getTime()} \n If not You Please contact support`,
    });

    if (a) {
      console.log(a);
      logger.info(`Mail sent succesfully ${a}`);
    }
  } catch (error) {
    logger.error(`Error sending mai ${error}`);
  }
};

module.exports = { signUp, login };
