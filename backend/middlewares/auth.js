const ErrorHandler = require("../utils/ErrorHandler");
const AsyncErrors = require("./AsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// checks if user is authenticated
exports.isAuthenticated = AsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login first", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);

  next();
});

exports.assignRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to acccess this resource`,
          403,
          console.log(req.user.role)
        )
      );
    }

    next();
  };
};
