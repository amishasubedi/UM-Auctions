const Bid = require("../models/bid");
const Product = require("../models/product");
const ErrorHandler = require("../utils/ErrorHandler");
const AsyncErrors = require("../middlewares/AsyncErrors");

// Place a new bid on a product
exports.placeBid = AsyncErrors(async (req, res, next) => {
  const { bidAmount } = req.body;
  const productId = req.params.id;
  const userId = req.user.id;

  const product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const currentDate = new Date();
  if (currentDate < product.bidStart || currentDate > product.bidEnd) {
    return next(new ErrorHandler("Bidding is not allowed at this time", 400));
  }

  const highestBid = await Bid.findOne({ product: productId }).sort({
    bidAmount: -1,
  });

  if (highestBid && bidAmount <= highestBid.bidAmount) {
    return next(
      new ErrorHandler(
        "Your bid must be higher than the current highest bid",
        400
      )
    );
  }

  const newBid = await Bid.create({
    user: userId,
    product: productId,
    bidAmount,
  });

  res.status(201).json({
    success: true,
    bid: newBid,
  });
});

// Get all bids placed on a product
exports.getProductBids = AsyncErrors(async (req, res, next) => {
  const productId = req.params.id;

  const product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const bids = await Bid.find({ product: productId }).sort({ bidAmount: -1 });

  res.status(200).json({
    success: true,
    bids,
  });
});

// Get the highest bid for a product
exports.getHighestBid = AsyncErrors(async (req, res, next) => {
  const productId = req.params.id;

  const product = await Product.findById(productId);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const highestBid = await Bid.findOne({ product: productId }).sort({
    bidAmount: -1,
  });

  if (!highestBid) {
    return next(new ErrorHandler("No bids placed yet", 404));
  }

  res.status(200).json({
    success: true,
    highestBid,
  });
});

// Cancel a bid placed by the logged-in user
exports.cancelBid = AsyncErrors(async (req, res, next) => {
  const bidId = req.params.bidId;
  const userId = req.user.id;

  const bid = await Bid.findById(bidId);

  if (!bid) {
    return next(new ErrorHandler("Bid not found", 404));
  }

  if (bid.user.toString() !== userId.toString()) {
    return next(
      new ErrorHandler("You are not authorized to cancel this bid", 403)
    );
  }

  await bid.remove();

  res.status(200).json({
    success: true,
    message: "Bid canceled successfully",
  });
});
