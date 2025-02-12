const express = require("express");
const router = express.Router();
const calendarController = require("../controllers/calendarController");

router.get("/details", calendarController.getAllEvents);
router.post("/add", calendarController.createEvent);
router.delete("/delete/:id", calendarController.deleteEvent);

module.exports = router;
