const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("JWT TOKEN INVALID");
    }
    const decodeToken = await jwt.verify(token, "JWT$TOKEN_SECRET_STR");
    const { _id } = decodeToken;
    const user = await User.findOne({ _id });
    if (!user) {
      throw new Error("USER DOES NOT EXIST");
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userAuth,
};
