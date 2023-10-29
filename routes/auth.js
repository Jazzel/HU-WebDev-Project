const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const router = express.Router();
const secretToken = config.get("JWTsecretToken");

const auth = require("../middlewares/auth");
const User = require("../models/User");

// @route    GET api/auth
// @desc     Test Route
// @access   Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    return res.json(user);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server error");
  }
});

// @route    POST api/auth
// @desc     Authenticate User & Get Token
// @access   Public
router.post(
  "/",
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
      // See if user exists
      let user = await User.findOne({ email });

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
        },
      };

      jwt.sign(payload, secretToken, { expiresIn: 360000 }, (err, token) => {
        if (err) throw err;
        return res.json({
          name: user.name,
          email: user.email,
          role: user.role,
          token,
        });
      });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server error");
    }
  }
);

module.exports = router;
