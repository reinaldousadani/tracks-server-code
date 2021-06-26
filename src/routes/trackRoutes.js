const express = require("express");
const mongoose = require("mongoose");
const Track = mongoose.model("Track");
const requireAuth = require("./../middlewares/requireAuth");
const router = express.Router();

router.use(requireAuth); // this is because the user need to be logged in to use the routes in here.

router.get("/tracks", async (req, res) => {
  const tracks = await Track.find({ userId: req.user._id });
  res.send(tracks);
});

router.post("/tracks", async (req, res) => {
  const { name, locations } = req.body;
  if (!name || !locations) {
    return res
      .status(422)
      .send({ error: "You must provide name and locations." });
  }
  try {
    const track = new Track({
      name: name,
      locations: locations,
      userId: req.user._id,
    });
    await track.save();
    res.send(track);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

module.exports = router;
