const express = require("express");

const router = express.Router();
const {
  registerUser,
  authenticate,
  logout,
  forgotPassword,
} = require("../controllers/userController");

router.route("/register").post(registerUser);
router.route("/login").post(authenticate);
router.route("/reset/password").post(forgotPassword);
router.route("/logout").get(logout);

module.exports = router;
