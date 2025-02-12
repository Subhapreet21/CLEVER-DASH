const express = require("express");
const router = express.Router();
const barController = require("../controllers/barController");

router.get("/", barController.getAllBars);
router.post("/", barController.createBar);
router.delete("/:id", barController.deleteBar);

module.exports = router;
