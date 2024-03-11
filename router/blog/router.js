const express = require('express');

const router = express.Router();
const httpStatus = require('http-status');
const { createBlogSchema } = require('../../validations/blog.validation.js');
const validateBlog = require('../../middlewares/validate.js');
const catchAsync = require('../../utils/catchAsync.js');
const { getList, addList } = require('../../services/blog/blog.service.js');
const ApiResponse = require('../../utils/ApiResponse.js');
const authMiddleware = require('../../middlewares/auth.js');

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

module.exports = router;
