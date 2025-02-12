const express = require("express");
const router = express.Router();
const lineController = require("../controllers/lineController");

router.get("/", lineController.getAllLines);
router.post("/", lineController.createLine);
router.delete("/:id", lineController.deleteLine);

module.exports = router;
