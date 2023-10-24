const express = require("express");
const connectDB = require("./config/db");
const app = express();

const PORT = 5000;

connectDB();
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/sports", require("./routes/sports"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
