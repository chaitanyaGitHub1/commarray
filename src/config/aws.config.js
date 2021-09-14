const AWS = require("aws-sdk");
const bluebird = require("bluebird");
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = require("../../config/vars");

// configure the keys for accessing AWS
AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: "us-east-2",
});

// configure AWS to work with promises
AWS.config.setPromisesDependency(bluebird);

// create S3 instance
const s3 = new AWS.S3();

module.exports.s3 = s3;

