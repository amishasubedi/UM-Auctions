const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true, // to remove all blank spaces
    maxLength: [100, "cannot exceed 100 characters"], // maybe 100 characters?
  },

  // bidders can set the min price for their products
  minPrice: {
    type: Number,
    required: [true, "Please enter minimun price for your product"],
    maxLength: [5, "cannot exceed 5 characters"], // maybe 100 characters?
    default: 0.0, // set default price to 0
  },

  description: {
    type: String,
    required: [true, "Please enter the description"],
    maxLength: [500, "cannot exceed 500 characters"], // maybe 100 characters?
  },

  // ratings - totally optional - logic -> average of all user's ratings - do we even need this at all?
  ratings: {
    type: Number,
    default: 0,
  },

  // user can upload multiple images so maybe create an array
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

  // product category so that we can implement search by keyword feature - there should be specific categories to prevent user to
  // to add their own category - handled by enum
  category: {
    type: String,
    required: [true, "Select category for this product"],
    enum: {
      // here values is an array of categories
      values: [
        "Electronics",
        "Paintings",
        "Accessories",
        "Home Decor",
        "Books",
        "Shoes",
        "Health",
        "Outdoor",
        "Storage",
      ],

      message: "Please select category for this item",
    },

    seller: {
      type: String,
      required: [true, "Please enter product seller"],
    },

    status: {
      type: String,
      default: "Pending",
    },

    stock: {
      type: Number,
      required: [true, "Please enter product stock"],
      maxLength: [5],
      default: 0,
    },

    reviews: [
      {
        name: {
          type: String,
          required: true,
        },

        rating: {
          type: Number,
          required: true,
        },

        comment: {
          type: String,
          required: true,
        },
      },
    ],

    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
});

module.exports = mongoose.model("Product", productSchema);
