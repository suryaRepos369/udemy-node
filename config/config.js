const joi = require('joi');
require('dotenv').config();
const log = require('./logger');

const { logger } = log;
const envVarSchema = joi
  .object({
    MONGODB_URL: joi.string().required(),
    PORT: joi.number().positive().default(3001),
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
};
