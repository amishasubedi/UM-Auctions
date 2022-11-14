const User = require("../models/user");

const ErrorHandler = require("../utils/ErrorHandler");
const AsyncErrors = require("../middlewares/AsyncErrors");

exports.registerUser = AsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,

    // hardcoded dp for now
    avatar: {
      public_id: "images/actor_ery7iu",
      url: "https://res.cloudinary.com/dalx1urcp/image/upload/v1668304624/images/actor_ery7iu.png",
    },
  });

  const token = user.getJWTToken();

  res.status(201).json({
    success: true,
    //user,
    token,
  });
});

// login
//user login controller
exports.authenticate = AsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password, req.body);
  //check email and password are provided or not
  if (!email || !password) {
    return next(new CustomError("please provide email and password", 400));
  }

  //check if user exists or not in the database
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(
      new ErrorHandler("please provide valid email and passsword", 400)
    );
  }

  //check if the password is valid or not
  const isCorrectPassword = await user.isValidatedPassword(password);

  if (!isCorrectPassword) {
    return next(new ErrorHandler("not working", 400));
  }

  const token = user.getJWTToken();
  res.status(200).json({
    success: true,
    token,
  });
});
