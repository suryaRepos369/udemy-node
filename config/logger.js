const winston = require('winston');

const winstonFormat = winston.format.printf(
  ({ level, timestamp, message, stack }) => {
    return `Logger ${level}: ${timestamp}:: ${message || stack}`;
  },
);

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(winston.format.timestamp(), winstonFormat),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

const attachLogger = (app) => {
  app.logger = logger;
};

module.exports = { logger, attachLogger };
