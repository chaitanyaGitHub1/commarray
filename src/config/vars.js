require("dotenv").config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET: process.env.SECRET,
  AUTH_API_SECRET: process.env.AUTH_API_SECRET,
  AUTH_API_ACCESS_KEY: process.env.AUTH_API_ACCESS_KEY,
  MONGODB_URI: process.env.MONGODB_URI,
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  TWILIO_MESSAGE_SERVICE_ID: process.env.TWILIO_MESSAGE_SERVICE_ID,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
};