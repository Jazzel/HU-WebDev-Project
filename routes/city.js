const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const connectDB = require("./../config/db");
const sql = require("mssql");

// @route    GET api/city
// @desc     Get all city
// @access   Public
router.get("/", async (req, res) => {
  try {
    // Ensure the database connection is established
    await connectDB();

    const result = await sql.query(
      "SELECT Ci.id, Ci.name, Co.name as country FROM Cities AS Ci INNER JOIN Countries AS Co ON Ci.country = Co.id ORDER BY Ci.id DESC"
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

// @route    POST api/city
// @desc     Create a city
// @access   Private
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("country", "Country is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      // Ensure the database connection is established
      await connectDB();

      const result = await sql.query(`
        INSERT INTO Cities (name, country) 
        OUTPUT INSERTED.id
        VALUES ('${req.body.name}', '${req.body.country}')
      `);

      // Check if recordset is undefined or empty
      if (!result.recordset || result.recordset.length === 0) {
        return res.status(500).send("Failed to retrieve the inserted record");
      }

      const insertedId = result.recordset[0].id;

      return res.json({
        id: insertedId,
        name: req.body.name,
        country: req.body.country,
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

// @route    GET api/city/:id
// @desc     Get city by ID
// @access   Public
router.get("/:id", async (req, res) => {
  try {
    // Ensure the database connection is established
    await connectDB();

    // Ensure the database connection is established
    const result = await sql.query(
      `SELECT Ci.id, Ci.name, Co.id as country FROM Cities AS Ci INNER JOIN Countries AS Co ON Ci.country = Co.id WHERE Ci.id = ${req.params.id}`
    );

    const city = result.recordset[0];

    if (!city) return res.status(404).json({ msg: "City not found" });

    return res.json(city);
  } catch (err) {
    console.error(err.message);

    return res.status(500).send("Server Error");
  } finally {
    // Close the database connection
    sql.close();
  }
});

// @route    DELETE api/city/:id
// @desc     Delete city
// @access   Private
router.delete("/:id", async (req, res) => {
  try {
    // Ensure the database connection is established
    await connectDB();

    const result = await sql.query(
      `DELETE FROM Cities WHERE id = ${req.params.id}`
    );

    if (result.rowsAffected[0] === 0)
      return res.status(404).json({ msg: "City not found" });

    return res.json({ msg: "City removed" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  } finally {
    // Close the database connection
    sql.close();
  }
});

// @route    PUT api/city/:id
// @desc     Update a city
// @access   Private
router.put("/:id", async (req, res) => {
  try {
    // Ensure the database connection is established
    await connectDB();

    const result = await sql.query(
      `UPDATE Cities SET name = '${req.body.name}', country = '${req.body.country}' WHERE id = ${req.params.id}`
    );

    if (result.rowsAffected[0] === 0)
      return res.status(404).json({ msg: "City   not found" });

    const updatedcity = {
      id: req.params.id,
      name: req.body.name,
      country: req.body.country,
    };

    return res.json(updatedcity);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  } finally {
    // Close the database connection
    sql.close();
  }
});

module.exports = router;
