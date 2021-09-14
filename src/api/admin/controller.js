const crypto = require("crypto");
const { adminLogger } = require("../logger/logger.service");
const { adminService } = require("./service");
const { InternalServerError } = require("../middlewares/error");

class adminController {
  create = async (req, res) => {
    console.log(req.body);
    try {
      const data = req.body;
      adminLogger.info(
        `Admin create requested received ${JSON.stringify(data)}`
      );
      const { statusCode, response } = await adminService.create(data);
      adminLogger.info(
        `UserSignup:: statusCode: ${statusCode}, response: ${JSON.stringify(
          response
        )}`
      );
      return res.status(statusCode).json(response);
    } catch (error) {
      adminLogger.error(`Admin create:: Internal server error ${error}`);
      return res.status(500).json(InternalServerError);
    }
  };

  login = async (req, res) => {
    try {
      const data = req.body;
      adminLogger.info(`Admin login request body:: ${JSON.stringify(data)}`);
      const { statusCode, response } = await adminService.login(data);
      adminLogger.info(
        `Admin Login:: statusCode: ${statusCode}, response: ${JSON.stringify(
          response
        )}`
      );
      return res.status(statusCode).json(response);
    } catch (e) {
      adminLogger.error(`Admin Login:: Internal server error ${e}`);
      return res.status(500).json(InternalServerError);
    }
  };

  approve = async (req, res) => {
    try {
      const data = req.body;
      adminLogger.info(
        `Admin user request approve request body:: ${
          (JSON.stringify(data))
        }`
      );
      const { statusCode, response } = await adminService.approve(data);
      adminLogger.info(
        `Admin approve user:: statusCode: ${statusCode}, response: ${JSON.stringify(
          response
        )}`
      );
      return res.status(statusCode).json(response);
    } catch (e) {
      adminLogger.error(`Admin Login:: Internal server error ${e}`);
      return res.status(500).json(InternalServerError);
    }
  };
}

module.exports.adminController = new adminController();
