const { Worker } = require('bullmq');
const config = require('../../config/config');
const { logger } = require('../../config/logger');
const eventEmitter = require('../../utils/eventEmitter');
const path = require('path');

const createWorker = async (name, filename) => {
  const processorPath = path.join(__dirname, filename);

  const worker = new Worker(name, processorPath, {
    connection: {
      host: config.redis.host,
      port: config.redis.port,
    },
  });
  worker.on('completed', (job) => {
    logger.info(`Completed ${job.name} with id  ${job.id}`);
    eventEmitter.emit('imageCompressionComplete');
  });
  worker.on('failed', (job) => {
    logger.error(
      `Error  ${job.name}  with id ${job.id}::: ${job.failedReason} `,
    );
  });
};

module.exports = createWorker;
