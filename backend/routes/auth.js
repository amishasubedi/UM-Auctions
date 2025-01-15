const express = require("express");
<<<<<<< HEAD
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
=======

const router = express.Router();
const {
  registerUser,
  authenticate,
  logout,
>>>>>>> 393021775158396b2579ef9e97c76d96c9ab1e62
  forgotPassword,
  resetPassword,
  getUserProfile,
  updatePassword,
<<<<<<< HEAD
  updateProfile,
  getUserById,
  getAllUsers,
  getUserDetails,
  updateUserRole,
  deleteUser,
=======
  editProfile,
  allUsers,
  userDetails,
  updateProfile,
  deleteUser,
  getUserById,
>>>>>>> 393021775158396b2579ef9e97c76d96c9ab1e62
} = require("../controllers/userController");

const { isAuthenticated, assignRole } = require("../middlewares/auth");

<<<<<<< HEAD
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
=======
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
>>>>>>> 393021775158396b2579ef9e97c76d96c9ab1e62
  .delete(isAuthenticated, assignRole("admin"), deleteUser);

module.exports = router;
