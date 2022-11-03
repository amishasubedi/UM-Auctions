const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err, req, res, next) => {
  err.errorCode = err.errorCode || 500;
  // err.message = err.message || "Internal Server Error";

  // development errors
  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(err.errorCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack,
    });
  }

  // production errors
  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err }; // destructing to copy erros
    error.message = err.message;

    res.status(err.errorCode).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
