const express = require("express");
const errorMiddleware = require("./middlewares/Errors");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

// import all routes
const products = require("./routes/product");
const auth = require("./routes/auth");
const orders = require("./routes/order");

app.use("/api/v1", products);
app.use("/api/v1", auth);
app.use("/api/v1", orders);
app.use(errorMiddleware); // to handle global errors

module.exports = app;
