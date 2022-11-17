const Order = require("../models/order");
const ErrorHandler = require("../utils/ErrorHandler");
const Product = require("../models/product");
const AsyncErrors = require("../middlewares/AsyncErrors");

// Create a new order
exports.newOrder = AsyncErrors(async (req, res, next) => {
  const { orderItems, shippingInfo, totalPrice, paymentInfo } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(200).json({
    success: true,
    order,
  });
});
