const joi = require('joi');
require('dotenv').config();
const log = require('./logger');

const { logger } = log;
const envVarSchema = joi
  .object({
    MONGODB_URL: joi.string().required(),
    PORT: joi.number().positive().default(3001),
    NODE_ENV: joi.string().default('development'),
    JWT_SECRET: joi.string().required(),
    JWT_ACCESS_EXPIRY_MINUTES: joi.number().required(),
    OPEN_AI_API_KEY: joi.string().optional(),
    EMAIL: joi.string().required(),
    PWD: joi.string().required(),
    REDIS_HOST: joi.string().default('localhost'),
    REDIS_PORT: joi.number().default(6379),
  })
  .unknown();

const { value: envVars, error } = envVarSchema.validate(process.env);

if (error) {
  logger.error('missing ENV files ', error);
  process.exit(1);
}

module.exports = {
  port: envVars.PORT,
  mongodb_url: envVars.MONGODB_URL,
  env: envVars.NODE_ENV,
  jwt: {
    secret: envVars.JWT_SECRET,
    expiry: envVars.JWT_ACCESS_EXPIRY_MINUTES,
  },
  openai: envVars.OPEN_AI_API_KEY,
  cspOptions: {
    directives: {
      defaultSrc: ['self'],
      styleSrc: ['self', 'unsafe-inline'],
      fontSrc: ['self'],
      scriptSrc: ['self', 'unsafe-inline'],
    },
    reportOnly: true,
  },
  mail: {
    id: envVars.EMAIL,
    pwd: envVars.PWD,
  },
  redis: {
    host: envVars.REDIS_HOST,
    port: envVars.REDIS_PORT,
  },
};
