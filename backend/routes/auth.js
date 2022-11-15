const express = require("express");

const router = express.Router();
const {
  registerUser,
  authenticate,
  logout,
} = require("../controllers/userController");

router.route("/register").post(registerUser);
router.route("/login").post(authenticate);
router.route("/logout").get(logout);

module.exports = router;
