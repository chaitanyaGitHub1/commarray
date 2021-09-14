const { createLogger, transports, format } = require("winston");
const config = require("../../config/vars");
const path = require("path");
const { ElasticsearchTransport } = require("winston-elasticsearch");
const ecsFormat = require("@elastic/ecs-winston-format");

const options = {
  elasticsearch: {
    level: "info",
    clientOpts: {
      node: "http://elasticsearch:9200",
      log: "info",
      maxRetries: 2,
      requestTimeout: 10000,
      sniffOnStart: false,
    },
  },
};

const logFormat = format.printf(
  (info) => `${info.timestamp} ${info.level} [${info.label}]:: ${info.message}`
);

const apiLogger = createLogger({
  level: config.NODE_ENV === "development" ? "debug" : "info",
  format: ecsFormat(),
  transports: [
    new transports.Console({
      format: ecsFormat(),
    }),
    new transports.File({
      filename: "./logs/api.log",
      format: ecsFormat(),
    }),
    new ElasticsearchTransport(options.elasticsearch),
  ],
});

const userLogger = createLogger({
  level: config.NODE_ENV === "development" ? "debug" : "info",
  format: format.combine(
    format.label({ label: path.basename(process.mainModule.filename) }),
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.metadata({ fillExcept: ["message", "level", "timestamp", "label"] })
  ),
  transports: [
    new transports.Console({
      format: ecsFormat(),
    }),
    new transports.File({
      filename: "./logs/user.log",
      format: ecsFormat(),
    }),
    new ElasticsearchTransport(options.elasticsearch),
  ],
});

const adminLogger = createLogger({
  level: config.NODE_ENV === "development" ? "debug" : "info",
  format: format.combine(
    format.label({ label: path.basename(process.mainModule.filename) }),
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.metadata({ fillExcept: ["message", "level", "timestamp", "label"] })
  ),
  transports: [
    new transports.Console({
      format: ecsFormat(),
    }),
    new transports.File({
      filename: "./logs/admin.log",
      format: ecsFormat(),
    }),
    new ElasticsearchTransport(options.elasticsearch),
  ],
});

const utilsLogger = createLogger({
  level: config.NODE_ENV === "development" ? "debug" : "info",
  format: format.combine(
    format.label({ label: path.basename(process.mainModule.filename) }),
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.metadata({ fillExcept: ["message", "level", "timestamp", "label"] })
  ),
  transports: [
    new transports.Console({
      format: ecsFormat(),
    }),
    new transports.File({
      filename: "./logs/utils.log",
      format: ecsFormat(),
    }),
    new ElasticsearchTransport(options.elasticsearch),
  ],
});

const groupLogger = createLogger({
  level: config.NODE_ENV === "development" ? "debug" : "info",
  format: format.combine(
    format.label({ label: path.basename(process.mainModule.filename) }),
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.metadata({ fillExcept: ["message", "level", "timestamp", "label"] })
  ),
  transports: [
    new transports.Console({
      format: ecsFormat(),
    }),
    new transports.File({
      filename: "./logs/group.log",
      format: ecsFormat(),
    }),
    new ElasticsearchTransport(options.elasticsearch),
  ],
});


const userRequestLogger = createLogger({
  level: config.NODE_ENV === "development" ? "debug" : "info",
  format: format.combine(
    format.label({ label: path.basename(process.mainModule.filename) }),
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.metadata({ fillExcept: ["message", "level", "timestamp", "label"] })
  ),
  transports: [
    new transports.Console({
      format: ecsFormat(),
    }),
    new transports.File({
      filename: "./logs/userRegister.log",
      format: ecsFormat(),
    }),
    new ElasticsearchTransport(options.elasticsearch),
  ],
});

module.exports = {
  apiLogger: apiLogger,
  adminLogger: adminLogger,
  userLogger: userLogger,
  utilsLogger: utilsLogger,
  userRequestLogger: userRequestLogger,
  groupLogger:groupLogger,
};
