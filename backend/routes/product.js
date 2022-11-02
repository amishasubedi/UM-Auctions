const express = require("express");
const router = express.Router();

// import getProducts
const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
} = require("../controllers/productController");

router.route("/products").get(getProducts);
router.route("/products/:id").get(getSingleProduct);
router.route("/products/new").post(newProduct);
router.route("/admin/products/:id").put(getSingleProduct); // to edit

module.exports = router;
