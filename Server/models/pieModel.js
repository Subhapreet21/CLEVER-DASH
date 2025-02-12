const mongoose = require("mongoose");

const pieSchema = new mongoose.Schema({
  id: { type: String, required: true },
  label: { type: String, required: true },
  value: { type: Number, required: true },
  color: { type: String, required: true },
});

const Pie = mongoose.model("Pie", pieSchema);

module.exports = Pie;
