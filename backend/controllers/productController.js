const Product = require("../models/product");
const ErrorHandler = require("../utils/ErrorHandler");
const AsyncErrors = require("../middlewares/AsyncErrors");
const APIProduct = require("../utils/api");
const cloudinary = require("cloudinary");
const Bid = require("../models/bid"); // Assuming Bid model is defined

// Create new product
exports.newProduct = AsyncErrors(async (req, res, next) => {
  let images = req.body.images || [];

  let imagesLinks = [];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "Products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// Display all products
exports.getProducts = AsyncErrors(async (req, res, next) => {
  const productsInPage = 4;
  const numberOfProducts = await Product.countDocuments();

  const apiProduct = new APIProduct(Product.find(), req.query)
    .search()
    .filter();

  apiProduct.pagination(productsInPage);

  let products = await apiProduct.query;

  res.status(200).json({
    success: true,
    numberOfProducts,
    productsInPage,
    products,
  });
});

// Get admin products
exports.getAdminProducts = AsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

// Get single product
exports.getSingleProduct = AsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const bids = await Bid.find({ product: product._id }).sort({ bidAmount: -1 }); // Get bids sorted by highest bid

  res.status(200).json({
    success: true,
    product,
    bids, // Attach bids to the product response
  });
});

// Update product
exports.updateProduct = AsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// Delete product -> Only admin can delete the product
exports.deleteProduct = AsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

// Create a bid for a product
exports.placeBid = AsyncErrors(async (req, res, next) => {
  const { bidAmount } = req.body;
  const productId = req.params.id;
  const userId = req.user.id;

  const product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // Check if the bidding is open
  if (new Date() < product.bidStart || new Date() > product.bidEnd) {
    return next(new ErrorHandler("Bidding is not open for this product", 400));
  }

  const highestBid = await Bid.findOne({ product: productId }).sort({
    bidAmount: -1,
  });

  // Ensure the bid is higher than the current highest bid
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

// Get all bids for a product
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
