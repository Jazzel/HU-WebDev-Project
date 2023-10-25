const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    team:{
        type: Number,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Player", playerSchema);