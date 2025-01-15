const express = require("express");
const router = express.Router();

const { isAuthenticated, assignRole } = require("../middlewares/auth");

const {
  placeBid,
  getProductBids,
  getHighestBid,
  cancelBid,
} = require("../controllers/bidControllers");

router.route("/bid/place-bid").get(isAuthenticated, placeBid);
router.route("/bid/all-bid").get(getProductBids);
router.route("/bids/highest").get(getHighestBid);
router.route("/bid/remove").delete(isAuthenticated, cancelBid);

module.exports = router;
