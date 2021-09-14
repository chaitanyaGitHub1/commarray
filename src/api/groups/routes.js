const { Router } = require("express");
const { groupController } = require("./controller");
const error = require("../middlewares/error");
const {
  verifyAuthToken,
  verifyAccessToken,
  verifyRefreshToken,
} = require("../middlewares/auth");

const router = Router();

router.route("/").post([groupController.allGroups]).all(error.methodNotFound);

router
  .route("/create")
  .post([groupController.create])
  .all(error.methodNotFound);

// Get all users in a group

router
  .route("/groupusers")
  .post([groupController.groupUsers])
  .all(error.methodNotFound);

router
  .route("/adduser")
  .post([groupController.addUser])
  .all(error.methodNotFound);

// Remove a user from group

router
  .route("/deleteUser")
  .post([groupController.deleteUser])
  .all(error.methodNotFound);

module.exports.groupRoutes = router;
