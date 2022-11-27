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

  res.status(200).json({
    success: true,
    orders,
  });
});

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
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
});
