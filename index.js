const express = require("express");
const connectDB = require("./config/db");
var cors = require("cors");
const nodemailer = require("nodemailer");
const { validationResult, check } = require("express-validator");
const User = require("./models/User");
const config = require("config");
const bcrypt = require("bcryptjs");

const app = express();
const PORT = 5000;
app.use(cors({ origin: "http://localhost:3000" }));

connectDB();
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const URL = "http://localhost:3000";

app.use("/api/sports", require("./routes/sports"));
app.use("/api/cities", require("./routes/city"));
app.use("/api/countries", require("./routes/country"));
app.use("/api/tournaments", require("./routes/tournament"));
app.use("/api/teams", require("./routes/team"));
app.use("/api/players", require("./routes/player"));
app.use("/api/matches", require("./routes/match"));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/user"));

app.post(
  "/api/reset-password",
  [check("email", "Email is required").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { email } = req.body;
    try {
      const user = await User.findOne({
        email: email,
      });

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      let transport = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: true,
        secureConnection: false,
        auth: {
          user: config.get("user"),
          pass: config.get("pass"),
        },
        tls: {
          rejectUnAuthorized: true,
        },
      });

      console.log(user);

      const mailOptions = {
        from: `${config.get("user")}`,
        to: email,
        subject: "Password Reset Request",
        html: `<h1>Password Reset Request</h1>
            <h2>Welcome ${user.name} to SportsPulse</h2>
            <p>We heard you forgot your account. Here's the link to reset your  account password:</p>
            <a href=${URL}/reset/${email}/${user.code}}>${URL}/reset/${email}/${user.code}</a>
            <br/>
            <smaill>If the above link is not clickable, try copying and pasting it into the address bar of your web browser.</smaill>
            </div>`,
      };

      let info = await transport.sendMail(mailOptions);
      console.log(`Message Sent: ${info.messageId}`);
      return res.status(200).send({ message: "Email sent." });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server error");
    }
  }
);

app.post(
  "/api/verify-code",
  [
    check("code", "Code is required").not().isEmpty(),
    check("email", "Email is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { email, code } = req.body;

    try {
      const user = await User.findOne({
        email: email,
      });

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      if (user.code !== code.trim()) {
        return res.status(404).send({ message: "Wrong Code." });
      }
      return res.status(200).send({ user: user._id });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server error");
    }
  }
);

app.post(
  "/api/change-password",
  [
    check("id", "Id is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { id, password } = req.body;

    try {
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      user.password = password;
      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      return res.status(200).send({ user: user._id });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server error");
    }
  }
);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
