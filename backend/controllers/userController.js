const User = require("../models/user");
const ErrorHandler = require("../utils/ErrorHandler");
const AsyncErrors = require("../middlewares/AsyncErrors");
const sendToken = require("../utils/token");
const sendEmail = require("../utils/SendEmail");
const crypto = require("crypto");

exports.registerUser = AsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
  });

  sendToken(user, 200, res);
});

//user login controller
exports.authenticate = AsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  //check email and password are provided or not
  if (!email || !password) {
    return next(new ErrorHandler("please provide email and password", 400));
  }

  //check if user exists or not in the database
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("yo error", 400));
  }

  //check if the password is valid or not
  const isCorrectPassword = await user.isValidatedPassword(password);

  if (!isCorrectPassword) {
    return next(new ErrorHandler("not working", 400));
  }
  sendToken(user, 200, res);
});

// logout user
exports.logout = AsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Successfully logged out",
  });
});

// api/v1/user/:id
exports.getUserById = AsyncErrors(async (req, res, next, id) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("User not found", 400));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

/*exports.getSingleProduct = AsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
    // res.status(404).json({
    //   success: false,
    //   message: "Product not found",
    // });
  }

  // if product is found
  res.status(200).json({
    success: true,
    product,
  });
});
*/

// forgot password
exports.forgotPassword = AsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not registered with this email", 404));
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  //  url to reset the password
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Reset your password from here: \n\n${resetURL}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "UMAuction Password Recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

// password recovery
exports.resetPassword = AsyncErrors(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Password reset token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// logged in user
exports.getUserProfile = AsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// change password
exports.updatePassword = AsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isCorrectPassword = await user.isValidatedPassword(
    req.body.currentPassword
  );
  if (!isCorrectPassword) {
    return next(new ErrorHandler("Current password is incorrect"));
  }

  user.password = req.body.password;
  await user.save();

  sendToken(user, 200, res);
});

// edit profile
exports.editProfile = AsyncErrors(async (req, res, next) => {
  const newData = {
    name: req.body.name,
    email: req.body.email,
  };

  // update profile picture - idk how to ?

  // just edit name and email
  const user = await User.findByIdAndUpdate(req.user.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// ADMIN ROUTES
exports.allUsers = AsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

exports.userDetails = AsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("User not found"));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

exports.updateProfile = AsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// delete user
exports.deleteUser = AsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not found with id: ${req.params.id}`)
    );
  }

  await user.remove();

  res.status(200).json({
    success: true,
  });
});
