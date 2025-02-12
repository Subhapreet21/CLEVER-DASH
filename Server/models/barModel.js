const mongoose = require("mongoose");

const barSchema = new mongoose.Schema({
  country: { type: String, required: true },
  Category_A: { type: Number, required: true },
  Category_B: { type: Number, required: true },
  Category_C: { type: Number, required: true },
  Category_D: { type: Number, required: true },
  Category_E: { type: Number, required: true },
  Category_F: { type: Number, required: true },
});

const Bar = mongoose.model("Bar", barSchema);

module.exports = Bar;
