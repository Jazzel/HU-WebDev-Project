const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const connectDB = require("./../config/db");
const sql = require("mssql");

// @route    GET api/matchDetail
// @desc     Get all matchDetail
// @access   Public
router.get("/", async (req, res) => {
  try {
    // Ensure the database connection is established
    await connectDB();

    const result = await sql.query("SELECT * FROM Match_Details");
    return res.json(result.recordset);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  } finally {
    // Close the database connection
    sql.close();
  }
});

// @route    POST api/matchDetail
// @desc     Create a matchDetail
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
      // Ensure the database connection is established
      await connectDB();

      const result = await sql.query(`
        INSERT INTO Match_Details (match, player, score, description) 
        OUTPUT INSERTED.id
        VALUES ('${req.body.match}', '${req.body.player}', '${req.body.score}', '${req.body.description}')
      `);

      // Check if recordset is undefined or empty
      if (!result.recordset || result.recordset.length === 0) {
        return res.status(500).send("Failed to retrieve the inserted record");
      }

      const insertedId = result.recordset[0].id;

      return res.json({
        id: insertedId,
        match: req.body.match,
        player: req.body.player,
        score: req.body.score,
        description: req.body.description,
      });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    } finally {
      // Close the database connection
      sql.close();
    }
  }
);

// @route    GET api/matchDetail/:id
// @desc     Get matchDetail by ID
// @access   Public
router.get("/:id/:player_id", async (req, res) => {
  try {
    // Ensure the database connection is established
    await connectDB();

    // Ensure the database connection is established
    const result = await sql.query(
      `SELECT * FROM Match_Details WHERE match = '${req.params.id}' AND player = '${req.params.player_id}'`
    );

    console.log(req.params);

    const matchDetail = result.recordset[0];

    if (!matchDetail)
      return res.status(404).json({ msg: "MatchDetail not found" });

    return res.json(matchDetail);
  } catch (err) {
    console.error(err.message);

    return res.status(500).send("Server Error");
  } finally {
    // Close the database connection
    sql.close();
  }
});

// @route    DELETE api/matchDetail/:id
// @desc     Delete matchDetail
// @access   Private
router.delete("/:id", async (req, res) => {
  try {
    // Ensure the database connection is established
    await connectDB();

    const result = await sql.query(
      `DELETE FROM Match_Details WHERE id = ${req.params.id}`
    );

    if (result.rowsAffected[0] === 0)
      return res.status(404).json({ msg: "MatchDetail not found" });

    return res.json({ msg: "MatchDetail removed" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  } finally {
    // Close the database connection
    sql.close();
  }
});

// @route    PUT api/matchDetail/:id
// @desc     Update a matchDetail
// @access   Private
router.put("/:id/:player_id", async (req, res) => {
  try {
    // Ensure the database connection is established
    await connectDB();

    const result = await sql.query(
      `UPDATE Match_Details SET 
        match = '${req.body.match}',
        player = '${req.body.player}',
        score = '${req.body.score}',
        description = '${req.body.description}'
       WHERE match = ${req.params.id} AND player = ${req.params.player_id}`
    );

    if (result.rowsAffected[0] === 0)
      return res.status(404).json({ msg: "MatchDetail not found" });

    const updatedMatchDetail = {
      id: req.params.id,
      match: req.body.match,
      player: req.body.player,
      score: req.body.score,
      description: req.body.description,
    };

    return res.json(updatedMatchDetail);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  } finally {
    // Close the database connection
    sql.close();
  }
});

module.exports = router;
