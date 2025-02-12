const Pie = require("../models/pieModel");

exports.getAllPies = async (req, res) => {
  try {
    const pies = await Pie.find();
    res.json(pies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createPie = async (req, res) => {
  const pie = new Pie(req.body);
  try {
    const newPie = await pie.save();
    res.status(201).json(newPie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deletePie = async (req, res) => {
  try {
    const pie = await Pie.findById(req.params.id);
    if (!pie) {
      return res.status(404).json({ message: "Pie not found" });
    }
    await pie.remove();
    res.json({ message: "Pie deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
