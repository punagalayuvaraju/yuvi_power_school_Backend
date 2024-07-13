const jwt = require("jsonwebtoken");
const errorCodes = require("../constants/errorCodes");
const errorMessages = require("../constants/errorMsgs");
const response = require("./response");
const verifyToken = async (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["token"];
  if (token) {
    token = token.replace("Bearer ", "");
    return jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
      if (err) {
        response.invalid(
          req,
          res,
          errorCodes.HTTP_UNAUTHORIZED,
          errorMessages[errorCodes.HTTP_UNAUTHORIZED]
        );
      } else {
        console.log(payload);
        next();
      }
    });
  } else {
    response.invalid(
      req,
      res,
      errorCodes.HTTP_UNAUTHORIZED,
      errorMessages[errorCodes.HTTP_UNAUTHORIZED]
    );
  }
};

module.exports = verifyToken;
