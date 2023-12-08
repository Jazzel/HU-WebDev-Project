const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const sql = require("mssql");
const connectDB = require("./../config/db");

// @route    GET api/sports
// @desc     Get all sports
// @access   Public
router.get("/", async (req, res) => {
  try {
    // Ensure the database connection is established
    await connectDB();

    const result = await sql.query("SELECT * FROM Sports  ORDER BY id DESC");
    return res.json(result.recordset);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  } finally {
    // Close the database connection
    sql.close();
  }
});

// @route    POST api/sports
// @desc     Create a sport
// @access   Private
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
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
        INSERT INTO sports (name, description) 
        OUTPUT INSERTED.id
        VALUES ('${req.body.name}', '${req.body.description}')
      `);

      // Check if recordset is undefined or empty
      if (!result.recordset || result.recordset.length === 0) {
        return res.status(500).send("Failed to retrieve the inserted record");
      }

      const insertedId = result.recordset[0].id;

      return res.json({
        id: insertedId,
        name: req.body.name,
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

// @route    GET api/sports/:id
// @desc     Get sport by ID
// @access   Public
router.get("/:id", async (req, res) => {
  try {
    // Ensure the database connection is established
    await connectDB();

    // Ensure the database connection is established
    const result = await sql.query(
      `SELECT * FROM sports WHERE id = ${req.params.id}`
    );

    const sport = result.recordset[0];

    if (!sport) return res.status(404).json({ msg: "Sport not found" });

    return res.json(sport);
  } catch (err) {
    console.error(err.message);

    return res.status(500).send("Server Error");
  } finally {
    // Close the database connection
    sql.close();
  }
});

// @route    DELETE api/sports/:id
// @desc     Delete sport
// @access   Private
router.delete("/:id", async (req, res) => {
  try {
    // Ensure the database connection is established
    await connectDB();

    const result = await sql.query(
      `DELETE FROM sports WHERE id = ${req.params.id}`
    );

    if (result.rowsAffected[0] === 0)
      return res.status(404).json({ msg: "Sport not found" });

    return res.json({ msg: "Sport removed" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: err.message });
  } finally {
    // Close the database connection
    sql.close();
  }
});

// @route    PUT api/sports/:id
// @desc     Update a sport
// @access   Private
router.put("/:id", async (req, res) => {
  try {
    // Ensure the database connection is established
    await connectDB();

    const result = await sql.query(
      `UPDATE sports SET name = '${req.body.name}', description = '${req.body.description}' WHERE id = ${req.params.id}`
    );

    if (result.rowsAffected[0] === 0)
      return res.status(404).json({ msg: "Sport not found" });

    const updatedSport = {
      id: req.params.id,
      name: req.body.name,
      description: req.body.description,
    };

    return res.json(updatedSport);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  } finally {
    // Close the database connection
    sql.close();
  }
});

module.exports = router;
