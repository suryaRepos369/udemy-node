const express = require('express');
const path = require('path');

const router = express.Router();
const httpStatus = require('http-status');
const { createBlogSchema } = require('../../validations/blog.validation.js');
const validateBlog = require('../../middlewares/validate.js');
const catchAsync = require('../../utils/catchAsync.js');
const {
  getList,
  addList,
  getReadableFileStream,
  uploadFile,
} = require('../../services/blog/blog.service.js');
const ApiResponse = require('../../utils/ApiResponse.js');
const authMiddleware = require('../../middlewares/auth.js');
const upload = require('../../utils/multer.js');
const ApiError = require('../../utils/ApiError.js');
const imageProcessingQueue = require('../../backgroundTask/queues/imageProcessing.js');
const worker = require('../../backgroundTask/workers/index.js');
const eventEmitter = require('../../utils/eventEmitter.js');
const { ImageProcessor } = require('../../backgroundTask/index.js');

router.use(authMiddleware);
router.get(
  '/list',
  catchAsync(async (req, res) => {
    const a = await getList();
    return new ApiResponse(httpStatus.OK, 'get user list success', a);
  }),
);

router.post(
  '/addList',
  validateBlog(createBlogSchema),
  catchAsync(async (req, res, next) => {
    const a = await addList(req.body);
    return new ApiResponse(httpStatus.CREATED, 'Blog creation success', a);
  }),
);
router.post(
  '/upload-cover-image',
  upload.single('cover-image'),
  catchAsync(async (req, res, next) => {
    if (!req.file) throw new ApiError(httpStatus.NOT_FOUND, 'file not found');
    const file = req.file;
    const { quality = 90 } = req.body;
    const q = parseInt(quality);
    const filename = `image-${Date.now()}${file.originalname.split('.')[0]}.jpg`;
    const outputPath = `${__dirname}/../../uploads/processed/${filename}`;

    await ImageProcessor.Queue.add('ImageProcessorJob', {
      file,
      q,
      outputPath,
    });
    ImageProcessor.Worker.start();
    return new ApiResponse(httpStatus.OK, 'File upload success', filename);
  }),
);

router.get(
  '/getFile/:filename',
  catchAsync(async (req, res, next) => {
    req.query.streaming = 'true';
    const { filename } = req.params;
    const stream = await getReadableFileStream(filename);
    const contentType = `image/${filename.split('.')[1].toLowerCase()}`;
    res.setHeader('content-Type', contentType);
    stream.pipe(res);
  }),
);

router.post(
  '/compress',
  upload.single('image'),
  catchAsync(async (req, res, next) => {
    if (!req.file) {
      throw new ApiError(httpStatus.NOT_FOUND, 'File not found');
    }
    // const fp = await uploadFile(req.file);
    req.query.streaming = 'true';
    const file = req.file;
    const { quality = 90 } = req.body;
    const q = parseInt(quality);
    const filename = `image-${Date.now()}${file.originalname.split('.')[0]}.jpg`;
    const outputPath = `${__dirname}/../../uploads/processed/${filename}`;
    ImageProcessor.Queue.add('ImageProcessorJob', {
      file,
      q,
      outputPath,
    });
    ImageProcessor.Worker.start();

    const waitForCompression = new Promise((resolve) => {
      eventEmitter.once('imageCompressionComplete', () => {
        resolve();
      });
    });
    await waitForCompression;
    const stream = await getReadableFileStream(filename, '');
    const contentType = `image/${filename.split('.')[1].toLowerCase()}`;
    res.setHeader('content-Type', contentType);
    stream.pipe(res);
  }),
);

module.exports = router;
