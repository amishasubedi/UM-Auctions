const mongoose = require("mongoose");
<<<<<<< HEAD
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
=======
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
>>>>>>> 393021775158396b2579ef9e97c76d96c9ab1e62

const userSchema = new mongoose.Schema({
  name: {
    type: String,
<<<<<<< HEAD
    required: [true, "Please enter your name"],
    maxLength: [50, "Name cannot exceed 50 characters"],
  },
=======
    required: [true, "Your name"],
    maxLength: [30, "Your name cannot exceed 30 characters "],
  },

>>>>>>> 393021775158396b2579ef9e97c76d96c9ab1e62
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
<<<<<<< HEAD
    validate: {
      validator: function (email) {
        return /^\S+@\S+\.\S+$/.test(email);
      },
      message: "Please enter a valid email address",
    },
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [8, "Password must be at least 8 characters"],
    select: false,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
=======
    validate: [validator.isEmail, "Please enter valid email address"],
  },

  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [8, "Your password must be longer than 8 characters"],
    select: false,
  },

  avatar: {
    public_id: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: false,
    },
  },

  role: {
    type: String,
    default: "user",
  },

>>>>>>> 393021775158396b2579ef9e97c76d96c9ab1e62
  createdAt: {
    type: Date,
    default: Date.now,
  },
<<<<<<< HEAD
});

// Encrypt password before saving
userSchema.pre("save", async function (next) {
=======

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

//password encryption using bcrypt before saving the user -HOOKS
userSchema.pre("save", async function (next) {
  //if the password is not modified then move to the next middleware
>>>>>>> 393021775158396b2579ef9e97c76d96c9ab1e62
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

<<<<<<< HEAD
// JWT token generation
=======
//compare the password entered by the user with the password in the database
userSchema.methods.isValidatedPassword = async function (usersendpassword) {
  return await bcrypt.compare(usersendpassword, this.password);
};

//create and return the jwt token
>>>>>>> 393021775158396b2579ef9e97c76d96c9ab1e62
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

<<<<<<< HEAD
=======
// Reset Password Token
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  // Please note that you need to specify a time to expire this token. In this example is (10 min)
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

>>>>>>> 393021775158396b2579ef9e97c76d96c9ab1e62
module.exports = mongoose.model("User", userSchema);
