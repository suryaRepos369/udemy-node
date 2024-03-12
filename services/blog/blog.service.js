const Blog = require('../../models/blog.js');
const { getUser } = require('../user/user.js');
const upload = require('../../utils/multer.js');
const fs = require('fs');
const sharp = require('sharp');

const ApiError = require('../../utils/ApiError.js');
const httpStatus = require('http-status');
const getList = async () => {
  const data = await Blog.find({}).select('title description createdBy');
  if (data && data.length > 0) {
    return data;
  }
  return 'no data found';
};

const addList = async ({ title, description, email }) => {
  const user = await getUser(email);
  const createdBy = user?._id || null;
  const payload = { title, description, createdBy };
  const newData = new Blog(payload);
  const a = await newData.save();
  return a;
};

const uploadFile = async (file) => {
  const filename = `image-${Date.now()}${file.originalname.split('.')[0]}.jpg`;
  const outputPath = `${__dirname}/../../uploads/processed/${filename}`;
  await sharp(file.buffer).jpeg({ quality: 50 }).toFile(outputPath);
  return outputPath;
};

const getReadableFileStream = async (filename, path) => {
  let filepath;
  if (!path) {
    filepath = `${__dirname}/../../uploads/${filename}`;
  } else {
    filepath = path;
  }
  // const filepath = path || `${__dirname}/../../uploads/${filename}`
  if (fs.existsSync(filepath)) {
    // console.log('file is present ')
    const fileStream = fs.createReadStream(filepath);
    return fileStream;
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, 'File not found');
  }
};

module.exports = { getList, addList, uploadFile, getReadableFileStream };
