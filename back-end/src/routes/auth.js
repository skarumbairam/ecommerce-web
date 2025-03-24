const express = require("express");
const authRouter = express.Router();
const { formValidation } = require("../utils/appUtils");
const User = require("../models/user");
const bcrypt = require("bcrypt");

/**
 *
 * Auth APIs
 * POST - signup
 * POST - login
 * POST - logout
 *
 */

authRouter.post("/signup", async (req, res, next) => {
  const { password, firstName, lastName, emailId } = req.body;
  try {
    // Validate Form Input
    formValidation(req);
    // bicrypt password
    const passwordHash = await bcrypt.hash(password, 10);
    let user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();

    res.json({
      message: "Signup completed Successfully!",
      data: {
        firstName,
        lastName,
        emailId,
      },
    });
  } catch (error) {
    next(error);
  }
});

authRouter.post("/login", async (req, res, next) => {
  const { emailId, password } = req.body;
  try {
    const user = await User.findOne({ emailId });
    // check email exist
    if (!user) {
      throw new Error("Invalid Credential");
    }
    // match password
    const isPasswordValid = await user.varifyPassword(password);
    if (isPasswordValid) {
      const token = await user.getJWT();
      res.cookie("token", token);
      res.json({
        message: "Login successful",
        data: {
          firstName: user.firstName,
          lastName: user.lastName,
          emailId: user.emailId,
          skils: user.skils,
        },
      });
    } else {
      throw new Error("Invalid credential");
    }
  } catch (error) {
    next(error);
  }
});

authRouter.post("/logout", async (req, res, next) => {
  // Set request header cookie null
  res.cookie("token", null);
  res.json({
    message: "Logout Successful!",
    data: {},
  });
});

module.exports = authRouter;
