const express = require("express");
const {
  authenticateToken,
  authorizeAdmin,
  checkBlockedStatus,
} = require("../middleware/authMiddleware");
const router = express.Router();
const controller = require("../controller/headerController");

router.post("/", controller.store);
router.get("/", controller.index);

module.exports = router;
