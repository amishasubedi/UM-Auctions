const Product = require("../models/product");
const ErrorHandler = require("../utils/ErrorHandler");
const AsyncErrors = require("../middlewares/AsyncErrors");
const APIProduct = require("../utils/api");
// create new product
exports.newProduct = AsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// display all product
exports.getProducts = AsyncErrors(async (req, res, next) => {
  const productsInPage = 7;
  const numberOfProducts = await Product.countDocuments();
  const apiProduct = new APIProduct(Product.find(), req.query)
    .search()
    .filter()
    .pagination(productsInPage);

  //const products = await Product.find();
  const products = await apiProduct.query;

  setTimeout(() => {
    res.status(200).json({
      success: true,
      // message: "This route will show all route in database",
      // count: products.length,
      numberOfProducts,
      products,
    });
  }, 600);
});

// get single product
exports.getSingleProduct = AsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
    // res.status(404).json({
    //   success: false,
    //   message: "Product not found",
    // });
  }

  // if product is found
  res.status(200).json({
    success: true,
    product,
  });
});

// update product
exports.updateProduct = AsyncErrors(async (req, res, next) => {
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
});

// delete product -> only admin can delete the bid -> /api/v1/admin/products
exports.deleteProduct = AsyncErrors(async (req, res, next) => {
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
});
