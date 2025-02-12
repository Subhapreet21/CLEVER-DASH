// const mongoose = require("mongoose");
// const { type } = require("os");

// const eventSchema = new mongoose.Schema({
//   id: { type: Number },
//   title: { type: String, required: true },
//   date: { type: Date },
// });

// const Event = mongoose.model("Event", eventSchema);

// module.exports = Event;

const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  id: { type: String, required: true }, // Change type to String to match mock data
  title: { type: String, required: true },
  date: { type: Date, required: true }, // Change type to Date to match mock data
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
