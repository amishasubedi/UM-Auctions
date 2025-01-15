const express = require("express");
const router = express.Router();

const { isAuthenticated, assignRole } = require("../middlewares/auth");

const {
  placeBid,
  getProductBids,
  getHighestBid,
  cancelBid,
} = require("../controllers/bidControllers");

router.route("/bid/place-bid").get(placeBid);
router.route("/bid/all-bid").get(getProductBids);
router.route("/bids/highest").get(getHighestBid);
router.route("/bid/remove").delete(cancelBid);

// router
//   .route("/admin/products/:id")
//   .delete(isAuthenticated, assignRole("admin"), deleteProduct);

module.exports = router;
