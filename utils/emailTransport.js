const nodemailer = require('nodemailer');
const config = require('../config/config');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    // user: config.mail.id,
    // pass: config.mail.pwd,
    user: 'suryaoff369@gmail.com',
    pass: 'gvitldpadwqeihbg',
  },
});

module.exports = transporter;
