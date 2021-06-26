// This is where we will store all the authenticating related logic
// Examples like: Sign-In, Sign-Up, etc..

const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = mongoose.model("User");

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = new User({ email: email, password: password });
    await user.save();
    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    res.send({ token: token });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: "Must provide email and password" });
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(422).send({ error: "Wrong password or email" });
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    res.send({ token: token });
  } catch (err) {
    return res.status(422).send({ error: "Wrong password or email" });
  }
});

module.exports = router;
