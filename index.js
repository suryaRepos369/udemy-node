const express = require('express')
const app = new express ();
const mongoose = require ('mongoose')
const dbConnect = require('./db/db')
const blogRouter = require('./router/blog/router')
const config = require('./config/config')
const {errorHandler, errorConverter} = require('./middlewares/error');
const httpStatus = require('http-status')
const ApiError = require('./utils/ApiError')



dbConnect();
app.use(express.json())
app.use('/blog',blogRouter)



//global error handling 

//no endpoint error
app.use((req, res, next)=>{
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'))
})

//if error is not standard error convert to a proper error
app.use(errorConverter)

//add a handler for the errors 
app.use(errorHandler)


//start server 
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});