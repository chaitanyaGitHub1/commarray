const { Router } = require("express");
const { userController } = require("./controller");
const error = require("../middlewares/error");
const {
  verifyAuthToken,
  verifyAccessToken,
  verifyRefreshToken,
} = require("../middlewares/auth");

const router = Router();

// Get all users
router.route("/").post([userController.allUsers]).all(error.methodNotFound);

router
  .route("/login")
  .post([verifyAuthToken, userController.login])
  .all(error.methodNotFound);

router
  .route("/search")
  .post([userController.search])
  .all(error.methodNotFound);

module.exports.userRoutes = router;
