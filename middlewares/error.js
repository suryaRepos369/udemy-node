const { default: mongoose } = require('mongoose');
const config = require('../config/config');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status')
const errorHandler =(err, req, res, next)=>{
    let {statusCode, message,isOperational} = err;
    console.log(config.env)

    if(config.env==='production' && !err.isOperational){
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        message= httpStatus[statusCode];
    }
    const response = {
        error:true,
        code:statusCode,
        message: JSON.stringify(message),
        ...(config.env ==='developement' && {stack:err.stack})
    }

    if(config.env ==='development') console.log(JSON.stringify(err))
    res.status(statusCode).send(response)
}

const errorConverter=(err, req, res, next)=>{
    let error = err
     if(!(error instanceof(ApiError))){
       const statusCode = error.statusCode || error instanceof mongoose.Error ?httpStatus.BAD_REQUEST:httpStatus.INTERNAL_SERVER_ERROR;
       const message = error.message|| httpStatus[statusCode];
       error = new ApiError(statusCode, message,false, error.stack)
     }
     next(error)
}


module.exports ={errorHandler, errorConverter}