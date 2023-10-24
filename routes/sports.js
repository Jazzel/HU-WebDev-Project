const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Sport = require("../models/Sport");

// @route    GET api/sports
// @desc     Get all sports
// @access   Public
router.get("/", async (req, res) => {
  try {
    const sports = await Sport.find().sort({ date: -1 });
    return res.json(sports);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// @route    POST api/sports
// @desc     Create an sports
// @access   Private
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const newSport = new Sport({
        name: req.body.name,
        description: req.body.description,
      });

      const sport = await newSport.save();

      return res.json(sport);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/sports/:id
// @desc     Get sport by ID
// @access   Public
router.get("/:id", async (req, res) => {
  try {
    const sport = await Sport.findById(req.params.id);

    if (!sport) return res.status(404).json({ msg: "Sport not found" });

    return res.json(sport);
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId")
      return res.status(404).json({ msg: "Sport not found" });

    return res.status(500).send("Server Error");
  }
});

// @route    DELETE api/sports/:id
// @desc     Delete sport
// @access   Private
router.delete("/:id", async (req, res) => {
  try {
    const sport = await Sport.findById(req.params.id);

    if (!sport) return res.status(404).json({ msg: "Sport not found" });

    await sport.deleteOne();
    return res.json({ msg: "Sport removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId")
      return res.status(404).json({ msg: "Sport not found" });

    return res.status(500).send("Server Error");
  }
});

// @route    PUT api/sports
// @desc     Create an sports
// @access   Private
router.put("/:id", async (req, res) => {
  try {
    const sport = await Sport.findById(req.params.id);

    if (!sport) return res.status(404).json({ msg: "Sport not found" });

    sport.name = req.body.name ?? sport.name;
    sport.description = req.body.description ?? sport.description;

    await sport.save();

    return res.json(sport);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
