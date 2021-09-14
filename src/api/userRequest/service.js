const UserRequest = require("./model");

const { userRequestLogger } = require("../logger/logger.service");

class service {
  register = async (data) => {
    try {
      let userRegister = await UserRequest.create(data);
      return {
        statusCode: 200,
        response: {
          message: "Request sent to admin.",
        },
      };
    } catch (error) {
      userRequestLogger.error(`error while registering user ${error}`);
      if (error.code === 11000) {
        return {
          statusCode: 200,
          response: {
            message: `${Object.keys(error.keyValue)} is already registered`,
          },
        };
      }
      userRequestLogger.error(`User register:: Internal server error:: ${e}`);
      return e;
    }
  };

  requests = async (data) => {
    try {
      let filter = {};
      filter = {
        verified: data.verified,
      };
      const userRequests = await UserRequest.find(filter);
      if (userRequests.length >= 0) {
        return {
          statusCode: 200,
          response: {
            count: userRequests.length,
            data: userRequests,
          },
        };
      }
      return {
        statusCode: 200,
        response: {
          count:0,
          message: "No user request",
        },
      };
    } catch (e) {
      userRequestLogger.error(
        `User register data:: Internal server error:: ${e}`
      );
      return e;
    }
  };

  
}

module.exports.userRequestService = new service();
