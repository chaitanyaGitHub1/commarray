const { userLogger } = require("../logger/logger.service");
const { userService } = require("./service");
const { InternalServerError } = require("../middlewares/error");

class userController {
  login = async (req, res) => {
    try {
      const data = req.body;
      userLogger.info(`User login request body:: ${JSON.stringify(data)}`);
      const { statusCode, response } = await userService.login(data);
      userLogger.info(
        `Admin Login:: statusCode: ${statusCode}, response: ${JSON.stringify(
          response
        )}`
      );
      return res.status(statusCode).json(response);
    } catch (e) {
      userLogger.error(`User Login:: Internal server error ${e}`);
      return res.status(500).json(InternalServerError);
    }
  };

  allUsers = async (req, res) => {
    try {
      const data = req.body;
      userLogger.info(`All users details ${JSON.stringify(data)}`);
      const { statusCode, response } = await userService.allUsers(data);
      userLogger.info(
        `user details:: statusCode: ${statusCode}, response: ${JSON.stringify(
          response
        )}`
      );
      return res.status(statusCode).json(response);
    } catch (e) {
      userLogger.error(`all User Details:: Internal server error ${e}`);
      return res.status(500).json(InternalServerError);
    }
  };

  search = async (req, res) => {
    try {
      const data = req.body;
      userLogger.info(`User search ${JSON.stringify(data)}`);
      const { statusCode, response } = await userService.search(data);
      userLogger.info(
        `user search:: statusCode: ${statusCode}, response: ${JSON.stringify(
          response
        )}`
      );
      return res.status(statusCode).json(response);
    } catch (e) {
      userLogger.error(`User search:: Internal server error ${e}`);
      return res.status(500).json(InternalServerError);
    }
  };
}

module.exports.userController = new userController();
