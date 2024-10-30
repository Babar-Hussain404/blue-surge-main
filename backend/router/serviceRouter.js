const express = require("express");
const {
  authenticateToken,
  authorizeAdmin,
  checkBlockedStatus,
} = require("../middleware/authMiddleware");
const router = express.Router();
const controller = require("../controller/serviceController");

router.route("/option/:industryId").get(controller.indexOptions);
router.route("/").get(controller.index).post(controller.store);
router.route("/list").get(controller.indexAll);
router.route("/industry/:industryId").get(controller.getServicesByIndustryId);
router.route("/home/industry").get(controller.getServicesByIndustryIdHome);
router
.route("/:id")
.get(controller.single)
.put(controller.update)
.delete(controller.destroy);
router.route("/filter/:industryIds").get(controller.getServicesByIndustryIds);

module.exports = router;
