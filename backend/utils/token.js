const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();
  const cookie =
    process.env.COOKIE_EXPIRES_TIME.replace("d", "") * 24 * 60 * 60 * 1000;

  const expiryDate = Date.now() + cookie;
  const options = {
    expires: new Date(expiryDate),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
};

module.exports = sendToken;
