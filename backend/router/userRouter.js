const express = require("express");
const {
  signup,
  login,
  logout,
  getAllUsers,
  deleteUser,
  getSingleUserById,
  editUserRole,
  blockUser,
  editUser,
} = require("../controller/userController");
const {
  authenticateToken,
  authorizeAdmin,
  checkBlockedStatus,
} = require("../middleware/authMiddleware");
const router = express.Router();

router
  .route("/")
  .post(signup)
  .get(authenticateToken, authorizeAdmin, getAllUsers);
    
router.route("/block").put(authenticateToken, authorizeAdmin, blockUser);

router
  .route("/update/:userId").put(authenticateToken, authorizeAdmin, editUser)
router
  .route("/:userId")
  .delete(authenticateToken, authorizeAdmin, deleteUser)
  .get(getSingleUserById)
  .put(authenticateToken, authorizeAdmin, editUserRole);
router.route("/login").post(login);
router.route("/logout").post(logout);

module.exports = router;
