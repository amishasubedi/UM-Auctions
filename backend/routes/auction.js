const express = require("express");
const router = express.Router();

const { getUserById } = require("../controllers/userController");
const { isAuthenticated, assignRole } = require("../middlewares/auth");
const { createAuction } = require("../controllers/auctionController");

router.param("userId", getUserById);
router
  .route("/auctions/:userId")
  .post(isAuthenticated, assignRole("user"), createAuction);

module.exports = router;
