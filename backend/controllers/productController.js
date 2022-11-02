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

  if (!product) {
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

// update product
exports.updateProduct = async (req, res, next) => {
  let product = Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
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
};

// delete product -> only admin can delete the bid -> /api/v1/admin/products
exports.deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product is deleted",
  });
};
