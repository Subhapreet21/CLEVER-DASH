const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  phone: { type: String },
  email: { type: String },
  accessLevel: {
    type: String,
    enum: ["Admin", "User", "Manager"],
    default: "User",
  },
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
