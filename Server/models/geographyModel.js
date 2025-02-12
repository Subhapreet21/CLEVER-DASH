// const mongoose = require("mongoose");

// const geographySchema = new mongoose.Schema({
//   id: { type: Number, required: true },
//   name: { type: String, required: true },
//   value: { type: Number, required: true },
// });

// const Geography = mongoose.model("Geography", geographySchema);

// module.exports = Geography;
const mongoose = require("mongoose");

const geographySchema = new mongoose.Schema({
  id: { type: String, required: true },
  value: { type: Number, required: true },
});

const Geography = mongoose.model("Geography", geographySchema);

module.exports = Geography;
