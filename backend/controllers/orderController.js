const Order = require("../models/order");
<<<<<<< HEAD
const Product = require("../models/product");
const Bid = require("../models/bid");
const ErrorHandler = require("../utils/ErrorHandler");
const AsyncErrors = require("../middlewares/AsyncErrors");

// Create a new order from the winning bid
exports.createOrder = AsyncErrors(async (req, res, next) => {
  const { productId, bidId } = req.body;
  const userId = req.user.id;

  const product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const bid = await Bid.findById(bidId);
  if (
    !bid ||
    bid.product.toString() !== productId ||
    bid.user.toString() !== userId
  ) {
    return next(new ErrorHandler("Invalid bid or user", 400));
  }

  const currentDate = new Date();
  if (currentDate < product.bidEnd) {
    return next(
      new ErrorHandler("Bidding is still ongoing, cannot create order", 400)
    );
  }

  const highestBid = await Bid.findOne({ product: productId }).sort({
    bidAmount: -1,
  });

  if (bid.bidAmount !== highestBid.bidAmount) {
    return next(new ErrorHandler("You did not win the bid", 400));
  }

  const order = await Order.create({
    user: userId,
    product: productId,
    bid: bidId,
    totalAmount: bid.bidAmount,
    status: "Pending",
  });

  res.status(201).json({
=======
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
>>>>>>> 393021775158396b2579ef9e97c76d96c9ab1e62
    success: true,
    order,
  });
});

<<<<<<< HEAD
exports.getUserOrders = AsyncErrors(async (req, res, next) => {
  const userId = req.user.id;

  const orders = await Order.find({ user: userId }).populate("product");

  res.status(200).json({
    success: true,
    orders,
  });
});

// Get all orders for admin
exports.getAllOrders = AsyncErrors(async (req, res, next) => {
  const orders = await Order.find().populate("user product");
=======
exports.getSingleOrder = AsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

exports.myOrders = AsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });
>>>>>>> 393021775158396b2579ef9e97c76d96c9ab1e62

  res.status(200).json({
    success: true,
    orders,
  });
});

<<<<<<< HEAD
// Get a single order details for a user or admin
exports.getOrderDetails = AsyncErrors(async (req, res, next) => {
  const orderId = req.params.id;

  const order = await Order.findById(orderId).populate("user product");

  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }

  if (order.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorHandler("You are not authorized to view this order", 403)
    );
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// Update order status (admin only)
exports.updateOrderStatus = AsyncErrors(async (req, res, next) => {
  const orderId = req.params.id;
  const { status } = req.body;

  // Validate the status value
  const validStatuses = ["Pending", "Shipped", "Delivered"];
  if (!validStatuses.includes(status)) {
    return next(new ErrorHandler("Invalid status value", 400));
  }

  const order = await Order.findById(orderId);

  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }

  if (req.user.role !== "admin") {
    return next(
      new ErrorHandler("You are not authorized to update the order status", 403)
    );
  }

  order.status = status;
  await order.save();

  res.status(200).json({
    success: true,
    order,
  });
});

// Cancel an order (user or admin)
exports.cancelOrder = AsyncErrors(async (req, res, next) => {
  const orderId = req.params.id;

  const order = await Order.findById(orderId);

  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }

  if (order.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorHandler("You are not authorized to cancel this order", 403)
    );
=======
// admin feature
exports.getAllOrders = AsyncErrors(async (req, res, next) => {
  const orders = await Order.find();
  let price = 0;

  orders.forEach((order) => {
    price += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    price,
    orders,
  });
});

// // update order by admin
// exports.updateOrder = AsyncErrors(async (req, res, next) => {
//   const order = await Order.findById(req.params.id);

//   console.log("Before if Check status" + order.orderStatus);
//   if (order.orderStatus === "Delivered") {
//     console.log("After if Check status" + order.orderStatus);
//     console.log("bbolean" + order.orderStatus === "Delivered");
//     return next(new ErrorHandler("already delivered this order", 400));
//   }

//   order.orderItems.forEach(async (item) => {
//     await updateQuantity(item.product, item.quantity);
//   });

//   (order.orderStatus = req.body.orderStatus), (order.deliveredAt = Date.now());

//   await order.save();

//   res.status(200).json({
//     success: true,
//   });
// });

// async function updateQuantity(id, quantity) {
//   const product = await Product.findById(id);
//   product.stock = product.stock - quantity;

//   await product.save({ validateBeforeSave: false });
// }

exports.deleteOrder = AsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found"));
>>>>>>> 393021775158396b2579ef9e97c76d96c9ab1e62
  }

  await order.remove();

  res.status(200).json({
    success: true,
<<<<<<< HEAD
    message: "Order has been canceled",
=======
>>>>>>> 393021775158396b2579ef9e97c76d96c9ab1e62
  });
});
