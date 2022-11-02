const express = require("express");
const router = express.Router();

// import getProducts
const {
  getProducts,
  newProduct,
  getSingleProduct,
} = require("../controllers/productController");

router.route("/products").get(getProducts);
router.route("/products/:id").get(getSingleProduct);

router.route("/products/new").post(newProduct);

module.exports = router;
