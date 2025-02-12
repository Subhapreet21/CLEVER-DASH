const express = require("express");
const router = express.Router();
const geographyController = require("../controllers/geographyController");

router.get("/", geographyController.getAllGeographies);
router.post("/", geographyController.createGeography);
router.delete("/:id", geographyController.deleteGeography);

module.exports = router;
