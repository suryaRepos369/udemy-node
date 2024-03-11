const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
// const { stream } = require("winston");
const config = require('./config');

function getIPFormat() {
  if (config.env === 'production') return 'remote-addr--';
  return '';
}
const format = `${getIPFormat()} : method :url :status :response-time ms :user-agent :date`;

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, '..', './access.log'),
);

module.exports = morgan(format, { stream: accessLogStream });
