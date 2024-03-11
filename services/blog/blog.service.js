const Blog = require('../../models/blog.js');

const getList = async () => {
  const data = await Blog.find({});
  if (data && data.length > 0) {
    return data;
  }
  return 'no data found';
};

const addList = async (body) => {
  const newData = new Blog(body);
  const a = await newData.save();
  return a;
};

module.exports = { getList, addList };
