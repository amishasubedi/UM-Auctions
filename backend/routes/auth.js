const express = require("express");

const router = express.Router();
const {
  registerUser,
  authenticate,
  logout,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");

router.route("/register").post(registerUser);
router.route("/login").post(authenticate);
router.route("/forgot/password").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);

module.exports = router;
