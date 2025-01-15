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
router.route("/products").get(getProducts);
router.route("/product/:id").get(getSingleProduct);
router.route("/product/:id/bids").get(getProductBids);

// admin routes
router
  .route("/admin/products")
  .get(isAuthenticated, assignRole("admin"), getAdminProducts);
router
  .route("/admin/product")
  .post(isAuthenticated, assignRole("admin"), newProduct);
router
  .route("/admin/product/:id")
  .put(isAuthenticated, assignRole("admin"), updateProduct)
  .delete(isAuthenticated, assignRole("admin"), deleteProduct);

// Bidding Routes
router.route("/product/:id/bid").post(isAuthenticated, placeBid);

module.exports = router;
