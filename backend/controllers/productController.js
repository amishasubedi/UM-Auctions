const Product = require("../models/product");
const ErrorHandler = require("../utils/ErrorHandler");
const AsyncErrors = require("../middlewares/AsyncErrors");
const APIProduct = require("../utils/api");
const cloudinary = require("cloudinary");

// create new product
exports.newProduct = AsyncErrors(async (req, res, next) => {
  let images = [];

  // push the images into an array
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  let imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  re.body.images = imagesLinks;

  req.body.user = req.user.id;
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// display all product
exports.getProducts = AsyncErrors(async (req, res, next) => {
  const productsInPage = 4;
  const numberOfProducts = await Product.countDocuments();

  const apiProduct = new APIProduct(Product.find(), req.query)
    .search()
    .filter();

  apiProduct.pagination(productsInPage);

  let products = await apiProduct.query;
  //let filteredProductsCount = products.length;

  //products = await apiProduct.query;

  res.status(200).json({
    success: true,
    numberOfProducts,
    productsInPage,
    // filteredProductsCount,
    products,
  });
});

exports.getAdminProducts = AsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
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

  for (let i = 0; i < product.images.length; i++) {
    const result = await cloudinary.v2.uploader.destroy(
      product.images[i].public_id
    );
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product is deleted",
  });
});
