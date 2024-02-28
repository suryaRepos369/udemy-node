const express = require('express')
const router = express.Router()
const { createBlogSchema } = require('./../../validations/blog.validation.js')
const validateBlog = require('../../middlewares/validate.js')
const catchAsync = require('../../utils/catchAsync.js')
const {getList, addList } = require('../../services/blog/blog.service.js')
const httpStatus = require('http-status')

router.get('/list',catchAsync(async (req, res) => {
    const a = await  getList();
    res.status(httpStatus.OK).json(a)
}) )



router.post('/addList', validateBlog(createBlogSchema), catchAsync(async(req, res, next)=>{
    const a = await  addList(req.body);
    res.status(httpStatus.CREATED).send({success:true, message:'Blog created successfully'})
 }))

module.exports = router
