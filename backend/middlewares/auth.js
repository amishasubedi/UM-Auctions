const AsyncErrors = require("./AsyncErrors");

// checks if user is authenticated
exports.isAuthenticated = AsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  //console.log(token);
});
