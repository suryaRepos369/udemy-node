const Blog = require('../../models/blog.js');
const { getUser } = require('../user/user.js');
const fs = require('fs');
const ApiError = require('../../utils/ApiError.js');
const httpStatus = require('http-status');
const redisClient = require('../../loaders/redis.js');
const { CacheProcessor } = require('../../backgroundTask/index.js');

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
  redisClient.del('recent-blogs');
  return a;
};

const getReadableFileStream = async (filename, path) => {
  let filepath;
  if (!path) {
    filepath = `${__dirname}/../../uploads/processed/${filename}`;
  } else {
    filepath = path;
  }
  if (fs.existsSync(filepath)) {
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
    await CacheProcessor.Queue.add('Cache Queue', { blogs: data });
    // CacheProcessor.Worker.startCache();
    // await redisClient.set('recent-blogs', JSON.stringify(data));
    return data;
  }
  return 'no data found';
};

module.exports = { getList, addList, getReadableFileStream, getRecentList };
