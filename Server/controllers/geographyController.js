const Geography = require("../models/geographyModel");

exports.getAllGeographies = async (req, res) => {
  try {
    const geographies = await Geography.find();
    res.json(geographies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createGeography = async (req, res) => {
  const geography = new Geography(req.body);
  try {
    const newGeography = await geography.save();
    res.status(201).json(newGeography);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteGeography = async (req, res) => {
  try {
    const geography = await Geography.findById(req.params.id);
    if (!geography) {
      return res.status(404).json({ message: "Geography not found" });
    }
    await geography.remove();
    res.json({ message: "Geography deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
