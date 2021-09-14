const { Router } = require("express");
const { adminController } = require("./controller");
const error = require("../middlewares/error");
const {
  verifyAuthToken,
  verifyAccessToken,
  verifyRefreshToken,
} = require("../middlewares/auth");

const router = Router();

// admin login
router
  .route("/login")
  .post([verifyAuthToken, adminController.login])
  .all(error.methodNotFound);

router
  .route("/create")
  .post([verifyAuthToken, adminController.create])
  .all(error.methodNotFound);

router
  .route("/approve")
  .post([adminController.approve])
  .all(error.methodNotFound);

module.exports.adminRoutes = router;
