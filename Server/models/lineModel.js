// const mongoose = require("mongoose");

// const lineSchema = new mongoose.Schema({
//   id: { type: Number, required: true },
//   month: { type: String, required: true },
//   revenue: { type: Number, required: true },
// });

// const Line = mongoose.model("Line", lineSchema);

// module.exports = Line;

const mongoose = require("mongoose");

const lineDataSchema = new mongoose.Schema({
  x: { type: String, required: true }, // Change field name to 'x' to match data
  y: { type: Number, required: true },
});

const lineSchema = new mongoose.Schema({
  id: { type: String, required: true }, // Change type to String
  color: { type: String, required: true },
  data: [lineDataSchema], // Nest lineDataSchema for 'data' field
});

const Line = mongoose.model("Line", lineSchema);

module.exports = Line;
