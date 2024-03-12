const multer = require('multer');
const ApiError = require('./ApiError');
const httpStatus = require('http-status');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const filepath = __dirname + '/' + '../uploads';
    cb(null, filepath);
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

module.exports = multer({
  fileFilter(req, file, cb) {
    const maxFileSize = 3 * 1024 * 1024; //3MB
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(
        new ApiError(httpStatus.BAD_REQUEST, 'Only images are allowed'),
        false,
      );
    } else if (file.size > maxFileSize) {
      return cb(
        new ApiError(
          httpStatus.BAD_REQUEST,
          'image larger than 3MB not accepted',
        ),
        false,
      );
    }
    return cb(null, true);
  },
});
