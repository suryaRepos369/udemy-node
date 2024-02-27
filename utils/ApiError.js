class ApiError extends Error{
    constructor(statusCode, message, isOperational=true, stack=''){
        super(stack);
        if(stack){
         this.stack =stack
        }
        else{
            Error.captureStackTrace(this, this.constructor)
        }
        this.message = message;
        this.statusCode = statusCode;
        this.isOperational = isOperational
    }
}

module.exports = ApiError