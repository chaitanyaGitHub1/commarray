const { Router } = require("express");
const { AuthService } = require("./auth.service");
const error = require("../middlewares/error");

const router = Router();

// create a new user
router.route("/token")
    .post(AuthService.generateAuthToken)
    .all(error.methodNotFound);


module.exports.authRoutes = router;
  