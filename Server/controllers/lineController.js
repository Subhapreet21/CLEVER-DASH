const Line = require("../models/lineModel");

exports.getAllLines = async (req, res) => {
  try {
    const lines = await Line.find();
    res.json(lines);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createLine = async (req, res) => {
  const line = new Line(req.body);
  try {
    const newLine = await line.save();
    res.status(201).json(newLine);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteLine = async (req, res) => {
  try {
    const line = await Line.findById(req.params.id);
    if (!line) {
      return res.status(404).json({ message: "Line not found" });
    }
    await line.remove();
    res.json({ message: "Line deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
