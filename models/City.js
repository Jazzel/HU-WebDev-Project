const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  country: {
    type: Schema.Types.ObjectId,
    ref: "Country",
  },
});

module.exports = mongoose.model("City", citySchema);
