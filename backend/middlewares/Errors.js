const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err, req, res, next) => {
  err.errorCode = err.errorCode || 500;
  err.message = err.message || "Internal Server Error";

  res.status(err.errorCode).json({
    success: false,
    error: err,
  });
};
