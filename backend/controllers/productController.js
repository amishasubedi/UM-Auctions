const Product = require("../models/product");

// create new product
exports.newProduct = async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
};

// display all product
exports.getProducts = async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    // message: "This route will show all route in database",
    count: products.length,
    products,
  });
};

// get single product
exports.getSingleProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!Product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  // if product is found
  res.status(200).json({
    success: true,
    product,
  });
};
