const express = require("express");
const {
  authenticateToken,
  authorizeAdmin,
  checkBlockedStatus,
} = require("../middleware/authMiddleware");
const router = express.Router();
const controller = require("../controller/industryController");
router.route("/").post(controller.store).get(controller.index);
router.route("/options").get(controller.indexOptions);
router.route("/list").get(controller.indexAll);
router.route("/home").get(controller.getTopIndustriesWithServices);
router
  .route("/:id")
  .put(controller.update)
  .get(controller.single)
  .delete(controller.destroy);

module.exports = router;
