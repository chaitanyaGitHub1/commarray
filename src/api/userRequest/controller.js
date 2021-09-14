const { userRequestLogger } = require("../logger/logger.service");
const { userRequestService } = require("./service");
const { InternalServerError } = require("../middlewares/error");

class userRequestController {
  create = async (req, res) => {
    try {
      const data = req.body;
      userRequestLogger.info(`New userRequest registration ${JSON.stringify(data)}`);
      const { statusCode, response } = await userRequestService.register(data);
      userRequestLogger.info(
        `userRequestSignup:: statusCode: ${statusCode}, response: ${JSON.stringify(
          response
        )}`
      );
      return res.status(statusCode).json(response);
    } catch (e) {
      userRequestLogger.error(`userRequest Resister:: Internal server error ${e}`);
      return res.status(500).json(InternalServerError);
    }
  };

  requests = async (req, res) => {
    try {
      const data = req.body;
      userRequestLogger.info(`New userRequest details ${JSON.stringify(data)}`);
      const { statusCode, response } = await userRequestService.requests(data);
      userRequestLogger.info(
        `userRequestDetails:: statusCode: ${statusCode}, response: ${JSON.stringify(
          response
        )}`
      );
      return res.status(statusCode).json(response);
    } catch (e) {
      userRequestLogger.error(`userRequest Details:: Internal server error ${e}`);
      return res.status(500).json(InternalServerError);
    }
  };
}

module.exports.userRequestController = new userRequestController();
