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
  allUsers,
  userDetails,
  updateProfile,
  deleteUser,
  getUserById,
} = require("../controllers/userController");

const { isAuthenticated, assignRole } = require("../middlewares/auth");

router.route("/register").post(registerUser);
router.route("/login").post(authenticate);

router.route("/forgot/password").post(forgotPassword);
router.route("/update/password").put(isAuthenticated, updatePassword);

router.route("/edit/profile").put(isAuthenticated, editProfile);
router.route("/user").get(isAuthenticated, getUserProfile);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);
router.route("/user/:id").get(getUserById);

// Admin
router
  .route("/admin/users")
  .get(isAuthenticated, assignRole("admin"), allUsers);

router
  .route("/admin/user/:id")
  .get(isAuthenticated, assignRole("admin"), userDetails)
  .put(isAuthenticated, assignRole("admin"), updateProfile)
  .delete(isAuthenticated, assignRole("admin"), deleteUser);

module.exports = router;
