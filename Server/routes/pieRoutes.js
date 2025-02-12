const express = require("express");
const router = express.Router();
const pieController = require("../controllers/pieController");

router.get("/", pieController.getAllPies);
router.post("/", pieController.createPie);
router.delete("/:id", pieController.deletePie);

module.exports = router;
