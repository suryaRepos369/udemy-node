const express = require('express')
const app = new express ();
const blogRouter = require('./router/blog/router')
const {errorHandler, errorConverter} = require('./middlewares/error');
const httpStatus = require('http-status')
const ApiError = require('./utils/ApiError')
const morgan = require('./config/morgan')
const log = require('./config/logger')




log.attachLogger(app)
app.use(morgan)
app.use(express.json())

app.use('/blog',blogRouter)
app.use((req, res, next)=>{
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'))
})

//if error is not standard error convert to a proper error
app.use(errorConverter)

//add a handler for the errors 
app.use(errorHandler)


module.exports = app;

