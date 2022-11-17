const express = require("express");

const router = express.Router();
const {
  registerUser,
  authenticate,
  logout,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updatePassword,
  editProfile,
} = require("../controllers/userController");

const { isAuthenticated } = require("../middlewares/auth");

router.route("/register").post(registerUser);
router.route("/login").post(authenticate);

router.route("/forgot/password").post(forgotPassword);
router.route("/update/password").put(isAuthenticated, updatePassword);

router.route("/edit/profile").put(isAuthenticated, editProfile);
router.route("/user").get(isAuthenticated, getUserProfile);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);

module.exports = router;
