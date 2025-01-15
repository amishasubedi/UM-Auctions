const User = require("../models/user");
const ErrorHandler = require("../utils/ErrorHandler");
const AsyncErrors = require("../middlewares/AsyncErrors");
const sendToken = require("../utils/token");
const sendEmail = require("../utils/SendEmail");
const crypto = require("crypto");

// User Registration
exports.registerUser = AsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  sendToken(user, 201, res);
});

// User Login
exports.loginUser = AsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Email and password are required", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.isValidatedPassword(password))) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

// User Logout
exports.logoutUser = AsyncErrors(async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({ success: true, message: "Logged out successfully" });
});

// Get User by ID
exports.getUserById = AsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new ErrorHandler("User not found", 404));

  res.status(200).json({ success: true, user });
});

// Forgot Password
exports.forgotPassword = AsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new ErrorHandler("User not found", 404));

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;
  const message = `Click the link to reset your password: \n\n${resetURL}`;

  try {
    await sendEmail({ email: user.email, subject: "Password Reset", message });
    res
      .status(200)
      .json({ success: true, message: `Email sent to ${user.email}` });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler("Email could not be sent", 500));
  }
});

// Reset Password
exports.resetPassword = AsyncErrors(async (req, res, next) => {
  const resetTokenHash = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken: resetTokenHash,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user)
    return next(new ErrorHandler("Invalid or expired reset token", 400));
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords do not match", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendToken(user, 200, res);
});

// Get Logged-in User Profile
exports.getUserProfile = AsyncErrors(async (req, res) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ success: true, user });
});

// Update Password
exports.updatePassword = AsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  if (!(await user.isValidatedPassword(req.body.currentPassword))) {
    return next(new ErrorHandler("Current password is incorrect", 400));
  }

  user.password = req.body.password;
  await user.save();
  sendToken(user, 200, res);
});

// Update Profile
exports.updateProfile = AsyncErrors(async (req, res) => {
  const updatedData = { name: req.body.name, email: req.body.email };
  const user = await User.findByIdAndUpdate(req.user.id, updatedData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, user });
});

// Admin: Get All Users
exports.getAllUsers = AsyncErrors(async (req, res) => {
  const users = await User.find();
  res.status(200).json({ success: true, users });
});

// Admin: Get User Details
exports.getUserDetails = AsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new ErrorHandler("User not found", 404));

  res.status(200).json({ success: true, user });
});

// Admin: Update User Role
exports.updateUserRole = AsyncErrors(async (req, res) => {
  const updatedData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  const user = await User.findByIdAndUpdate(req.params.id, updatedData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, user });
});

// Admin: Delete User
exports.deleteUser = AsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new ErrorHandler("User not found", 404));

  await user.remove();
  res.status(200).json({ success: true, message: "User deleted successfully" });
});
