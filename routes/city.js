const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const City = require("../models/City");
const Country = require("../models/Country");

// @route    GET api/City
// @desc     Get all City
// @access   Public
router.get("/", async (req, res) => {
  try {
    const cities = await City.find().sort({ date: -1 });

    let citiesData = [];
    for (const city of cities) {
      const country = await Country.findById(city.country);

      citiesData.push({
        _id: city._id,
        name: city.name,
        country: {
          _id: country._id,
          name: country.name,
        },
      });
    }

    return res.json(citiesData);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// @route    POST api/City
// @desc     Create an City
// @access   Private
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("country", "Country is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const newCity = new City({
        name: req.body.name,
        country: req.body.country,
      });

      const city = await newCity.save();

      return res.json(city);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/city/:id
// @desc     Get sport by ID
// @access   Public
router.get("/:id", async (req, res) => {
  try {
    const city = await City.findById(req.params.id);

    if (!city) return res.status(404).json({ msg: "City not found" });

    const country = await Country.findById(city.country);

    let cityData = {
      _id: city._id,
      name: city.name,
      country: {
        _id: country._id,
        name: country.name,
      },
    };

    return res.json(cityData);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId")
      return res.status(404).json({ msg: "City not found" });
    return res.status(500).send("Server Error");
  }
});

// @route    DELETE api/city/:id
// @desc     Delete a city
// @access   Private
router.delete("/:id", async (req, res) => {
  try {
    const city = await City.findById(req.params.id);

    if (!city) return res.status(404).json({ msg: "City not found" });

    await city.deleteOne();
    return res.json({ msg: "City removed" });
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId")
      return res.status(404).json({ msg: "City not found" });
    return res.status(500).send("Server Error");
  }
});

// @route    PUT api/city/:id
// @desc     Update a city
// @access   Private

router.put("/:id", async (req, res) => {
  try {
    const city = await City.findById(req.params.id);

    if (!city) return res.status(404).json({ msg: "City not found" });

    city.name = req.body.name ?? city.name;
    city.country = req.body.country ?? city.country;

    await city.save();

    return res.json(city);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
