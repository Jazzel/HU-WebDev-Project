const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Tournament = require("../models/Tournament");
const Sport = require("../models/Sport");

// @route    GET api/tournaments
// @desc     Get all tournaments
// @access   Public

router.get("/", async (req, res) => {
  try {
    const tournaments = await Tournament.find().sort({ date: -1 });

    let tournamentsData = [];
    for (const tournament of tournaments) {
      const sport = await Sport.findById(tournament.sport);

      tournamentsData.push({
        _id: tournament._id,
        name: tournament.name,
        sport: {
          _id: sport._id,
          name: sport.name,
        },
        start_date: tournament.start_date,
        end_date: tournament.end_date,
        description: tournament.description,
      });
    }

    return res.json(tournamentsData);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// @route    POST api/tournaments
// @desc     Create an tournaments
// @access   Private

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("sport", "Sport is required").not().isEmpty(),
    check("start_date", "Start Date is required").not().isEmpty(),
    check("end_date", "End Date is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const newTournament = new Tournament({
        name: req.body.name,
        sport: req.body.sport,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        description: req.body.description,
      });

      const tournament = await newTournament.save();

      return res.json(tournament);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/tournaments/:id
// @desc     Get tournament by ID
// @access   Public

router.get("/:id", async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);

    if (!tournament)
      return res.status(404).json({ msg: "Tournament not found" });

    const sport = await Sport.findById(tournament.sport);

    let tournamentData = {
      _id: tournament._id,
      name: tournament.name,
      sport: {
        _id: sport._id,
        name: sport.name,
      },
      start_date: tournament.start_date,
      end_date: tournament.end_date,
      description: tournament.description,
    };

    return res.json(tournamentData);
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId")
      return res.status(404).json({ msg: "Tournament not found" });

    return res.status(500).send("Server Error");
  }
});

// @route    DELETE api/tournaments/:id
// @desc     Delete tournament
// @access   Private

router.delete("/:id", async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);

    if (!tournament)
      return res.status(404).json({ msg: "Tournament not found" });

    await tournament.deleteOne();

    return res.json({ msg: "Tournament removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId")
      return res.status(404).json({ msg: "Tournament not found" });
    return res.status(500).send("Server Error");
  }
});

// @route    PUT api/tournaments/:id
// @desc     Update a tournament
// @access   Private

router.put("/:id", async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);

    if (!tournament)
      return res.status(404).json({ msg: "Tournament not found" });

    tournament.name = req.body.name ?? tournament.name;
    tournament.sport = req.body.sport ?? tournament.sport;
    tournament.start_date = req.body.start_date ?? tournament.start_date;
    tournament.end_date = req.body.end_date ?? tournament.end_date;
    tournament.description = req.body.description ?? tournament.description;

    await tournament.save();

    return res.json(tournament);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
