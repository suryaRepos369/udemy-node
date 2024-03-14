const httpStatus = require('http-status');
const { logger } = require('../../config/logger');
const client = require('../../loaders/redis');
const ApiResponse = require('../../utils/ApiResponse');

module.exports = async (req, res, next) => {
  try {
    const key = 'recent-blogs';
    const cachedBlogs = await client.get(key);
    if (cachedBlogs) {
      res.json(JSON.parse(cachedBlogs));
    } else {
      next();
    }
  } catch (error) {
    next(error);
    logger.error(error);
  }
};
