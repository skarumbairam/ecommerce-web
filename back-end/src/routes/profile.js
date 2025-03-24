const express = require("express");
const profileRouter = express.Router();
const User = require("../models/user");

/**
 *
 * Profile APIs
 * GET - profile/view
 * PATCH - profile/edit
 * PATCH - profile/password (forgot password)
 * DELETE - profile/delete
 *
 */

// Get User by Email GET
profileRouter.get("/profile", async (req, res, next) => {
  const user = req.user;
  try {
    res.json({
      message: "Fetching User Profile",
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        emailId: user.emailId,
        skils: user.skils,
      },
    });
  } catch (error) {
    next(error);
  }
});

// Get All Users Feed  GET ALL
profileRouter.get("/profile/feed", async (req, res, next) => {
  try {
    const users = await User.find({});
    if (users.length > 0) {
      res.send(users);
    } else {
      res.send("Users Empty");
    }
  } catch (error) {
    next("Something Wrong" + error);
  }
});

// Delete User by user ID DELETE
profileRouter.delete("/profile/delete", async (req, res, next) => {
  try {
    const { userId } = req.body;
    //await User.findOneAndDelete({ _id: userId });
    await User.findOneAndDelete(userId);
    res.send("User Entry Has been deleted from DB");
  } catch (error) {
    next("Something Wrong" + error);
  }
});

profileRouter.patch("/profile/edit", async (req, res, next) => {
  const data = req.body;
  try {
    const { userId } = req.body;
    const ALLOW_UPDATES = ["userId", "age", "skill", "gender"];
    const isUpdateAllowed = Object.keys(data).every((item) =>
      ALLOW_UPDATES.includes(item)
    );
    if (!isUpdateAllowed) {
      throw new Error("Updates not allowed");
    }
    const doc = req.body;
    await User.findByIdAndUpdate(userId, doc);
    res.send("User Entry Has been updated from DB");
  } catch (error) {
    next("Something Wrong" + error);
  }
});

profileRouter.patch("/profile/edit/:userId", async (req, res, next) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const ALLOW_UPDATES = ["age", "skils", "gender"];

    const isUpdateAllowed = Object.keys(data).every((item) =>
      ALLOW_UPDATES.includes(item)
    );

    if (!isUpdateAllowed) {
      throw new Error("Updates not allowed");
    }

    if (data?.skils.length > 10) {
      throw new Error("Allowed only 10 Skils");
    }

    await User.findByIdAndUpdate(userId, data);
    res.send("User Entry Has been updated from DB");
  } catch (error) {
    next("Something Wrong" + error);
  }
});

module.exports = profileRouter;
