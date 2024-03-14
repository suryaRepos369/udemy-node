const { logger } = require('../../config/logger');
const redisClient = require('../../loaders/redis');

module.exports = async (job) => {
  const { blogs } = job.data;
  const d = JSON.stringify(blogs);
  try {
    await redisClient.connect();
    await redisClient.set('recent-blogs', d);
    logger.info(`redis key <recent-blogs>  set with value`);
  } catch (error) {
    logger.error(error);
  }
};
