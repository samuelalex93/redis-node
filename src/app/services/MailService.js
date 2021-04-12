const nodemailer = require('nodemailer');
const configEmail = require('../config/mail');

module.exports = nodemailer.createTransport(configEmail);