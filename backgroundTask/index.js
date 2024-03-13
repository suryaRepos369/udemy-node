const imageProcessingQueue = require('./queues/imageProcessing');
const imageProcessingWorker = require('./workers/index');
module.exports = {
  ImageProcessor: {
    Queue: imageProcessingQueue,
    Worker: imageProcessingWorker,
  },
};
