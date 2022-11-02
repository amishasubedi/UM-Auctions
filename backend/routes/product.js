const express = require("express");
const router = express.Router();

// import getProducts
const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
} = require("../controllers/productController");

router.route("/products").get(getProducts); // get - extracts product from db
router.route("/products/:id").get(getSingleProduct);
router.route("/products/new").post(newProduct); // post -> add data to db
router.route("/products/:id").put(updateProduct); // put -> to edit data

module.exports = router;
