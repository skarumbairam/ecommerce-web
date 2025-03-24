require("dotenv").config({});
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { connectDB } = require("./src/config/database");

// Routes
const authRouter = require("./src/routes/auth");
const profileRouter = require("./src/routes/profile");

// Middlewares
const { userAuth } = require("./src/middlewares/auth");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/", authRouter);
app.use("/", userAuth, profileRouter);

// Error Handling
app.use((err, req, res, next) => {
  res.status(400).send(err.message);
});

connectDB()
  .then((res) => {
    console.log("DB Connection Successful !");
    app.listen(PORT, (err) => {
      try {
        console.log("App Initiated !");
      } catch (err) {
        console.log("App Error !", err);
      }
    });
  })
  .catch((err) => {
    console.log("DB Connection Error!", err);
  });
