const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const sql = require("mssql");
const connectDB = require("./../config/db");

// @route    GET api/extraMatchDetail
// @desc     Get all extraMatchDetail
// @access   Public
router.get("/", async (req, res) => {
  try {
    // Ensure the database connection is established
    await connectDB();

    const result = await sql.query("SELECT * FROM ExtraMatchDetails");
    return res.json(result.recordset);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  } finally {
    // Close the database connection
    sql.close();
  }
});

// @route    POST api/extraMatchDetail
// @desc     Create a extraMatchDetail
// @access   Private
router.post(
  "/",
  [
    check("match_details", "Match details is required").not().isEmpty(),
    check("field", "Field is required").not().isEmpty(),
    check("value", "Value is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      // Ensure the database connection is established
      await connectDB();

      const result = await sql.query(`
        INSERT INTO extraMatchDetails (match_details, field, value) 
        OUTPUT INSERTED.id
        VALUES ('${req.body.match_details}', '${req.field}', '${req.value}', '${req.description}')
      `);

      // Check if recordset is undefined or empty
      if (!result.recordset || result.recordset.length === 0) {
        return res.status(500).send("Failed to retrieve the inserted record");
      }

      const insertedId = result.recordset[0].id;

      return res.json({
        id: insertedId,
        match_details: req.body.match_details,
        field: req.body.field,
        value: req.body.value,
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

// @route    GET api/extraMatchDetail/:id
// @desc     Get extraMatchDetail by ID
// @access   Public
router.get("/:id", async (req, res) => {
  try {
    // Ensure the database connection is established
    await connectDB();

    // Ensure the database connection is established
    const result = await sql.query(
      `SELECT * FROM ExtraMatchDetails WHERE id = ${req.params.id}`
    );

    const extraMatchDetail = result.recordset[0];

    if (!extraMatchDetail)
      return res.status(404).json({ msg: "ExtraMatchDetail not found" });

    return res.json(extraMatchDetail);
  } catch (err) {
    console.error(err.message);

    return res.status(500).send("Server Error");
  } finally {
    // Close the database connection
    sql.close();
  }
});

// @route    DELETE api/extraMatchDetail/:id
// @desc     Delete extraMatchDetail
// @access   Private
router.delete("/:id", async (req, res) => {
  try {
    // Ensure the database connection is established
    await connectDB();

    const result = await sql.query(
      `DELETE FROM ExtraMatchDetails WHERE id = ${req.params.id}`
    );

    if (result.rowsAffected[0] === 0)
      return res.status(404).json({ msg: "ExtraMatchDetail not found" });

    return res.json({ msg: "ExtraMatchDetail removed" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  } finally {
    // Close the database connection
    sql.close();
  }
});

// @route    PUT api/extraMatchDetail/:id
// @desc     Update a extraMatchDetail
// @access   Private
router.put("/:id", async (req, res) => {
  try {
    // Ensure the database connection is established
    await connectDB();

    const result = await sql.query(
      `UPDATE extraMatchDetails SET 
        match_details = '${req.body.match_details}',
        field = '${req.body.field}',
        value = '${req.body.value}'
       WHERE id = ${req.params.id}`
    );

    if (result.rowsAffected[0] === 0)
      return res.status(404).json({ msg: "ExtraMatchDetail not found" });

    const updatedExtraMatchDetail = {
      id: req.params.id,
      match_details: req.body.match_details,
      field: req.body.field,
      value: req.body.value,
    };

    return res.json(updatedExtraMatchDetail);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  } finally {
    // Close the database connection
    sql.close();
  }
});

module.exports = router;
