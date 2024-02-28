const httpStatus = require('http-status')
const ApiResponse = require('../utils/ApiResponse')
const catchAsync = fn => async (req, res, next) => {
  // Promise.resolve(fn(req, res, next)).catch((err)=>next(err))
  try {
    const result = await fn(req, res, next)
    if (result instanceof ApiResponse) {
      res.json(result)
    } else {
      let a = new ApiResponse(httpStatus.OK, 'success', result)
      res.json(a)
    }
  } catch (err) {
    next(err)
  }
}

module.exports = catchAsync
