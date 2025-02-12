const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");

router.get("/details", contactController.getAllContacts);
router.get("/data/:id", contactController.getContactById);
router.post("/add", contactController.createContact);
router.put("/edit/:id", contactController.updateContact);
router.delete("/delete/:id", contactController.deleteContact);

module.exports = router;
