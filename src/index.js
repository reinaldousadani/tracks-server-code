require("./models/User.js");
require("./models/Track.js");
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes.js");
const trackRoutes = require("./routes/trackRoutes.js");
const requireAuth = require("./middlewares/requireAuth.js");

const app = express();

app.use(express.json());

app.use(authRoutes);
app.use(trackRoutes);

const mongoURI = "";

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
});

mongoose.connection.on("connected", () => {
  console.log("Successfully Connected to MongoDB Instance");
});

mongoose.connection.on("error", (err) => {
  console.error("Error Connecting to MongoDB Instance: ", err);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
