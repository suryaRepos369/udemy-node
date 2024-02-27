const Blog = require('../../models/blog.model.js')
const { createBlogSchema } = require('../../validations/blog.validation.js')
const validateBlog = require('../../middlewares/validate.js')
const catchAsync = require('../../utils/catchAsync.js')
const httpStatus = require('http-status')
const getList =async()=>{
    const data = await Blog.find({})
    console.log(data)
    if (data && data.length > 0) {
      return data;
    } else {
      return 'no data found'
    }

}

const addList =catchAsync(async(body)=>{
    const newData = new Blog(body)
    const a = await newData.save()
    res.status(httpStatus.CREATED).send({success:true, message:"Blog created successfully"})     
})


module.exports={getList, addList}