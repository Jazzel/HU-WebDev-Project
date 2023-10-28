const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const EMH = require("../models/Extra_Match_Details");

// @route    GET api/Extra_Match_Details
// @desc     Get all Extra_Match_Details
// @access   Public

router.get("/", async (req, res) => {
  try {
    const EMH = await EMH.find().sort({ date: -1 });
    return res.json(EMH);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// @route    POST api/Extra_Match_Details
// @desc     Create an Extra_Match_Details
// @access   Private

router.post(
    "/",
    [
        check("field", "Field is required").not().isEmpty(),
        check("value", "Value is required").not().isEmpty(),
        check("match_details", "Match Details is required").not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
    
        if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    
        try {
        const newEMH = new EMH({
            field: req.body.field,
            value: req.body.value,
            match_details: req.body.match_details,
        });
    
        const emh = await newEMH.save();
    
        return res.json(emh);
        } catch (err) {
        console.error(err.message);
        return res.status(500).send("Server Error");
        }
    }
    );

// @route    GET api/Extra_Match_Details/:id
// @desc     Get Extra_Match_Details by ID
// @access   Public

router.get("/:id", async (req, res) => {
  try {
    const emh = await EMH.findById(req.params.id);

    if (!emh) return res.status(404).json({ msg: "Extra Match Details not found" });

    return res.json(emh);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId")
      return res.status(404).json({ msg: "Extra Match Details not found" });

    return res.status(500).send("Server Error");
  }
});

// @route  Delete api/Extra_Match_Details/:id
// @desc   Delete a Extra_Match_Details
// @access Private

router.delete("/:id", async (req, res) => {
    try {
        const emh = await EMH.findById(req.params.id);

        if (!emh) return res.status(404).json({ msg: "Extra Match Details not found" });

        await emh.remove();

        return res.json({ msg: "Extra Match Details removed" });
    } catch (err) {
      console.error(err.message);
      if (err.kind === "ObjectId")
            return res.status(404).json({ msg: "Extra Match Details not found" });

      return res.status(500).send("Server Error");
    }
});

// @route    PUT api/Extra_Match_Details/:id
// @desc     Update a Extra_Match_Details
// @access   Private

router.put("/:id", async (req, res) => {
    try {
        const emh = await EMH.findById(req.params.id);

        if (!emh) return res.status(404).json({ msg: "Extra Match Details not found" });

        emh.field = req.body.field ?? emh.field;
        emh.value = req.body.value ?? emh.value;
        emh.match_details = req.body.match_details ?? emh.match_details;

        await emh.save();

        return res.json(emh);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Server Error");
    }
    });

module.exports = router;    