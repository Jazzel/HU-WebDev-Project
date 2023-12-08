const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const connectDB = require("./../config/db");
const sql = require("mssql");

// @route    GET api/team
// @desc     Get all team
// @access   Public
router.get("/", async (req, res) => {
  try {
    // Ensure the database connection is established
    await connectDB();

    const result = await sql.query(
      "SELECT T.id, T.name, T.coach, T.state, C.name as country FROM Teams AS T INNER JOIN Countries AS C ON T.country = C.id  ORDER BY T.id DESC"
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

// @route    POST api/team
// @desc     Create a team
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
      // Ensure the database connection is established
      await connectDB();

      const result = await sql.query(`
        INSERT INTO Teams (name, coach, country, state, description) 
        OUTPUT INSERTED.id
        VALUES ('${req.body.name}', '${req.body.coach}', '${req.body.country}', '${req.body.state}', '${req.body.description}')
      `);

      // Check if recordset is undefined or empty
      if (!result.recordset || result.recordset.length === 0) {
        return res.status(500).send("Failed to retrieve the inserted record");
      }

      const insertedId = result.recordset[0].id;

      return res.json({
        id: insertedId,
        name: req.body.name,
        coach: req.body.coach,
        country: req.body.country,
        state: req.body.state,
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

// @route    GET api/team/:id
// @desc     Get team by ID
// @access   Public
router.get("/:id", async (req, res) => {
  try {
    // Ensure the database connection is established
    await connectDB();

    // Ensure the database connection is established
    const result = await sql.query(
      `SELECT T.id as id, T.name, T.coach, T.state, C.id as country, T.description FROM Teams AS T INNER JOIN Countries AS C ON T.country = C.id WHERE T.id = ${req.params.id}`
    );

    const team = result.recordset[0];

    if (!team) return res.status(404).json({ msg: "Team not found" });

    return res.json(team);
  } catch (err) {
    console.error(err.message);

    return res.status(500).send("Server Error");
  } finally {
    // Close the database connection
    sql.close();
  }
});

// @route    DELETE api/team/:id
// @desc     Delete team
// @access   Private
router.delete("/:id", async (req, res) => {
  try {
    // Ensure the database connection is established
    await connectDB();

    const result = await sql.query(
      `DELETE FROM Teams WHERE id = ${req.params.id}`
    );

    if (result.rowsAffected[0] === 0)
      return res.status(404).json({ msg: "Team not found" });

    return res.json({ msg: "Team removed" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  } finally {
    // Close the database connection
    sql.close();
  }
});

// @route    PUT api/team/:id
// @desc     Update a team
// @access   Private
router.put("/:id", async (req, res) => {
  try {
    // Ensure the database connection is established
    await connectDB();

    console.log("dsad", req.params.id);

    const result = await sql.query(
      `UPDATE Teams SET name = '${req.body.name}', coach = '${req.body.coach}', country = '${req.body.country}', state = '${req.body.state}', description = '${req.body.description}' WHERE id = ${req.params.id}`
    );

    if (result.rowsAffected[0] === 0)
      return res.status(404).json({ msg: "Team not found" });

    const updatedteam = {
      id: req.params.id,
      name: req.body.name,
      coach: req.body.coach,
      country: req.body.country,
      state: req.body.state,
      description: req.body.description,
    };

    return res.json(updatedteam);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  } finally {
    // Close the database connection
    sql.close();
  }
});

// @route    GET api/team/:id/players
// @desc     Get all team players
// @access   Public
router.get("/:id/players", async (req, res) => {
  try {
    // Ensure the database connection is established
    await connectDB();

    const result = await sql.query(
      `SELECT P.id, P.first_name, P.last_name, T.name as team_name, T.id as team_id FROM Players AS P INNER JOIN Teams AS T ON P.team = T.id WHERE T.id = ${req.params.id}`
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

module.exports = router;
