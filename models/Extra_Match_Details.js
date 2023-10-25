const mongoose = require("mongoose");

const match_detailsSchema = new mongoose.Schema({
    field: {
        type: Number,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    match_details: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("Extra_Match_Details", match_detailsSchema);