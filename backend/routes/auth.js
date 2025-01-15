const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updatePassword,
  updateProfile,
  getUserById,
  getAllUsers,
  getUserDetails,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");

const { isAuthenticated, assignRole } = require("../middlewares/auth");

// User Routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/forgot/password").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/update/password").put(isAuthenticated, updatePassword);
router.route("/user").get(isAuthenticated, getUserProfile);
router.route("/edit/profile").put(isAuthenticated, updateProfile);
router.route("/user/:id").get(isAuthenticated, getUserById);

// Admin Routes
router
  .route("/admin/users")
  .get(isAuthenticated, assignRole("admin"), getAllUsers);

router
  .route("/admin/user/:id")
  .get(isAuthenticated, assignRole("admin"), getUserDetails)
  .put(isAuthenticated, assignRole("admin"), updateUserRole)
  .delete(isAuthenticated, assignRole("admin"), deleteUser);

module.exports = router;
