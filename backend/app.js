const express = require("express");
const errorMiddleware = require("./middlewares/Errors");
const app = express();
const cookieParser = require("cookie-parser");
const bodyparser = require("body-parser");
const cloudinary = require("cloudinary");
//const dotenv = require("dotenv");
const path = require("path");

if (process.env.NODE_ENV !== "PRODUCTION")
  require("dotenv").config({ path: "backend/config/confid.env" });
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

app.set("view engine", "jade");

app.use((err, req, res, next) => {
  res.locals.error = err;
  const status = err.status || 500;
  res.status(status);
  res.render("error");
});

app.use("/api/v1", products);
app.use("/api/v1", auth);
app.use("/api/v1", orders);

if (process.env.NODE_ENV === "PRODUCTION") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
  });
}

//app.use("/api/v1", auction);
app.use(errorMiddleware); // to handle global errors

module.exports = app;
