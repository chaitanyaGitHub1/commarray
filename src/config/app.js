const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('../api/routes/v1');
const morgan = require('morgan');
const { apiLogger } = require("../api/logger/logger.service");

require('./mongo');

const app = express();

class App {
  configureApp() {
    // parse body params in the body
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // enable cors
    const corsOptions = {
      origin: ["http://localhost:3000"],
      optionsSuccessStatus: 200 // For legacy browser support
    }
    app.use(cors(corsOptions));
    app.options('*', cors());

    // Use morgan to log the server calls
    apiLogger.stream = {
      write: function(message, encoding){
        apiLogger.info(message);
      }
    };

    // logs the API requests
    app.use(morgan('combined', {'stream': apiLogger.stream}));

    // enable routes
    app.use('/', router);

    // run jobs
    // const { cronJobs } = require('./jobs');
    // cronJobs.init();
  }
}

module.exports = {
  App: new App(),
  app,
};
