const express = require("express");
const router = express.Router();

// import getProducts
const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getAdminProducts,
} = require("../controllers/productController");

const { isAuthenticated, assignRole } = require("../middlewares/auth");

router.route("/products").get(getProducts); // get - extracts product from db
router.route("/admin/products").get(getAdminProducts); // get - extracts product from db

router.route("/product/:id").get(getSingleProduct);
router.route("/products/new").post(isAuthenticated, newProduct); // post -> add data to db
router.route("/products/:id").put(isAuthenticated, updateProduct); // put -> to edit data

router
  .route("/admin/products/:id")
  .delete(isAuthenticated, assignRole("admin"), deleteProduct);

module.exports = router;
