const mongoose = require('mongoose');
const { apiLogger } = require('../api/logger/logger.service');
const vars = require('./vars');

const mongodburi = vars.MONGODB_URI;

const options = {
  promiseLibrary: require('bluebird'),
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

mongoose.connect(mongodburi, options, (err) => {
  if (err) apiLogger.error('mongodb connection failed', err);
  else apiLogger.info('mongodb connection successful');
});
