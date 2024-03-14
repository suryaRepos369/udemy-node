const imageProcessingQueue = require('./queues/imageProcessing');
const imageProcessingWorker = require('./workers/index');
const cacheQueue = require('./queues/caching');
const cacheWorker = require('./workers/index');
module.exports = {
  ImageProcessor: {
    Queue: imageProcessingQueue,
    Worker: imageProcessingWorker,
  },

  CacheProcessor: {
    Queue: cacheQueue,
    Worker: cacheWorker,
  },
};
