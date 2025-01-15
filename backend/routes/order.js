const express = require("express");
const router = express.Router();
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

module.exports = router;
