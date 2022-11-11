const mongoose = require("mongoose")//starting my editing

const biddingSchema = new mongoose.Schema({
    bidAmmount:{
        type: Number,
      required:  [true, "Please enter how much you want to bid for the product"],

      maxLength: [5, "cannot exceed 5 characters"],

      default: 0.0, // set default price to 0
    },
    
    bidderName: {
        type: String,
        required: [true, "Please enter your name"],
        maxLength: [40, "cannot exceed 40 characters"], // maybe 100 characters?
      },



});