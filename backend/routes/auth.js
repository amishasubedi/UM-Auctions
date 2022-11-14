const express = require("express");

const router = express.Router();
const { registerUser, authenticate } = require("../controllers/userController");

router.route("/register").post(registerUser);
router.route("/login").post(authenticate);

module.exports = router;
