const express = require("express"); 
const router = express.Router();
const controller = require("../controller/iconsController");

router.post("/", controller.store);
router.get("/", controller.index);

module.exports = router;
