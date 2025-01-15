const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const {
  createOrder,
  getUserOrders,
  getAllOrders,
  getOrderDetails,
  updateOrderStatus,
  cancelOrder,
} = require("../controllers/orderController");

const { isAuthenticated, assignRole } = require("../middlewares/auth");

// Order Routes
router.route("/order").post(isAuthenticated, createOrder);
router.route("/user/orders").get(isAuthenticated, getUserOrders);
router.route("/order/:id").get(isAuthenticated, getOrderDetails);

// Admin Routes
router
  .route("/admin/orders")
  .get(isAuthenticated, assignRole("admin"), getAllOrders);
router
  .route("/admin/order/:id")
  .put(isAuthenticated, assignRole("admin"), updateOrderStatus)
  .delete(isAuthenticated, assignRole("admin"), cancelOrder);

// User or Admin: Cancel an order
router.route("/order/:id/cancel").delete(isAuthenticated, cancelOrder);
=======

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
>>>>>>> 393021775158396b2579ef9e97c76d96c9ab1e62

module.exports = router;
