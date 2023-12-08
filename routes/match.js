const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const sql = require("mssql");
const connectDB = require("./../config/db");

// @route    GET api/match
// @desc     Get all match
// @access   Public
router.get("/", async (req, res) => {
  try {
    // Ensure the database connection is established
    await connectDB();

    const result = await sql.query(
      "SELECT M.id as id, M.name, M.date, M.venue, T.name as tournament, Te.name as winner FROM Matches AS M INNER JOIN Tournaments AS T ON M.tournament = T.id LEFT JOIN Teams AS Te ON M.winner = Te.id ORDER BY M.id DESC"
    );
    return res.json(result.recordset);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  } finally {
    // Close the database connection
    sql.close();
  }
});

// @route    POST api/match
// @desc     Create a match
// @access   Private
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("date", "Date is required").not().isEmpty(),
    check("venue", "Venue is required").not().isEmpty(),
    check("tournament", "Tournament is required").not().isEmpty(),
    check("team_A", "Team_A is required").not().isEmpty(),
    check("team_B", "Team_B is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      // Ensure the database connection is established
      await connectDB();

      const jsDateString = new Date(req.body.date).toISOString().split("T")[0];
      console.log(jsDateString);
      const result = await sql.query(`
        INSERT INTO Matches (name, date, venue, tournament, team_A, team_B, team_A_score, team_B_score, ${
          req.body.winner && "winner,"
        } summary) 
        OUTPUT INSERTED.id
        VALUES ('${req.body.name}', '${jsDateString}', '${req.body.venue}', '${
        req.body.tournament
      }', '${req.body.team_A}', '${req.body.team_B}', '${
        req.body.team_A_score || 0
      }', '${req.body.team_B_score || 0}', ${
        req.body.winner && `${req.body.winner},`
      } '${req.body.summary}')
      `);

      // Check if recordset is undefined or empty
      if (!result.recordset || result.recordset.length === 0) {
        return res.status(500).send("Failed to retrieve the inserted record");
      }

      const insertedId = result.recordset[0].id;

      return res.json({
        id: insertedId,
        name: req.body.name,
        date: req.body.date,
        venue: req.body.venue,
        tournament: req.body.tournament,
        team_A: req.body.team_A,
        team_B: req.body.team_B,
        team_A_score: req.body.team_A_score,
        team_B_score: req.body.team_B_score,
        winner: req.body.winner,
        summary: req.body.summary,
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

// @route    GET api/match/:id
// @desc     Get match by ID
// @access   Public
router.get("/:id", async (req, res) => {
  try {
    // Ensure the database connection is established
    await connectDB();

    // Ensure the database connection is established
    const result = await sql.query(
      `SELECT M.id as id, M.name, M.date, M.venue, T.id as tournament, M.team_A, M.team_B, M.team_A_score, M.team_B_score, M.summary, Te.id as winner FROM Matches AS M INNER JOIN Tournaments AS T ON M.tournament = T.id LEFT JOIN Teams AS Te ON M.winner = Te.id WHERE M.id = ${req.params.id}`
    );

    const match = result.recordset[0];

    if (!match) return res.status(404).json({ msg: "Match not found" });

    return res.json(match);
  } catch (err) {
    console.error(err.message);

    return res.status(500).send("Server Error");
  } finally {
    // Close the database connection
    sql.close();
  }
});

// @route    GET api/match/:id
// @desc     Get match by ID
// @access   Public
router.get("/:id/special", async (req, res) => {
  try {
    // Ensure the database connection is established
    await connectDB();

    // Ensure the database connection is established
    const result = await sql.query(
      `SELECT M.id as id, M.name, M.date, M.venue, T.name as tournament, M.team_A as team_A_id, M.team_B as team_B_id, T1.name as team_A, T2.name as team_B, M.team_A_score, M.team_B_score, M.summary, Te.name as winner FROM Matches AS M INNER JOIN Tournaments AS T ON M.tournament = T.id INNER JOIN Teams AS T1 ON M.team_A = T1.id INNER JOIN Teams AS T2 ON M.team_B = T2.id LEFT JOIN Teams AS Te ON M.winner = Te.id WHERE M.id = ${req.params.id}`
    );

    const match = result.recordset[0];

    if (!match) return res.status(404).json({ msg: "Match not found" });

    return res.json(match);
  } catch (err) {
    console.error(err.message);

    return res.status(500).send("Server Error");
  } finally {
    // Close the database connection
    sql.close();
  }
});

// @route    DELETE api/match/:id
// @desc     Delete match
// @access   Private
router.delete("/:id", async (req, res) => {
  try {
    // Ensure the database connection is established
    await connectDB();

    const result = await sql.query(
      `DELETE FROM Matches WHERE id = ${req.params.id}`
    );

    if (result.rowsAffected[0] === 0)
      return res.status(404).json({ msg: "Match not found" });

    return res.json({ msg: "Match removed" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  } finally {
    // Close the database connection
    sql.close();
  }
});

// @route    PUT api/match/:id
// @desc     Update a match
// @access   Private
router.put("/:id", async (req, res) => {
  try {
    // Ensure the database connection is established
    await connectDB();

    const result = await sql.query(
      `UPDATE Matches SET 
        name = '${req.body.name}',
        date = '${req.body.date}',
        venue = '${req.body.venue}',
        tournament = '${req.body.tournament}',
        team_A = '${req.body.team_A}',
        team_B = '${req.body.team_B}',
        team_A_score = '${req.body.team_A_score}',
        team_B_score = '${req.body.team_B_score}',
        winner = '${req.body.winner}',
        summary = '${req.body.summary}'
       WHERE id = ${req.params.id}`
    );

    if (result.rowsAffected[0] === 0)
      return res.status(404).json({ msg: "Match not found" });

    const updatedmatch = {
      id: req.params.id,
      name: req.body.name,
      date: req.body.date,
      venue: req.body.venue,
      tournament: req.body.tournament,
      team_A: req.body.team_A,
      team_B: req.body.team_B,
      team_A_score: req.body.team_A_score,
      team_B_score: req.body.team_B_score,
      winner: req.body.winner,
      summary: req.body.summary,
    };

    return res.json(updatedmatch);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  } finally {
    // Close the database connection
    sql.close();
  }
});

module.exports = router;
