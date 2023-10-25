const mongoose = require("mongoose");

const match_detailsSchema = new mongoose.Schema({
    match: {
        type: Number,
        required: true,
    },
    player: {
        type: Number,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Match_Details", match_detailsSchema);