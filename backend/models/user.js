const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Your name"],
    maxLength: [30, "Your name cannot exceed 30 characters "],
  },

  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
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
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },

  role: {
    type: String,
    default: "user",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

///password encryption using bcrypt before saving the user -HOOKS
userSchema.pre("save", async function (next) {
  //if the password is not modified then move to the next middleware
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(100);
  this.password = await bcrypt.hash(this.password, salt);
});

//compare the password entered by the user with the password in the database
userSchema.methods.isValidatedPassword = async function (userSendPassword) {
  console.log("test1: " + userSendPassword);
  console.log("test2: " + this.password);

  return await bcrypt.compareSync(this.password, userSendPassword);
};

//create and return the jwt token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

module.exports = mongoose.model("User", userSchema);
