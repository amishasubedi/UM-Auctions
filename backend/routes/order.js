const express = require("express");
const router = express.Router();

const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const { isAuthenticated, assignRole } = require("../middlewares/auth");

router.route("/order/new").post(isAuthenticated, newOrder);
router.route("/order/:id").get(isAuthenticated, getSingleOrder);
router.route("/orders/myOrder").get(isAuthenticated, myOrders);

//admin
router
  .route("/admin/orders")
  .get(isAuthenticated, assignRole("admin"), getAllOrders);

// router
//   .route("/admin/order/:id")
//   .put(isAuthenticated, assignRole("admin"), updateOrder);
router.route("/admin/order/delete/:id").delete(isAuthenticated, deleteOrder);

module.exports = router;
