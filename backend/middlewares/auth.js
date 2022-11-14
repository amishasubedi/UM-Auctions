const ErrorHandler = require("../utils/ErrorHandler");
const AsyncErrors = require("./AsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// checks if user is authenticated
exports.isAuthenticated = AsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  console.log(token);

  if (!token) {
    return next(new ErrorHandler("Please login first", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);

  next();
});
