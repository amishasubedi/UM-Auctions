const express = require("express");
const errorMiddleware = require("./middlewares/Errors");
const app = express();
const cookieParser = require("cookie-parser");
const bodyparser = require("body-parser");
const cloudinary = require("cloudinary");

app.use(express.json());
app.use(cookieParser());
app.use(bodyparser.urlencoded({ extended: true }));

// upload image fetch
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// import all routes
const products = require("./routes/product");
const auth = require("./routes/auth");
const orders = require("./routes/order");
//const auction = require("./routes/auction");

app.use("/api/v1", products);
app.use("/api/v1", auth);
app.use("/api/v1", orders);
//app.use("/api/v1", auction);
app.use(errorMiddleware); // to handle global errors

module.exports = app;
