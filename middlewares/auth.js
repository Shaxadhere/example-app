const jwt = require("jsonwebtoken");
const { ApiResponse } = require("../helpers");
const messages = require("../constants/messages");

//generate token for verification
module.exports.generateAccessToken = function generateAccessToken(username) {
  return jwt.sign(username, process.env.JWT_SECRET, {});
};

//authenticate token
module.exports.authenticateToken = function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
    return res
      .status(401)
      .send(ApiResponse(false, messages.auth.ACCESS_DENIED));
  else
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err)
        return res
          .status(403)
          .json(ApiResponse(false, messages.auth.TOKEN_EXPIRED));
      req.user = user.user;
      next();
    });
};

// Authentication token for admin
module.exports.authenticateAdminToken = function authenticateAdminToken(
  req,
  res,
  next
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
    return res
      .status(401)
      .send(ApiResponse(false, messages.auth.ACCESS_DENIED));
  else
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res
          .status(403)
          .json(ApiResponse(false, messages.auth.TOKEN_EXPIRED));
      } else {
        if (user.user.userType !== 1)
          return res
            .status(401)
            .json(ApiResponse(false, messages.auth.UNAUTHORIZED_ACCESS));
        req.user = user.user;
        next();
      }
    });
};
