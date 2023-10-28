const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../models/User");

// @route    GET api/users
// @desc     Get all users
// @access   Public

router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort({ date: -1 });
    return res.json(users);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});


// @route    POST api/users
// @desc     Create an users
// @access   Private

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
    check("role", "Role is required").not().isEmpty(),
    check("phone", "Phone is required").not().isEmpty(),
    check("code", "Code is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
    
        if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    
        try {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
            phone: req.body.phone,
            code: req.body.code,
            description: req.body.description,
        });
    
        const user = await newUser.save();
    
        return res.json(user);
        } catch (err) {
        console.error(err.message);
        return res.status(500).send("Server Error");
        }
    }
);

// @route    GET api/users/:id
// @desc     Get user by ID
// @access   Public

router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
    
        if (!user) return res.status(404).json({ msg: "User not found" });
    
        return res.json(user);
    } catch (err) {
     console.error(err.message);
    
     if (err.kind === "ObjectId")
        return res.status(404).json({ msg: "User not found" });
    
     return res.status(500).send("Server Error");
    }
    });

// @route    DELETE api/users/:id
// @desc     Delete user
// @access   Private

router.delete("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
    
        if (!user) return res.status(404).json({ msg: "User not found" });
    
        await user.deleteOne();
        return res.json({ msg: "User removed" });
    } catch (err) {
      console.error(err.message);
      if (err.kind === "ObjectId")
        return res.status(404).json({ msg: "User not found" });
    
       return res.status(500).send("Server Error");
    }
    });

// @route    PUT api/users
// @desc     Create an users
// @access   Private


router.put("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
    
        if (!user) return res.status(404).json({ msg: "User not found" });
    
        user.name = req.body.name ?? user.name;
        user.email = req.body.email ?? user.email;
        user.password = req.body.password ?? user.password;
        user.role = req.body.role ?? user.role;
        user.phone = req.body.phone ?? user.phone;
        user.code = req.body.code ?? user.code;
        user.description = req.body.description ?? user.description;
    
        await user.save();
    
        return res.json(user);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  });

module.exports = router;    


