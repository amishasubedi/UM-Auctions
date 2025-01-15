const mongoose = require("mongoose");
<<<<<<< HEAD

=======
const getDateString = (date) => {
  let year = date.getFullYear();
  let day =
    date.getDate().toString().length === 1
      ? "0" + date.getDate()
      : date.getDate();
  let month =
    date.getMonth().toString().length === 1
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  let hours =
    date.getHours().toString().length === 1
      ? "0" + date.getHours()
      : date.getHours();
  let minutes =
    date.getMinutes().toString().length === 1
      ? "0" + date.getMinutes()
      : date.getMinutes();
  let dateString = `${year}-${month}-${day}T${hours}:${minutes}`;
  return dateString;
};

// declare default bidding start time and end time
const currentDate = new Date();
const defaultStartTime = getDateString(currentDate);
const defaultEndTime = getDateString(
  new Date(currentDate.setHours(currentDate.getHours() + 1))
);

//const mongoose = require("mongoose");
>>>>>>> 393021775158396b2579ef9e97c76d96c9ab1e62
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true,
    maxLength: [100, "Product name cannot exceed 100 characters"],
  },
<<<<<<< HEAD
  startingPrice: {
    type: Number,
    required: [true, "Please enter a starting price"],
    min: [0, "Starting price cannot be negative"],
=======
  price: {
    type: Number,
    required: [true, "Please enter product price"],
    maxLength: [5, "Product name cannot exceed 5 characters"],
    default: 0.0,
>>>>>>> 393021775158396b2579ef9e97c76d96c9ab1e62
  },
  description: {
    type: String,
    required: [true, "Please enter product description"],
  },
<<<<<<< HEAD
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
=======

  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],

  seller: {
    type: String,
    required: [true, "Please enter product seller"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter product stock"],
    maxLength: [5, "Product name cannot exceed 5 characters"],
    default: 0,
  },
  bidStart: {
    type: Date,
    default: defaultStartTime,
  },

  bidEnd: {
    type: Date,
    bidEnd: defaultEndTime,
  },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
>>>>>>> 393021775158396b2579ef9e97c76d96c9ab1e62
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
