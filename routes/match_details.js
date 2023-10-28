const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const MD = require("../models/Match_Details");

// @route    GET api/Match_Datils
// @desc     Get all Match_Datils
// @access   Public

router.get("/", async (req, res) => {
  try {
    const MD = await MD.find().sort({ date: -1 });
    return res.json(MD);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// @route    POST api/Match_Datils
// @desc     Create an Match_Datils
// @access   Private

router.post(
    "/",
    [
        check("match", "Match is required").not().isEmpty(),
        check("player", "Player is required").not().isEmpty(),
        check("score", "Score is required").not().isEmpty(),
        check("description", "Description is required").not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
    
        if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    
        try {
        const newMD = new MD({
            match: req.body.match,
            player: req.body.player,
            score: req.body.score,
            description: req.body.description,
        });
    
        const md = await newMD.save();
    
        return res.json(md);
        } catch (err) {
        console.error(err.message);
        return res.status(500).send("Server Error");
        }
    }
);

// @route    GET api/Match_Datils/:id
// @desc     Get Match_Datils by ID
// @access   Public

router.get("/:id", async (req, res) => {
  try {
    const md = await MD.findById(req.params.id);

    if (!md) return res.status(404).json({ msg: "Match Datils not found" });

    return res.json(md);
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId")
      return res.status(404).json({ msg: "Match Datils not found" });

    return res.status(500).send("Server Error");
  }
});


// @route  Delete api/Match_Datils/:id
// @desc   Delete a Match_Datils
// @access Private

router.delete("/:id", async (req, res) => {
    try {
      const md = await MD.findById(req.params.id);
    
      if (!md) return res.status(404).json({ msg: "Match Datils not found" });
    
      await md.remove();
    
      return res.json({ msg: "Match Datils removed" });
    } catch (err) {
      console.error(err.message);
      if (err.kind === "ObjectId")

          return res.status(404).json({ msg: "Match Datils not found" });
      return res.status(500).send("Server Error");
    }
});

// @route    PUT api/Match_Datils/:id
// @desc     Update a Match_Datils  
// @access   Private


router.put("/:id", async (req, res) => {
    try {
        const md = await MD.findById(req.params.id);
    
        if (!md) return res.status(404).json({ msg: "Match Datils not found" });
    
        md.match = req.body.match ?? md.match;
        md.player = req.body.player ?? md.player;
        md.score = req.body.score ?? md.score;
        md.description = req.body.description ?? md.description;
    
        await md.save();
    
        return res.json(md);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Server Error");
    }
    });


module.exports = router;