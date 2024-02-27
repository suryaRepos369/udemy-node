const express = require('express')
const router = express.Router()
const Blog = require('./../../models/blog.model')
const { createBlogSchema } = require('./../../validations/blog.validation.js')
const validateBlog = require('../../middlewares/validate.js')
const catchAsync = require('../../utils/catchAsync.js')

router.get('/list',catchAsync(async (req, res) => {
    const data = await Blog.find({})
    if (data && data.length > 0) {
      res.send(data)
    } else {
      res.send({
        response: 'No data found'
      })
    }
}) )

const createList = catchAsync(async(req, res)=>{
    const newData = new Blog(req.body)
    const a = await newData.saveee()
    res.status(201).send(a)     
})

router.post('/addList', validateBlog(createBlogSchema),createList)

module.exports = router
