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

  res.status(201).json({
    success: true,
    user,
  });
});
