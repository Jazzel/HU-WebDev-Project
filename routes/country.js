const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Country = require("../models/Country");

// @route    GET api/country
// @desc     Get all country
// @access   Public

router.get("/", async (req, res) => {
  try {
    const country = await Country.find().sort({ date: -1 });
    return res.json(country);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// @route    POST api/country
// @desc     Create an country
// @access   Private

router.post(
  "/",
  [check("name", "Name is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const newCountry = new Country({
        name: req.body.name,
      });

      const country = await newCountry.save();

      return res.json(country);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/country/:id
// @desc     Get country by ID
// @access   Public

router.get("/:id", async (req, res) => {
  try {
    const country = await Country.findById(req.params.id);

    if (!country) return res.status(404).json({ msg: "Country not found" });

    return res.json(country);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId")
      return res.status(404).json({ msg: "Country not found" });
    return res.status(500).send("Server Error");
  }
});

// @route    DELETE api/country/:id
// @desc     Delete a country
// @access   Private

router.delete("/:id", async (req, res) => {
  try {
    const country = await Country.findById(req.params.id);

    if (!country) return res.status(404).json({ msg: "Country not found" });

    await country.deleteOne();

    return res.json({ msg: "Country removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId")
      return res.status(404).json({ msg: "Country not found" });
    return res.status(500).send("Server Error");
  }
});

// @route    PUT api/country/:id
// @desc     Update a country
// @access   Private

router.put("/:id", async (req, res) => {
  try {
    const country = await Country.findById(req.params.id);

    if (!country) return res.status(404).json({ msg: "Country not found" });

    country.name = req.body.name ?? country.name;

    await country.save();

    return res.json(country);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
