const Admin = require("./model");
const { userLogger, adminLogger } = require("../logger/logger.service");
const JwtToken = require("../middlewares/jwtToken");
const crypto = require("crypto");
const _ = require("lodash");
const UserRequest = require("../userRequest/model");
const User = require("../user/model");

class service {
  create = async (data) => {
    try {
      adminLogger.info(`Admin Service:: Trying to create admin  ${data}`);

      data.password = await this.getPasswordHash(data.password);
      let admin = await Admin.create(data);
      const token = await new JwtToken(
        admin["_id"],
        "ADMIN"
      ).generateLoginAccessToken();

      return {
        statusCode: 200,
        response: {
          message: "Admin created successfully",
        },
      };
    } catch (error) {
      adminLogger.error(`error while creating user ${error}`);
      if (error.code === 11000) {
        return {
          statusCode: 200,
          response: {
            message: `${Object.keys(error.keyValue)} is already registered`,
          },
        };
      }
      adminLogger.error(`admin create:: Internal server error:: ${e}`);
      return e;
    }
  };

  async getPasswordHash(password) {
    const salt = process.env.HASHSECRET;
    const hash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, "sha512")
      .toString("hex");
    return hash;
  }

  login = async (data) => {
    try {
      adminLogger.info(`Admin service:: Trying to admin login ${data}`);

      let filter = {};
      const hashPassword = await this.getPasswordHash(data.password);
      filter = {
        email: data.email,
        password: hashPassword,
      };
      let admin = await Admin.findOne(filter);

      if (admin != null) {
        const token = await new JwtToken(
          admin["_id"],
          "ADMIN"
        ).generateLoginAccessToken();
        return {
          statusCode: 200,
          response: {
            ...token,
            _id: admin["_id"],
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
      adminLogger.error(`Admin Login:: Internal server error:: ${error}`);
      return error;
    }
  };

  async generateRandomPassword() {
    const length = 10;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&!";
    let retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }

  // Admin approve and create user.

  approve = async (data) => {
    let requestId = data.requestId;
    let updateObject = { verified: true };
    try {
      adminLogger.info(`Admin service:: Trying to create user  ${data}`);
      let userRequest = await UserRequest.findById(requestId);
      console.log(userRequest);
      let password = await this.generateRandomPassword();
      let hashPassword = await this.getPasswordHash(password);
      let newUser = {
        email: userRequest.email,
        password: hashPassword,
        userName: userRequest.userName,
      };
      let user = await User.create(newUser);
      const token = await new JwtToken(
        user["_id"],
        "USER"
      ).generateLoginAccessToken();
      if (user != null) {
        let update = await UserRequest.findByIdAndUpdate(
          requestId,
          updateObject,
          {
            new: true,
          }
        );
        console.log(user.email, password, user.userName);

        // Send credentials to email
        //  await this.sendEmail(user.email,password,user.userName);

        return {
          statusCode: 200,
          response: {
            message: "User created successfully",
          },
        };
      }
      return {
        statusCode: 400,
        response: {
          message: "Bad request",
        },
      };
    } catch (error) {
      adminLogger.error(
        `Admin service user approve:: Internal server error:: ${error}`
      );
      return error;
    }
  };
}

module.exports.adminService = new service();
