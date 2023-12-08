const express = require("express");
var cors = require("cors");
const connectDB = require("./config/db");
const sql = require("mssql");

const app = express();
const PORT = 5000;
app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const URL = "http://localhost:3000";

app.use("/api/sports", require("./routes/sports"));
app.use("/api/countries", require("./routes/country"));
app.use("/api/cities", require("./routes/city"));
app.use("/api/tournaments", require("./routes/tournament"));
app.use("/api/teams", require("./routes/team"));
app.use("/api/players", require("./routes/player"));
app.use("/api/matches", require("./routes/match"));
app.use("/api/match-details", require("./routes/matchDetails"));
app.use("/api/users", require("./routes/user"));

app.get("/api/fetch-special", async (req, res) => {
  try {
    // Ensure the database connection is established
    await connectDB();

    const result =
      await sql.query(`SELECT MD.id, P.first_name, MD.score, MD.description, 
    M.name AS Match, M.date, M.venue, 
    T1.name AS Team_A_name, T1.coach AS Team_A_coach, M.team_A_score,
    T2.name AS Team_B_name, T2.coach AS Team_B_coach, M.team_B_score,
    T.name AS Tournament, S.name as Sport
    FROM Match_Details AS MD 
    LEFT JOIN Players AS P ON MD.player = P.id 
    LEFT JOIN Matches AS M ON MD.match = M.id 
    LEFT JOIN Tournaments AS T ON M.tournament = T.id 
    LEFT JOIN Sports AS S ON T.sport = S.id
    LEFT JOIN Teams AS T1 ON M.team_A = T1.id
    LEFT JOIN Teams AS T2 ON M.team_B = T2.id
    `);
    return res.json(result.recordset);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  } finally {
    // Close the database connection
    sql.close();
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
