const mongoose = require("mongoose");

const tournamentSchema = new mongoose.Schema({ 
    name: {
        type: String,
        required: true,
    },
    sport: {
        type: Number,
        required: true,
    },
    start_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    managed_by:{
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model("Tournament", tournamentSchema);