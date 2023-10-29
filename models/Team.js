const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  coach: {
    type: String,
    required: true,
  },
  country: {
    type: mongoose.Schema.ObjectId,
    ref: "Country",
  },
  state: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Team", teamSchema);
