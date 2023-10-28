const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Match = require("../models/Match");


// @route    GET api/matches
// @desc     Get all matches
// @access   Public

router.get("/", async (req, res) => {
  try {
    const matches = await Match.find().sort({ date: -1 });
    return res.json(matches);
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
        check("date", "Date is required").not().isEmpty(),
        check("time", "Time is required").not().isEmpty(),
        check("venue", "Venue is required").not().isEmpty(),
        check("tournament", "Tournament is required").not().isEmpty(),
        check("team_A", "Team A is required").not().isEmpty(),
        check("team_B", "Team B is required").not().isEmpty(),
        check("team_A_score", "Team A Score is required").not().isEmpty(),
        check("team_B_score", "Team B Score is required").not().isEmpty(),
        check("winner", "Winner is required").not().isEmpty(),
        check("summary", "Summary is required").not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
    
        if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    
        try {
        const newMatch = new Match({
            name: req.body.name,
            date: req.body.date,
            time: req.body.time,
            venue: req.body.venue,
            tournament: req.body.tournament,
            team_A: req.body.team_A,
            team_B: req.body.team_B,
            team_A_score: req.body.team_A_score,
            team_B_score: req.body.team_B_score,
            winner: req.body.winner,
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
    
        return res.json(match);
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

router.put(":/id", async (req, res) => {
    try {
       const match = await Match.findById(req.params.id);
        
            if (!match) return res.status(404).json({ msg: "Match not found" });
        
            match.name = req.body.name ?? match.name;
            match.date = req.body.date ?? match.date;
            match.time = req.body.time ?? match.time;
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