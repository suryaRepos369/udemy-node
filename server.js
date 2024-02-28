const express = require('express')
const app = new express()
const blogRouter = require('./router/blog/router')
const userRouter = require('./router/user/router')

const { errorHandler, errorConverter } = require('./middlewares/error')
const responseFormatter  = require('./middlewares/response')
const httpStatus = require('http-status')
const ApiError = require('./utils/ApiError')
const morgan = require('./config/morgan')
const log = require('./config/logger')

log.attachLogger(app)


app.use(morgan)
app.use(express.json())
app.use(responseFormatter)

app.use('/blog', blogRouter)
app.use('/user', userRouter)

app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'))
  })
app.use(errorConverter)
app.use(errorHandler)




module.exports = app
