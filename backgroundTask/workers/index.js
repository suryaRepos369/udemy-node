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
    removeOnComplete: true,
  });

  imageProcessingWorker.on('completed', (job) => {
    logger.info(`completed job ${job.id}`);
    eventEmitter.emit('imageCompressionComplete');
  });
};

module.exports = { start };
