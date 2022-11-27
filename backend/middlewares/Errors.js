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

    // handle mongo error
    if (err.name === "CastError") {
      const message = `Resource not found. Invalid ${err.path}`;

      error = new ErrorHandler(message, 400);
    }

    // JWT Errors
    if (err.name === "JsonWebTokenError") {
      const message = `JSON Web Token is invalid`;
      error = new ErrorHandler(message, 400);
    }

    // Expired Token errors
    if (err.name === "TokenExpiredError") {
      const message = `Json Web Token is expired`;
      error = new ErrorHandler(message, 400);
    }

    // duplicate key erros
    if (err.code === 11000) {
      const message = `The user with this ${Object.keys(
        err.keyValue
      )} already exists.`;
      error = new ErrorHandler(message, 400);
    }

    // validation errors
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      error = new ErrorHandler(message, 400);
    }

    res.status(err.errorCode).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
