const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Player = require("../models/Player");
const Team = require("../models/Team");
const City = require("../models/City");

// @route    GET api/Player
// @desc     Get all Player
// @access   Public

router.get("/", async (req, res) => {
  try {
    const players = await Player.find().sort({ date: -1 });

    let playersData = [];
    for (const player of players) {
      const team = await Team.findById(player.team);
      const city = await City.findById(player.city);

      playersData.push({
        _id: player._id,
        first_name: player.first_name,
        last_name: player.last_name,
        team: {
          _id: team._id,
          name: team.name,
        },
        age: player.age,
        city: {
          _id: city._id,
          name: city.name,
        },
        description: player.description,
      });
    }

    return res.json(playersData);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// @route    POST api/Player
// @desc     Create an Player
// @access   Private

router.post(
  "/",
  [
    check("first_name", "First Name is required").not().isEmpty(),
    check("last_name", "Last Name is required").not().isEmpty(),
    check("team", "Team is required").not().isEmpty(),
    check("age", "Age is required").not().isEmpty(),
    check("city", "City is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const newPlayer = new Player({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        team: req.body.team,
        age: req.body.age,
        city: req.body.city,
        description: req.body.description,
      });

      const player = await newPlayer.save();

      return res.json(player);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/Player/:id
// @desc     Get Player by ID
// @access   Public

router.get("/:id", async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);

    if (!player) return res.status(404).json({ msg: "Player not found" });
    const team = await Team.findById(player.team);
    const city = await City.findById(player.city);

    let playerData = {
      _id: player._id,
      first_name: player.first_name,
      last_name: player.last_name,
      team: {
        _id: team._id,
        name: team.name,
      },
      age: player.age,
      city: {
        _id: city._id,
        name: city.name,
      },
      description: player.description,
    };

    return res.json(playerData);
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId")
      return res.status(404).json({ msg: "Player not found" });

    return res.status(500).send("Server Error");
  }
});

// @route    DELETE api/Player/:id
// @desc     Delete Player
// @access   Private

router.delete("/:id", async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);

    if (!player) return res.status(404).json({ msg: "Player not found" });

    await player.deleteOne();
    return res.json({ msg: "Player removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId")
      return res.status(404).json({ msg: "Player not found" });
    return res.status(500).send("Server Error");
  }
});

// @route    PUT api/Player
// @desc     Create an Player
// @access   Private

router.put("/:id", async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);

    if (!player) return res.status(404).json({ msg: "Player not found" });

    player.first_name = req.body.first_name ?? player.first_name;
    player.last_name = req.body.last_name ?? player.last_name;
    player.team = req.body.team ?? player.team;
    player.age = req.body.age ?? player.age;
    player.city = req.body.city ?? player.city;
    player.description = req.body.description ?? player.description;

    await player.save();

    return res.json(player);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
