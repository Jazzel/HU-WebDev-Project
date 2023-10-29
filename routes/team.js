const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Team = require("../models/Team");
const Country = require("../models/Country");

// @route    GET api/teams
// @desc     Get all teams
// @access   Public

router.get("/", async (req, res) => {
  try {
    const teams = await Team.find().sort({ date: -1 });

    let teamsData = [];
    for (const team of teams) {
      const country = await Country.findById(team.country);

      teamsData.push({
        _id: team._id,
        name: team.name,
        coach: team.coach,
        country: {
          name: country.name,
          _id: country._id,
        },
        state: team.state,
        description: team.description,
      });
    }

    return res.json(teamsData);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// @route    POST api/teams
// @desc     Create an teams
// @access   Private

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("coach", "Coach is required").not().isEmpty(),
    check("country", "Country is required").not().isEmpty(),
    check("state", "State is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const newTeam = new Team({
        name: req.body.name,
        coach: req.body.coach,
        country: req.body.country,
        state: req.body.state,
        description: req.body.description,
      });

      const team = await newTeam.save();

      return res.json(team);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/teams/:id
// @desc     Get team by ID
// @access   Public

router.get("/:id", async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);

    if (!team) return res.status(404).json({ msg: "Team not found" });
    const country = await Country.findById(team.country);
    let teamData = {
      _id: team._id,
      name: team.name,
      coach: team.coach,
      country: {
        name: country.name,
        _id: country._id,
      },
      state: team.state,
      description: team.description,
    };

    return res.json(teamData);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId")
      return res.status(404).json({ msg: "Team not found" });
    return res.status(500).send("Server Error");
  }
});

// @route    DELETE api/teams/:id
// @desc     Delete team
// @access   Private

router.delete("/:id", async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);

    if (!team) return res.status(404).json({ msg: "Team not found" });

    await team.deleteOne();

    return res.json({ msg: "Team removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId")
      return res.status(404).json({ msg: "Team not found" });

    return res.status(500).send("Server Error");
  }
});

// @route    PUT api/teams/:id
// @desc     Update a team
// @access   Private

router.put("/:id", async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);

    if (!team) return res.status(404).json({ msg: "Team not found" });

    team.name = req.body.name ?? team.name;
    team.coach = req.body.coach ?? team.coach;
    team.country = req.body.country ?? team.country;
    team.state = req.body.state ?? team.state;
    team.description = req.body.description ?? team.description;

    await team.save();

    return res.json(team);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
