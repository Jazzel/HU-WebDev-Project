const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: Date,
        required: true,
    },
    venue: {
        type: String,
        required: true,
    },
    tournament: {
        type: Number,
        required: true,
    },
    team_A: {
        type: Number,
        required: true,
    },
    team_B: {
        type: Number,
        required: true,
    },
    team_A_score: {
        type: Number,
        required: true,
    },
    team_B_score: {
        type: Number,
        required: true,
    },
    winner: {
        type: Number,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Match", matchSchema);