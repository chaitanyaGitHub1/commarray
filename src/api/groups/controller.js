const { groupLogger } = require("../logger/logger.service");
const { groupService } = require("./service");
const { InternalServerError } = require("../middlewares/error");

class groupController {
  create = async (req, res) => {
    console.log(req.body);
    try {
      const data = req.body;
      groupLogger.info(
        `Group create requested received ${JSON.stringify(data)}`
      );
      const { statusCode, response } = await groupService.create(data);
      groupLogger.info(
        `Creat group:: statusCode: ${statusCode}, response: ${JSON.stringify(
          response
        )}`
      );
      return res.status(statusCode).json(response);
    } catch (error) {
      groupLogger.error(`Group create:: Internal server error ${error}`);
      return res.status(500).json(InternalServerError);
    }
  };

  addUser = async (req, res) => {
    console.log(req.body);
    try {
      const data = req.body;
      groupLogger.info(`Adding user to group ${JSON.stringify(data)}`);
      const { statusCode, response } = await groupService.addUser(data);
      groupLogger.info(
        `Add user to group:: statusCode: ${statusCode}, response: ${JSON.stringify(
          response
        )}`
      );
      return res.status(statusCode).json(response);
    } catch (error) {
      groupLogger.error(`Add user to group:: Internal server error ${error}`);
      return res.status(500).json(InternalServerError);
    }
  };

  allGroups = async (req, res) => {
    try {
      const data = req.body;
      groupLogger.info(`Get all Groups ${JSON.stringify(data)}`);
      const { statusCode, response } = await groupService.allGroups(data);
      groupLogger.info(
        `All groups:: statusCode: ${statusCode}, response: ${JSON.stringify(
          response
        )}`
      );
      return res.status(statusCode).json(response);
    } catch (error) {
      groupLogger.error(`All groups:: Internal server error ${error}`);
      return res.status(500).json(InternalServerError);
    }
  };

  groupUsers = async (req, res) => {
    try {
      const data = req.body;
      groupLogger.info(
        `Get all users in a group request ${JSON.stringify(data)}`
      );
      const { statusCode, response } = await groupService.groupUsers(data);
      groupLogger.info(
        `All users in a group:: statusCode: ${statusCode}, response: ${JSON.stringify(
          response
        )}`
      );
      return res.status(statusCode).json(response);
    } catch (error) {
      groupLogger.error(
        `All users in a groups:: Internal server error ${error}`
      );
      return res.status(500).json(InternalServerError);
    }
  };

  deleteUser = async (req, res) => {
    try {
      const data = req.body;
      groupLogger.info(
        `Delete user in a group request ${JSON.stringify(data)}`
      );
      const { statusCode, response } = await groupService.deleteUser(data);
      groupLogger.info(
        `Delete user in  a group:: statusCode: ${statusCode}, response: ${JSON.stringify(
          response
        )}`
      );
      return res.status(statusCode).json(response);
    } catch (error) {
      groupLogger.error(
        `Delete user  in a groups:: Internal server error ${error}`
      );
      return res.status(500).json(InternalServerError);
    }
  };
}

module.exports.groupController = new groupController();
