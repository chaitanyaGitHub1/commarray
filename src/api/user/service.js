const User = require("./model");
const { userLogger } = require("../logger/logger.service");
const JwtToken = require("../middlewares/jwtToken");
const crypto = require("crypto");
const _ = require("lodash");

class service {
  login = async (data) => {
    try {
      userLogger.info(`User service:: Trying to user login ${data}`);

      let filter = {};
      const hashPassword = await this.getPasswordHash(data.password);
      filter = {
        email: data.email,
        password: hashPassword,
      };
      let user = await User.findOne(filter);

      if (user != null) {
        const token = await new JwtToken(
          user["_id"],
          "USER"
        ).generateLoginAccessToken();
        return {
          statusCode: 200,
          response: {
            ...token,
            _id: user["_id"],
          },
        };
      }
      return {
        statusCode: 401,
        response: {
          error: "Please check your credentials",
        },
      };
    } catch (error) {
      userLogger.error(`User Login:: Internal server error:: ${error}`);
      return error;
    }
  };

  async getPasswordHash(password) {
    const salt = process.env.HASHSECRET;
    const hash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, "sha512")
      .toString("hex");
    return hash;
  }

  // Get all users data

  allUsers = async (data) => {
    try {
      let filter = {};
      filter = {
        accountStatus: "active",
      };
      const users = await User.find(filter, {
        password: 0,
        createdTime: 0,
        updatedTime: 0,
        v1: 0,
      });

      if (users.length >= 0) {
        return {
          statusCode: 200,
          response: {
            count: users.length,
            data: users,
          },
        };
      }
      return {
        statusCode: 200,
        response: {
          count: 0,
          message: "No user data found",
        },
      };
    } catch (e) {
      userLogger.error(`User data:: Internal server error:: ${e}`);
      return e;
    }
  };

  // User search

  search = async (data) => {
    try {
      let userName = data.userName;
      const users = await User.find(
        {
          userName: {
            $regex: userName,
            $options: "i",
          },
        },
        {
          password: 0,
          createdTime: 0,
          updatedTime: 0,
          v1: 0,
        }
      ).exec();

      if (users.length >= 0) {
        return {
          statusCode: 200,
          response: {
            count: users.length,
            data: users,
          },
        };
      }
      return {
        statusCode: 200,
        response: {
          count: 0,
          message: "No user data found",
        },
      };
    } catch (e) {
      userLogger.error(`User data:: Internal server error:: ${e}`);
      return e;
    }
  };
}

module.exports.userService = new service();
