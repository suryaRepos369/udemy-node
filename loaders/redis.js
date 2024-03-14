const redis = require('redis');
const { logger } = require('../config/logger');
const client = redis.createClient();
client.on('error', (err) => {
  logger.error(`Error connection redis ${err}`);
  process.exit(1);
});

module.exports = client;
