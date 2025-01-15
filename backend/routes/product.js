const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const {
  newProduct,
  getProducts,
  getAdminProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  placeBid,
  getProductBids,
=======

// import getProducts
const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getAdminProducts,
>>>>>>> 393021775158396b2579ef9e97c76d96c9ab1e62
} = require("../controllers/productController");

const { isAuthenticated, assignRole } = require("../middlewares/auth");

<<<<<<< HEAD
// Product Routes
router.route("/products").get(getProducts); // Display all products
router.route("/product/:id").get(getSingleProduct); // Get single product
router.route("/product/:id/bids").get(getProductBids); // Get all bids for a product
router
  .route("/admin/products")
  .get(isAuthenticated, assignRole("admin"), getAdminProducts); // Admin: Get all products

// Admin Product Management Routes
router
  .route("/admin/product")
  .post(isAuthenticated, assignRole("admin"), newProduct); // Admin: Create new product
router
  .route("/admin/product/:id")
  .put(isAuthenticated, assignRole("admin"), updateProduct) // Admin: Update product
  .delete(isAuthenticated, assignRole("admin"), deleteProduct); // Admin: Delete product

// Bidding Routes
router.route("/product/:id/bid").post(isAuthenticated, placeBid); // Place a bid
=======
router.route("/products").get(getProducts); // get - extracts product from db
router.route("/admin/products").get(getAdminProducts); // get - extracts product from db

router.route("/product/:id").get(getSingleProduct);
router.route("/products/new").post(isAuthenticated, newProduct); // post -> add data to db
router.route("/products/:id").put(isAuthenticated, updateProduct); // put -> to edit data

router
  .route("/admin/products/:id")
  .delete(isAuthenticated, assignRole("admin"), deleteProduct);
>>>>>>> 393021775158396b2579ef9e97c76d96c9ab1e62

module.exports = router;
