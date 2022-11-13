const express = require("express");
const errorMiddleware = require("./middlewares/Errors");
const app = express();

app.use(express.json());

// import all routes
const products = require("./routes/product");
const auth = require("./routes/auth");

app.use("/api/v1", products);
app.use("/api/v1", auth);
app.use(errorMiddleware); // to handle global errors

module.exports = app;
