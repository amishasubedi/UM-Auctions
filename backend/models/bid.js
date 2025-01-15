const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
  bidder: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Bidder is required"],
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: [true, "Product is required"],
  },
  amount: {
    type: Number,
    required: [true, "Bid amount is required"],
    min: [1, "Bid amount must be greater than 0"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Bid", bidSchema);
