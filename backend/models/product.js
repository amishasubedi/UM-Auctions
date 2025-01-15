const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true,
    maxLength: [100, "Product name cannot exceed 100 characters"],
  },
  startingPrice: {
    type: Number,
    required: [true, "Please enter a starting price"],
    min: [0, "Starting price cannot be negative"],
  },
  description: {
    type: String,
    required: [true, "Please enter product description"],
  },
  images: [
    {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },
  ],
  seller: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  bidStart: {
    type: Date,
    default: Date.now,
  },
  bidEnd: {
    type: Date,
    required: [true, "Please provide an auction end time"],
    validate: {
      validator: function (value) {
        return value > this.bidStart;
      },
      message: "Auction end time must be later than the start time",
    },
  },
  currentHighestBid: {
    type: Number,
    default: 0,
  },
  currentHighestBidder: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    default: null,
  },
  isSold: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
