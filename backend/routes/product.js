const express = require("express");
const router = express.Router();
const {
  newProduct,
  getProducts,
  getAdminProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  placeBid,
  getProductBids,
} = require("../controllers/productController");

const { isAuthenticated, assignRole } = require("../middlewares/auth");

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

module.exports = router;
