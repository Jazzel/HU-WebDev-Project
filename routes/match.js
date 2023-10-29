const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Match = require("../models/Match");
const Tournament = require("../models/Tournament");
const Team = require("../models/Team");

// @route    GET api/matches
// @desc     Get all matches
// @access   Public

router.get("/", async (req, res) => {
  try {
    const matches = await Match.find().sort({ timestamp: -1 });

    let matchesData = [];
    for (const match of matches) {
      const tournament = await Tournament.findById(match.tournament);
      const teamA = await Team.findById(match.team_A);
      const teamB = await Team.findById(match.team_B);
      const winner = await Team.findById(match.winner);

      matchesData.push({
        _id: match._id,
        name: match.name,
        timestamp: match.timestamp,
        venue: match.venue,
        tournament: tournament.name,
        team_A: { _id: teamA._id, name: teamA.name },
        team_B: { _id: teamB._id, name: teamB.name },
        team_A_score: match.team_A_score,
        team_B_score: match.team_B_score,
        winner: winner ? { _id: winner._id, name: winner.name } : null,
        summary: match.summary,
      });
    }

    return res.json(matchesData);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// @route    POST api/matches
// @desc     Create an matches
// @access   Private

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("timestamp", "Timestamp is required").not().isEmpty(),
    check("venue", "Venue is required").not().isEmpty(),
    check("tournament", "Tournament is required").not().isEmpty(),
    check("team_A", "Team A is required").not().isEmpty(),
    check("team_B", "Team B is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const newMatch = new Match({
        name: req.body.name,
        timestamp: req.body.timestamp,
        time: req.body.time,
        venue: req.body.venue,
        tournament: req.body.tournament,
        team_A: req.body.team_A,
        team_B: req.body.team_B,
        team_A_score: req.body.team_A_score,
        team_B_score: req.body.team_B_score,
        winner: req.body.winner !== "" ? req.body.winner : null,
        summary: req.body.summary,
      });

      const match = await newMatch.save();

      return res.json(match);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/matches/:id
// @desc     Get match by ID
// @access   Public

router.get("/:id", async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);

    if (!match) return res.status(404).json({ msg: "Match not found" });
    const tournament = await Tournament.findById(match.tournament);
    const teamA = await Team.findById(match.team_A);
    const teamB = await Team.findById(match.team_B);
    const winner = await Team.findById(match.winner);

    let matchData = {
      _id: match._id,
      name: match.name,
      timestamp: match.timestamp,
      venue: match.venue,
      tournament: { _id: tournament._id, name: tournament.name },
      team_A: { _id: teamA._id, name: teamA.name },
      team_B: { _id: teamB._id, name: teamB.name },
      team_A_score: match.team_A_score,
      team_B_score: match.team_B_score,
      winner: winner ? { _id: winner._id, name: winner.name } : null,
      summary: match.summary,
    };
    return res.json(matchData);
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId")
      res.status(404).json({ msg: "Match not found" });

    return res.status(500).send("Server Error");
  }
});

// @route    DELETE api/matches/:id
// @desc     Delete match
// @access   Private

router.delete("/:id", async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);

    if (!match) return res.status(404).json({ msg: "Match not found" });

    await match.deleteOne();
    return res.json({ msg: "Match removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId")
      return res.status(404).json({ msg: "Match not found" });

    return res.status(500).send("Server Error");
  }
});

// @route    PUT api/matches
// @desc     Create an matches
// @access   Private

router.put("/:id", async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);

    if (!match) return res.status(404).json({ msg: "Match not found" });

    match.name = req.body.name ?? match.name;
    match.timestamp = req.body.timestamp ?? match.timestamp;
    match.venue = req.body.venue ?? match.venue;
    match.tournament = req.body.tournament ?? match.tournament;
    match.team_A = req.body.team_A ?? match.team_A;
    match.team_B = req.body.team_B ?? match.team_B;
    match.team_A_score = req.body.team_A_score ?? match.team_A_score;
    match.team_B_score = req.body.team_B_score ?? match.team_B_score;
    match.winner = req.body.winner ?? match.winner;
    match.summary = req.body.summary ?? match.summary;

    await match.save();

    return res.json(match);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
