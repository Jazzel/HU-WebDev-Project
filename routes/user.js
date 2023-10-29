const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../models/User");
const secretToken = config.get("JWTsecretToken");

// generate random code
function generateCode() {
  var code = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 7; i++)
    code += possible.charAt(Math.floor(Math.random() * possible.length));

  return code;
}

// @route    POST api/users
// @desc     Register User
// @access   Public
router.post(
  "/",
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
      // See if user exists
      let user = await User.findOne({ email });

      if (user)
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });

      user = new User({
        name,
        email,
        password,
        role,
        code: generateCode(),
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Return JWT
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, secretToken, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        return res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server error");
    }
  }
);

module.exports = router;
