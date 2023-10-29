const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  team: {
    type: mongoose.Schema.ObjectId,
    ref: "Team",
  },
  age: {
    type: Number,
    required: true,
  },
  city: {
    type: mongoose.Schema.ObjectId,
    ref: "City",
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Player", playerSchema);
