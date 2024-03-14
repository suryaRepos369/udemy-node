const { Queue } = require('bullmq');
const config = require('../../config/config');

const redisCacheQueue = new Queue('CacheProcessor', {
  connection: {
    host: config.redis.host,
    port: config.redis.port,
  },
});

module.exports = redisCacheQueue;
