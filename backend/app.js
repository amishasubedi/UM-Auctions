const express = require("express");
const errorMiddleware = require("./middlewares/Errors");
const app = express();

app.use(express.json());

// import all routes
const products = require("./routes/product");

app.use("/api/v1", products);
app.use(errorMiddleware); // to handle global errors

module.exports = app;
