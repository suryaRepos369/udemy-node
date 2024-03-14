const { Worker } = require('bullmq');
const config = require('../../config/config');
const path = require('path');
const { logger } = require('../../config/logger');
const eventEmitter = require('../../utils/eventEmitter');
const start = () => {
  const processorPath = path.join(__dirname, 'imageProcessor.js');
  const imageProcessingWorker = new Worker('ImageProcessor', processorPath, {
    connection: {
      host: config.redis.host,
      port: config.redis.port,
    },
    concurrency: 3,
  });

  imageProcessingWorker.on('completed', (job) => {
    logger.info(`completed job ${job.id}`);
    eventEmitter.emit('imageCompressionComplete');
  });
  imageProcessingWorker.on('failed', (job) => {
    logger.error(`Error  job ${job.id} ::: ${job.failedReason} `);
  });
};

const startCache = () => {
  const cacheFile = path.join(__dirname, 'cacheProcessor.js');
  const cacheProcessingWorker = new Worker('CacheProcessor', cacheFile, {
    connection: {
      host: config.redis.host,
      port: config.redis.port,
    },
  });

  cacheProcessingWorker.on('failed', (job) => {
    logger.error(`Error  job ${job.id} ::: ${job.failedReason} `);
  });

  cacheProcessingWorker.on('completed', (job) => {
    logger.info(`completed job ${job.id}`);
  });
};

module.exports = { start, startCache };
