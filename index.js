require("dotenv").config();
const {
  notesRouter,
  registerRouter,
  loginRouter,
  userDltRouter,
} = require("./routes");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const { PswHashing, jwtAuthentication } = require("./middleware");
const cors = require("cors");

const port = process.env.PORT || 8000;
const dbUrl = process.env.DATABASE_URL;

const dbConnection = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Error " + error);
  }
};

dbConnection();
app.listen(port, () => {
  console.log(`Server started listening at ${port}`);
});

app.use(
  cors({
    origin:
      "https://66eabe1d2935226ae3afdeea--inquisitive-cobbler-4e4967.netlify.app",
  })
);
app.use(express.json());

app.use("/user", loginRouter);
app.use("/user", PswHashing, registerRouter);
app.use("/note", jwtAuthentication, notesRouter);
app.use("/profile", userDltRouter);
