const express = require('express')
const router = express.Router()
const { createUserSchema } = require('./../../validations/newUser.js')
const validateBody = require('../../middlewares/validate.js')
const catchAsync = require('../../utils/catchAsync.js')
const httpStatus = require('http-status')
const {createUser, getUser} = require('../../services/user/user.js')
const ApiResponse = require('../../utils/ApiResponse.js')

router.get('/getUser',catchAsync( async(req, res, next)=>{
   const a = await getUser();
   let b = new ApiResponse(httpStatus.OK, 'fetched users', a)
   res.send(b)
}))




router.post('/addUser', validateBody(createUserSchema),catchAsync((async(req, res, next)=>{
   const a = await createUser(req.body);
    if(a) res.status(httpStatus.CREATED).send({success:true, message:'User ** created successfully'})
 })) )


module.exports = router
1