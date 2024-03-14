const redis = require('redis');
const { logger } = require('../config/logger');
const redisClient = redis.createClient();
redisClient.on('error', (err) => {
  logger.error(`Error connection redis ${err}`);
  process.exit(1);
});

module.exports = redisClient;