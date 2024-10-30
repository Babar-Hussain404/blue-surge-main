const express = require("express");
const {
  authenticateToken,
  authorizeAdmin,
  checkBlockedStatus,
} = require("../middleware/authMiddleware");
const router = express.Router();
const controller = require("../controller/addressController");
router.route("/").post(controller.store).get(controller.index);
router
  .route("/:id")
  .put(controller.update)
  .get(controller.single)
  .delete(controller.destroy);

module.exports = router;
