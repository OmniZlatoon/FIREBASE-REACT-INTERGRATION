const nodemailer = require('nodemailer');
require('dotenv').config();// Load environment variables from .env file

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.APP_EMAIL,
        pass: process.env.APP_PASSWORD // Use an app password for Gmail if 2FA is enabled
    }
});

module.exports = transporter;


