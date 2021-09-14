const { Router } = require("express");
const { userRequestController } = require("./controller");
const error = require("../middlewares/error");

const router = Router();

// Get all user Requests
router
  .route("/")
  .post([userRequestController.create])
  .all(error.methodNotFound);

router
  .route("/requests")
  .get([userRequestController.requests])
  .all(error.methodNotFound);

module.exports.userRequestRoutes = router;
