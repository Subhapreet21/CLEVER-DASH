const Bar = require("../models/barModel");

exports.getAllBars = async (req, res) => {
  try {
    const bars = await Bar.find();
    res.json(bars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createBar = async (req, res) => {
  const bar = new Bar(req.body);
  try {
    const newBar = await bar.save();
    res.status(201).json(newBar);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteBar = async (req, res) => {
  try {
    const bar = await Bar.findById(req.params.id);
    if (!bar) {
      return res.status(404).json({ message: "Bar not found" });
    }
    await bar.remove();
    res.json({ message: "Bar deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
