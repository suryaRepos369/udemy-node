const joi = require ('joi');
require('dotenv').config()
const log = require('./logger')

let {logger} =log;
const envVarSchema = joi.object({
    MONGODB_URL : joi.string().required(),
    PORT :joi.number().positive().default(3001)
}).unknown();

const {value:envVars , error} = envVarSchema.validate(process.env)

if(error){
    logger.error("missing ENV files ", error)
    process.exit(1);
}

module.exports={
    port : envVars.PORT,
    mongodb_url : envVars.MONGODB_URL,
    env:envVars.NODE_ENV
}