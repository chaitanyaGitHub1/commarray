const Group = require("./model");
const { groupLogger } = require("../logger/logger.service");

class service {
  create = async (data) => {
    try {
      groupLogger.info(`Group Service:: Trying to create group  ${data}`);

      let group = await Group.create(data);

      return {
        statusCode: 200,
        response: {
          message: "Group created successfully",
        },
      };
    } catch (error) {
      console.log(error, "Ninja");
      groupLogger.error(`error while creating user ${error}`);
      if (error.code === 11000) {
        console.log("Ninja");
        return {
          statusCode: 200,
          response: {
            message: `${Object.keys(error.keyValue)} is already registered`,
          },
        };
      }
      groupLogger.error(`Group create:: Internal server error:: ${error}`);
      return error;
    }
  };

  addUser = async (data) => {
    let groupId = data.groupId;
    let userId = data.userId;
    let updateObject = { $addToSet: { users: userId } };

    try {
      groupLogger.info(`Group Service:: Trying to add a user  ${data}`);

      let newUser = await Group.findByIdAndUpdate(groupId, updateObject, {
        new: true,
      });

      return {
        statusCode: 200,
        response: {
          message: "User Added successfully",
        },
      };
    } catch (error) {
      groupLogger.error(`error while creating user ${error}`);

      return error;
    }
  };

  allGroups = async (data) => {
    try {
      const groups = await Group.find();

      if (groups.length >= 0) {
        return {
          statusCode: 200,
          response: {
            count: groups.length,
            data: groups,
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
      groupLogger.error(`User data:: Internal server error:: ${e}`);
      return e;
    }
  };

  groupUsers = async (data) => {
    try {
      const groupUsers = await Group.find()
        .populate("users", "_id userName email profilePic")
        .exec();

      if (groupUsers.length >= 0) {
        return {
          statusCode: 200,
          response: {
            count: groupUsers.length,
            data: groupUsers,
          },
        };
      }
      return {
        statusCode: 200,
        response: {
          count: 0,
          message: "No users in group",
        },
      };
    } catch (e) {
      groupLogger.error(`User in a group data:: Internal server error:: ${e}`);
      return e;
    }
  };

  deleteUser = async (data) => {
    let groupId = data.groupId;
    let userId = data.userId;

    try {
      groupLogger.info(`Group Service:: Trying to remove a user  ${data}`);

      let newUser = await Group.findByIdAndUpdate(groupId, { $pull: { users: userId } }, {
        new: true,
      });

      return {
        statusCode: 200,
        response: {
          message: "User removed successfully",
        },
      };

    } catch (e) {
      groupLogger.error(`User in a group data:: Internal server error:: ${e}`);
      return e;
    }
  };
}

module.exports.groupService = new service();
