const Blog = require('../../models/blog.js');
const { getUser } = require('../user/user.js');
const upload = require('../../utils/multer.js');
const fs = require('fs');
const sharp = require('sharp');
const workers = require('../../backgroundTask/workers/index.js');

const ApiError = require('../../utils/ApiError.js');
const httpStatus = require('http-status');
const redisClient = require('../../loaders/redis.js');

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

const getReadableFileStream = async (filename, path) => {
  let filepath;
  if (!path) {
    filepath = `${__dirname}/../../uploads/processed/${filename}`;
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

//redis to caches send data
const getRecentList = async () => {
  const data = await Blog.find()
    .select('title description createdBy')
    .sort({
      createdAt: -1,
    })
    .limit(5);
  if (data && data.length > 0) {
    await redisClient.set('recent-blogs', JSON.stringify(data));
    return data;
  }
  return 'no data found';
};

module.exports = { getList, addList, getReadableFileStream, getRecentList };
