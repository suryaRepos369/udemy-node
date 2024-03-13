const redis = require('redis');
const { logger } = require('../config/logger');
const testRedis = async () => {
  // Create a Redis client without specifying host and port (defaults to localhost:6379)
  const client = redis.createClient();
  console.log('client ************', client);
  client.on('error', (err) => {
    console.log('*************errr');
    logger.error('Error connecting to Redis:', err);
  });

  // Event listener for handling successful connections
  client.on('connect', () => {
    console.log('*************connected');
    logger.info('Connected to Redis');
  });
};

module.exports = { testRedis };
