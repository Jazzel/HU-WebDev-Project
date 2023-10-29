const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  tournament: {
    type: mongoose.Schema.ObjectId,
    ref: "Tournament",
  },
  team_A: {
    type: mongoose.Schema.ObjectId,
    ref: "Team",
  },
  team_B: {
    type: mongoose.Schema.ObjectId,
    ref: "Team",
  },
  team_A_score: {
    type: Number,
  },
  team_B_score: {
    type: Number,
  },
  winner: {
    type: mongoose.Schema.ObjectId,
    ref: "Team",
  },
  summary: {
    type: String,
  },
});

module.exports = mongoose.model("Match", matchSchema);
