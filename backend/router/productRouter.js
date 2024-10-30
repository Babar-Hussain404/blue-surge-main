const express = require("express");
const {
  authenticateToken,
  authorizeAdmin,
  checkBlockedStatus,
} = require("../middleware/authMiddleware");
const router = express.Router();
const controller = require("../controller/productController");

router.route("/").post(controller.store).get(controller.index);
router.route("/random").get(controller.getRandomProducts);
router.route("/detail/:serviceId").get(controller.getProductsByServiceId);
router.route("/industry/:industryId").get(controller.getProductsByIndustryId);
router.route("/industry/filter/:industryIds").get(controller.getProductsByIndustryIds);
router
  .route("/filter/:industryIds/:serviceIds")
  .get(controller.getProductsByServiceAndIndustryIds);
router
  .route("/:id")
  .put(controller.update)
  .get(controller.single)
  .delete(controller.destroy);

module.exports = router;
