const mongoose = require('mongoose');
const log = require('../config/logger');

const { logger } = log;
const config = require('../config/config');

const MAX_RETRY = 2;
// const RETRY_TIME = 3000;

const dbConnect = async () => {
  let retries = 0;
  let errorReason;

  while (retries < MAX_RETRY) {
    logger.info(
      `${retries === 0 ? 'Trying ' : `Retry ${retries + 1}`} connection with Mongo DB ...`,
    );

    try {
      await mongoose.connect(config.mongodb_url);
      logger.info('successfully connected to db');
      break;
    } catch (error) {
      retries++;
      errorReason = error;
      logger.error('Error connecting db ......', error);
      if (retries === MAX_RETRY) {
        logger.error(errorReason);
        throw new Error('DB Connection refused..!');
      }
    }
  }
};

module.exports = dbConnect;
