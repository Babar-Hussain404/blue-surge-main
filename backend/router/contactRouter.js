const express = require("express");
const {
  authenticateToken,
  authorizeAdmin,
  checkBlockedStatus,
} = require("../middleware/authMiddleware");
const router = express.Router();
const controller = require("../controller/contactController");

router
  .route("/")
  .post(controller.store)
  .get(authenticateToken, controller.index);
router
  .route("/:id")
  .get(authenticateToken, controller.view)
  .delete(authenticateToken, controller.delete);

module.exports = router;
