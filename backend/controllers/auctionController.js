const Auction = require("../models/auction");
const ErrorHandler = require("../utils/ErrorHandler");
const User = require("../models/user");
const AsyncErrors = require("../middlewares/AsyncErrors");

exports.createAuction = AsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const auction = await Auction.create(req.body);

  res.status(201).json({
    success: true,
    auction,
  });
});
