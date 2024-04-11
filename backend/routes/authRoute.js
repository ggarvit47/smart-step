const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authMiddleware");

const {
  signup,
  login,
  forgetPassword,
  resetPassword,
  completeUserProfile,
  getUserProfile
} = require("../controllers/authController");

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgetPassword", authenticateToken, forgetPassword);
router.post("/resetPassword", resetPassword);
router.post("/completeUserProfile",authenticateToken,completeUserProfile)
router.get("/getUserProfile",authenticateToken,getUserProfile)

module.exports = router;
