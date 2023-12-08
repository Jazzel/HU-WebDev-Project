const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const connectDB = require("./../config/db");
const sql = require("mssql");
const secretToken = config.get("JWTsecretToken");

const auth = require("../middlewares/auth");

// generate random code
function generateCode() {
  var code = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 7; i++)
    code += possible.charAt(Math.floor(Math.random() * possible.length));

  return code;
}

// @route    GET api/auth
// @desc     Test Route
// @access   Public
router.get("/load", auth, async (req, res) => {
  try {
    // Ensure the database connection is established
    await connectDB();

    console.log(req.user);
    // See if user exists
    const result = await sql.query(
      `SELECT * FROM Users WHERE email = '${req.user.email}'`
    );

    let user = result.recordset[0];

    return res.json(user);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server error");
  } finally {
    // Close the database connection
    sql.close();
  }
});

// @route    POST api/users
// @desc     Register User
// @access   Public
router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("role", "Please include a valid role").not().isEmpty(),
    check(
      "password",
      "Please enter a password with alteast 6 characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    // Check validations
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { name, email, password, role } = req.body;

    try {
      // Ensure the database connection is established
      await connectDB();

      // See if user exists
      const result = await sql.query(
        `SELECT * FROM Users WHERE email = '${email}'`
      );

      console.log("dsad");

      let user = result.recordset[0];

      if (user)
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      let genPassword = await bcrypt.hash(password, salt);

      const code = generateCode();

      const result2 = await sql.query(`
      INSERT INTO Users (name, email, password, role, code) 
      OUTPUT INSERTED.id
      VALUES ('${req.body.name}', '${req.body.email}', '${genPassword}', '${req.body.role}', '${code}')
    `);

      // Check if recordset is undefined or empty
      if (!result2.recordset || result2.recordset.length === 0) {
        return res.status(500).send("Failed to retrieve the inserted record");
      }

      const insertedId = result2.recordset[0].id;

      // Return JWT
      const payload = {
        user: {
          id: insertedId,
          name,
          email,
          role,
        },
      };

      jwt.sign(payload, secretToken, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        return res.json({
          id: insertedId,
          user: payload.user,
          token,
        });
      });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server error");
    } finally {
      // Close the database connection
      sql.close();
    }
  }
);

// @route    POST api/auth
// @desc     Authenticate User & Get Token
// @access   Public
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    // Check validations
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
      // Ensure the database connection is established
      await connectDB();

      // See if user exists
      const result = await sql.query(
        `SELECT email, password FROM Users WHERE email = '${email}'`
      );

      let user = result.recordset[0];

      if (!user)
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch)
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });

      // Return JWT
      const payload = {
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      };

      jwt.sign(payload, secretToken, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        return res.json({
          user: payload.user,
          token,
        });
      });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server error");
    } finally {
      // Close the database connection
      sql.close();
    }
  }
);

module.exports = router;
